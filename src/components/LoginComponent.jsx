import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import ButtonComponent from "./ButtonComponent.jsx";
import FormInput from './FormInputComponent.jsx';
import {loginApi, storeRole, storeToken} from "../services/AuthService.JS";

const LoginComponent = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function loginUser(event) {
        event.preventDefault();
        const user = {  username, password };
        console.log(user)
        loginApi(user)
            .then((response) => {
                storeToken(response.data.tokenType + " " + response.data.accessToken);
                storeRole(response.data.role);
                navigate('/todos')
            })
            .catch(console.error);

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
                                    handleOnChange={e => setUsername(e.target.value)}
                                />
                                <FormInput
                                    type="password"
                                    label="Password"
                                    name="password"
                                    value={password}
                                    handleOnChange={e => setPassword(e.target.value)}
                                />
                                <div className="d-grid mt-3">
                                    <ButtonComponent
                                        className="btn-success"
                                        text="Submit"
                                        onClick={loginUser}
                                    />
                                    <p>If you don't have an account, please request one to an Admin</p>
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