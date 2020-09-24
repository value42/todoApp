import React, { useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Todo({ todo, sendToTodo, editTodo, applyTodo }) {

    const textInput = useRef()

    function handleTodoClick() {
        sendToTodo(todo.todo_id)
    }

    function editingTodo() {
        editTodo(todo.todo_id)
    }

    function applyingTodo() {
        applyTodo(todo.todo_id, textInput.current.value)
        todo.editing = false
    }

    return (
        <div>
            {todo.editing ?
                <>
                    <form>
                        <div className="applys">
                            <input defaultValue={todo.name} ref={textInput}></input>
                            <button type="button" onClick={applyingTodo} className="btn btn-secondary">Apply</button>
                        </div>
                    </form>
                </>
                :
                <div className='todo'>
                    <span className={todo.complete ? "completed" : "notcompleted"}>{todo.name}</span>
                    <div className="btn-group mr-2" role="group" aria-label="Second group">
                        <button type="button" onClick={editingTodo} className="btn btn-secondary">Edit</button>
                        <button type="button" onClick={handleTodoClick} className="btn btn-secondary">Done</button>
                    </div>

                </div>
            }
        </div>
    )
}
