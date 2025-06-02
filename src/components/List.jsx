import React, {useEffect, useState} from 'react';
import {completeTodo, deleteTodo, incompleteTodo, listTodos} from "../services/TodoService.JS";
import {useNavigate} from "react-router-dom";
import ButtonComponent from "./ButtonComponent.jsx";
const ListTodoComponent = () => {

    const [todos, setTodos] = useState([])

    const navigator = useNavigate();
    useEffect(() => {
        getAllTodos();
    }, []);

    function getAllTodos() {
        listTodos()
            .then((response) => {
                setTodos(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function markCompleteTodo(id) {
        completeTodo(id)
            .then(() => {
                listTodos()
            }).catch((error) => {
                console.log(error);
            })
        }

    function markIncompleteTodo(id) {
        incompleteTodo(id)
            .then(() => {
                listTodos()
            }).catch((error) => {
            console.log(error);
        })
    }


    function navigateAddTodo() {
        navigator('/add-todo');
    }

    function navigateUpdateTodo(id) {
        navigator(`/update-todo/${id}`);
    }

    function executeDeleteTodo(id) {
        const confirmed = window.confirm("Are you sure you want to delete this todo?");
        if(confirmed) {
            deleteTodo(id)
                .then(() => getAllTodos())
                .catch(error => {console.log(error);});

        }
    }

    return (
        <div className="container">
            <h2>List of Todos</h2>
            <ButtonComponent className='accordion-header' onClick={navigateAddTodo} text='Add Todo'/>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        todos.map(todo =>
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td>{todo.complete ? "Completed" : "Not completed"}</td>
                                <td>
                                    <ButtonComponent className={todo.complete ? "btn-warning ms-2": "btn-success ms-2"  } onClick={() => {
                                        todo.complete ? markIncompleteTodo(todo.id) : markCompleteTodo(todo.id)
                                    }} text={todo.complete ? "Set Incompleted" :"Set Completed" }/>
                                    <ButtonComponent className="ms-2" onClick={() => navigateUpdateTodo(todo.id)} text='Update'/>
                                    <ButtonComponent className='btn-danger ms-2' onClick={() => executeDeleteTodo(todo.id)} text='Delete'/>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListTodoComponent;