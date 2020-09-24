import React, { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'

export default function Form({ todos, setTodos, myAccount }) {

    const textInput = useRef()


    const makeNewList = () => {
        if (textInput.current.value === '') return
        const uniqueId = uuidv4()
        setTodos([...todos, { todo_id: uniqueId, name: textInput.current.value, complete: false, editing: false }])
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8000/api/todos/',
            data: {
                "todo_id": uniqueId,
                "editing": false,
                "name": textInput.current.value,
                "author": myAccount,
                "complete": false
            }
        });
        textInput.current.value = null
        window.location.reload();
    }

    const deleteCompleted = () => {
        const clearTodos = todos.filter(todo => !todo.complete)
        setTodos(clearTodos)
    }

    return (
        <>
            <div className=''>
                <form>
                    <input className="inpform" type="text" ref={textInput} placeholder="New TODO" aria-label="New TODO" aria-describedby="button-addon4"></input>
                    <div>
                        <button className="btn btn-secondary loginbtn" type="button" onClick={makeNewList}>Add task</button>
                        <button className="btn btn-danger loginbtn" type="button" onClick={deleteCompleted}>Delete Completed</button>
                    </div>
                </form>
            </div>
        </>
    )
}

