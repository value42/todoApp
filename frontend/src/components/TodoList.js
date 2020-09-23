import React from "react";
import Todo from "./Todo"

export default function TodoList({ todos, toggleTodo, editTodo, applyTodo }) {
  return (
    todos.map(todo => {
      return <Todo key={todo.todo_id} sendToTodo={toggleTodo} todo={todo} editTodo={editTodo} applyTodo={applyTodo} />
    })
  )
}
