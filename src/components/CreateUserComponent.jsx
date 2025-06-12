import React, {useEffect, useState} from 'react';
import { Link, useNavigate} from "react-router-dom";
import {createUserApi, getRolesApi} from "../services/AuthService.JS";
import ButtonComponent from "./ButtonComponent.jsx";
import FormInput from './FormInputComponent.jsx';

const CreateUserComponent = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [roleList, setRoleList] = useState([])

    const [errors, setErrors] = useState({
        name: '',
        username: '',
        password: '',
    })

    function registerUser(event) {
        event.preventDefault();
        console.log(name, username, password, role)
        const user = { name, username, password, role };
        if (validateForm()) {
            console.log(user)
            createUserApi(user)
                .then(() => navigate('/todos'))
                .catch(console.error);
        }
    }

    useEffect(() => {
        getRolesApi()
            .then(response => setRoleList(response.data))
            .catch(error => console.log(error));
    })


    function validateForm() {
        let valid = true;

        const errorsCopy = {
            name: '',
            username: '',
            password: '',
        };

        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,}$/;

        const usernameRegex = /^[a-z0-9_]{1,12}$/;

        const passwordRegex = /^(?=.*[A-Z])(?=.{12,}$)(?!.*\s)[A-Za-z\d!@_-]+$/;

        // First Name
        if (!name.trim() || !nameRegex.test(name)) {
            errorsCopy.name =
                'First name must be only letters, spaces, apostrophes or hyphens.';
            valid = false;
        }

        // Username
        if (!username.trim() || !usernameRegex.test(username)) {
            errorsCopy.username =
                'Username must be at most 12 characters long, contain only lowercase letters, no spaces and only allowed special characters: _';
            valid = false;
        }


        // Password
        if (!password || !passwordRegex.test(password)) {
            errorsCopy.password =
                'Password must be at least 12 characters long, contain at least one uppercase letter, no spaces, and only allowed special characters: ! @ _ -';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-12 col-md-6">
                    <div className="card">
                        <div className="card-header text-center">
                            <h2>User Registration</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={registerUser}>
                                <FormInput
                                    label="Name"
                                    name="name"
                                    value={name}
                                    validation={errors.name}
                                    handleOnChange={e => setName(e.target.value)}
                                />
                                <FormInput
                                    label="Username"
                                    name="username"
                                    value={username}
                                    validation={errors.username}
                                    handleOnChange={e => setUsername(e.target.value)}
                                />
                                <FormInput
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    validation={errors.password}
                                    handleOnChange={e => setPassword(e.target.value)}
                                />
                                <div className='form-group mb-2'>
                                    <label className='form-label'> Select Department </label>
                                    <select
                                        className={`form-control ${errors.role ? 'is-invalid' : ''}`}
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="" disabled hidden>Select Role</option>
                                        { roleList.map((role) => <option value={role.name} key={role.id}>{role.name}</option>) }
                                    </select>
                                </div>
                                <div className="d-grid mt-3">
                                    <ButtonComponent
                                        className="btn-success"
                                        text="Submit"
                                        onClick={registerUser}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CreateUserComponent;