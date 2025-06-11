import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ButtonComponent from "./ButtonComponent.jsx";
import FormInput from './FormInputComponent.jsx';
import {loginApi, storeToken} from "../services/AuthService.JS";

const LoginComponent = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [errors, setErrors] = useState({
        username: '',
        password: ''
    })

    function loginUser(event) {
        event.preventDefault();
        const user = {  username, password };
        if (validateForm()) {
            console.log(user)
            loginApi(user)
                .then(() => {
                    storeToken('Basic ' + window.btoa(username+":"+password));
                    navigate('/todos')
                })
                .catch(console.error);
        }
    }


    function validateForm() {
        let valid = true;

        const errorsCopy = {
            username: '',
            password: ''
        };

        const usernameRegex = /^[A-Za-z0-9_-]{1,12}$/;

        const passwordRegex = /^(?=.*[A-Z])(?=.{12,}$)(?!.*\s)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;

        // Username
        if (!username.trim() || !usernameRegex.test(username)) {
            errorsCopy.username =
                'Please enter a valid username.';
            valid = false;
        }


        // Password
        if (!password || !passwordRegex.test(password)) {
            errorsCopy.password =
                'Please enter a valid password.';
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
                            <h2>User Login</h2>
                        </div>
                        <div className="card-body">
                            <form onSubmit={loginUser}>
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
                                        onClick={loginUser}
                                    />
                                    <p>Not registered? Register <Link to="/register">here</Link>!</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;