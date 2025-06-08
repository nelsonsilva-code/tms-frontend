import React, {useState} from 'react';
import {Form, useNavigate} from "react-router-dom";
import {createUser} from "../services/AuthService.JS";
import ButtonComponent from "./ButtonComponent.jsx";
import FormInput from './FormInput';

const RegisterComponent = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    })

    function registerUser(event) {
        event.preventDefault();
        const user = { name, username, email, password };
        if (validateForm()) {
            console.log(user)
            createUser(user)
                .then(() => navigate('/'))
                .catch(console.error);
        }
    }


    function validateForm() {
        let valid = true;

        const errorsCopy = {
            name: '',
            username: '',
            email: '',
            password: ''
        };

        const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{1,}$/;

        const usernameRegex = /^[A-Za-z0-9_-]{1,12}$/;

        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        const passwordRegex = /^(?=.*[A-Z])(?=.{12,}$)(?!.*\s)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

        // First Name
        if (!name.trim() || !nameRegex.test(name)) {
            errorsCopy.name =
                'First name must be only letters, spaces, apostrophes or hyphens.';
            valid = false;
        }

        // Username
        if (!username.trim() || !usernameRegex.test(username)) {
            errorsCopy.username =
                'Username must be 1–12 characters; letters, numbers, underscores or hyphens only.';
            valid = false;
        }

        // Email
        if (!email.trim() || !emailRegex.test(email)) {
            errorsCopy.email = 'Please enter a valid email address.';
            valid = false;
        }

        // Password
        if (!password || !passwordRegex.test(password)) {
            errorsCopy.password =
                'Password must be at least 12 characters, include one uppercase, no spaces, and may contain letters, numbers & special chars.';
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
                                    label="Email"
                                    name="email"
                                    value={email}
                                    validation={errors.email}
                                    handleOnChange={e => setEmail(e.target.value)}
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


export default RegisterComponent;