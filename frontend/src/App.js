import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import TodoList from './components/TodoList'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import Login from './components/Login';


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([{ todo_id: "notRandomId", name: "justFirstTodo", complete: false, editing: false }])
  const [myAccount, setMyAccount] = useState(JSON.parse(localStorage.getItem('todoAcc')))
  const [myUsername, setMyUsername] = useState(JSON.parse(localStorage.getItem('todoUsername')))
  const [myPassword, setMyPassword] = useState(JSON.parse(localStorage.getItem('todoPassword')))



  useEffect(() => {

    const data = {
      "username": myUsername,
      "password": myPassword
    }

    axios.post('http://127.0.0.1:8000/api/auth/token/token/login/', data)
      .then((res) => {
        const token = res.data.auth_token
        const options = {
          headers: { 'Authorization': `Token ${token}` }
        };
        axios.get('http://127.0.0.1:8000/api/auth/users/me/', options).then(res => {
          const userId = res.data.id
          axios.get('http://127.0.0.1:8000/api/todos/').then(res => {
            setTodos(res.data.filter(todo => !todo.complete & todo.author === userId))
          })
          setMyAccount(userId)
        })
      })
      .catch((err) => {
        console.log(err)
      })
    localStorage.setItem('todoAcc', JSON.stringify(myAccount))
    localStorage.setItem('todoUsername', JSON.stringify(myUsername))
    localStorage.setItem('todoPassword', JSON.stringify(myPassword))
  }, [myAccount, myUsername, myPassword])

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    let todo
    if (storedTodos) todo = storedTodos.find(todo => todo.editing === true)
    while (todo) {
      todo.editing = !todo.editing
      todo = storedTodos.find(todo => todo.editing === true)
    }
    if (storedTodos) setTodos(storedTodos.filter(todo => !todo.complete))
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.todo_id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)

    const data = {
      "todo_id": todo.todo_id,
      "name": todo.name,
      "complete": todo.complete,
      "editing": false,
      "author": myAccount
    }

    axios.put('http://127.0.0.1:8000/api/todos/' + String(todo.id) + '/', data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function editTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.todo_id === id)
    todo.editing = !todo.editing
    setTodos(newTodos)
  }

  function applyTodo(id, text) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.todo_id === id)
    todo.name = text
    setTodos(newTodos)

    const data = {
      "todo_id": todo.todo_id,
      "name": todo.name,
      "complete": todo.complete,
      "editing": false,
      "author": myAccount
    }

    axios.put('http://127.0.0.1:8000/api/todos/' + String(todo.id) + '/', data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err)
      })


  }

  function logout() {
    setMyUsername(false)
    setMyPassword(false)
    setMyAccount(false)
    localStorage.removeItem('todoAcc')
    localStorage.removeItem('todoUsername')
    localStorage.removeItem('todoPassword')
  }

  return (
    <div className="App">
      {myAccount ? (
        <div>
          <header>
            <h1 className="text-center">TODO LIST</h1>
          </header>
          <TodoList todos={todos} toggleTodo={toggleTodo} editTodo={editTodo} applyTodo={applyTodo} />
          <Form todos={todos} setTodos={setTodos} myAccount={myAccount} />
          <div className="text-center" >{todos.filter(todo => !todo.complete).length} left to do</div>
          <button className="btn btn-danger loginbtn" type="button" onClick={logout}>Выйти</button>
        </div>
      ) : (
          <Login setMyUsername={setMyUsername} setMyPassword={setMyPassword} />
        )}

    </div>
  );
}

export default App;
