import React from "react";
import { createContext, useContext } from "react";

const TodoContext = createContext({
    todos : [
        {
            id : 1,
            todo : "",
            complete : false
        }
    ],
    addTodo : (todo)=>{},
    editTodo : (id,todo) => {},
    deleteTodo : (id) => {},
    toggleComplete : (id) => {}
});

const TodoProvider = TodoContext.Provider;

const useTodo = ()=>{
    return useContext(TodoContext);
};

export {TodoContext,TodoProvider,useTodo};