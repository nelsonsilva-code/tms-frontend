import React from 'react';
import {Link, Links, useLocation} from "react-router-dom";
import {clearToken, getRole, getToken} from "../services/AuthService.JS";
import NavDropdown from 'react-bootstrap/NavDropdown';


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
        if(['ROLE_ADMIN', 'ROLE_MANAGER'].includes(role)) {
            return <NavDropdown id="nav-dropdown" title="Management" menuVariant="dark">
                <NavDropdown.Item href="/create-user">Create user</NavDropdown.Item>
                <NavDropdown.Item href="/create-role">Create role</NavDropdown.Item>
                <NavDropdown.Item href="/users">User list</NavDropdown.Item>
            </NavDropdown>

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