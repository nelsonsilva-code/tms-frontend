import React from 'react';
import {Link, useLocation} from "react-router-dom";
import {clearToken, getRole, getToken} from "../services/AuthService.JS";

const HeaderComponent = () => {

    const location = useLocation();
    const path =location.pathname;
    const token = getToken();
    const isAuth = Boolean(token);

    function getLoginLogout(isAuth) {
        if(isAuth) {
            return <Link className='nav-link' onClick={clearToken} to="/">Logout</Link>
        } else {
            return <Link className={`nav-link ${path === '/login' ? 'active' : ''}`} to="/login">Login</Link>
        }
    }

    function isAdmin() {
        const role = getRole()
        if(role === 'ROLE_ADMIN') {
            return <Link className={`nav-link ${path === '/create-user' ? 'active' : ''}`} to="/create-user">Create User</Link>
        }
    }

    return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link className="navbar-brand ms-2 active" to="/">TMS</Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <Link className={`nav-link ${path === '/' ? 'active' : ''}`} to="/">Home</Link>
                            <Link className={`nav-link ${path === '/todos' ? 'active' : ''}`} to="/todos">Todo's</Link>
                            {isAdmin()}
                        </div>
                        <div className="navbar-nav ms-auto me-2">{getLoginLogout(isAuth)}</div>
                    </div>
                </nav>
            </header>
    );
};

export default HeaderComponent;