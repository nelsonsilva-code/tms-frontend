import React from 'react';
import {useNavigate} from "react-router-dom";
import ButtonComponent from "./ButtonComponent.jsx";

const LoginComponent = () => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/todos')
    }
    return (
        <div>
            <br/>
            <ButtonComponent onClick={handleClick} text='Login' />
        </div>
    );
};

export default LoginComponent;