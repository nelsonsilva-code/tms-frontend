import React, {useEffect, useState} from 'react';
import {completeTodo, deleteTodo, incompleteTodo, listTodos} from "../services/TodoService.JS";
import {useNavigate} from "react-router-dom";
import ButtonComponent from "./ButtonComponent.jsx";
import {deleteUserApi, getUsersApi} from "../services/AuthService.JS";
const ListUsersComponent = () => {

    const [users, setUsers] = useState([])

    const navigator = useNavigate();
    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        getUsersApi()
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                if (error.response?.status === 401) {
                    navigator('/');
                } else {
                    console.log(error);
                }
            });
    }

    function markCompleteTodo(id) {
        completeTodo(id)
            .then(() => {
                getUsers()
            }).catch((error) => {
                console.log(error);
            })
        }

    // function changeRole(id) {
    //     changeRoleApi(id)
    //         .then(() => {
    //             getUsers()
    //         }).catch((error) => {
    //         console.log(error);
    //     })
    // }


    function navigateCreateUser() {
        navigator('/create-user');
    }

    function deleteUser(id) {
        const confirmed = window.confirm("Are you sure you want to delete this user?");
        if(confirmed) {
            deleteUserApi(id)
                .then(() => getUsers())
                .catch(error => {console.log(error);});

        }
    }

    return (
        <div className="container">
            <h2>List of Todos</h2>
            <ButtonComponent className='accordion-header' onClick={navigateCreateUser} text='Create User'/>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role Name</th>
                        <th>Role Permissions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.role.name}</td>
                                <td>
                                    {user.role.permissions.map((perm, idx) => (
                                        <span key={idx}> {perm} {idx < user.role.permissions.length - 1 ? ' | ' : ''}</span>
                                    ))}
                                </td>
                                <td>
                                    {/*<ButtonComponent className="ms-2" onClick={() => changeRole(user.id)} text='Change Role'/>*/}
                                    <ButtonComponent className='btn-danger ms-2' onClick={() => deleteUser(user.id)} text='Delete'/>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListUsersComponent;