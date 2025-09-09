import React from 'react';
import { useState, useEffect } from 'react'
import {TodoProvider} from "./context/todoContext.js"
import './App.css'
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo)=>{
    setTodos((prevTodos)=>[
      {
        id : Date.now(),
        ...todo
      }, ...prevTodos
  ])
  }

  const editTodo = (id,todo)=>{
    setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id===id ?todo : prevTodo)))
  }

  const deleteTodo = (id) => {
    setTodos((prev)=> prev.filter((prevTodo)=>prevTodo.id!==id))
  }

  const toggleComplete = (id) => {
    setTodos((prev)=> prev.map((prevTodo)=>(prevTodo.id===id?{
      ...prevTodo,
      complete : !(prevTodo.complete)
    } :prevTodo )))
  }

  useEffect(() => {
    //NOTE: in locastorage everything is stored as string so we need to convert it to JSON before using it.
    const todos = JSON.parse(localStorage.getItem("todos"));
    if(todos && todos.length>0){
      setTodos(todos);
    }
  }, [])

  useEffect(()=>{
    localStorage.setItem("todos" , JSON.stringify(todos))
  },[todos]);
  

  return (
    <TodoProvider value={{todos,addTodo,editTodo, deleteTodo, toggleComplete}} >
      <div className='flex flex-col w-full h-screen items-center justify-center'>
          <h1 className='m-8 w-full flex justify-center text-3xl'>Todos :</h1>
          <div className='w-[80%] p-5'>
              <TodoForm/>
          </div>
          <div className='flex flex-wrap gap-y-3 w-[70%]'>
            {
              todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                    <TodoItem todo={todo}/>
                </div>
              ))
            }
          </div>
      </div>
    </TodoProvider>
  )
}

export default App
