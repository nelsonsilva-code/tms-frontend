import React from 'react';
import {Link, useLocation} from "react-router-dom";

const HeaderComponent = () => {

    const location = useLocation();
    const path =location.pathname;

    return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand ms-2" href="http://localhost:3000/employees"> EMS </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="navbar-nav">
                            <Link className={`nav-link ${path === '/' ? 'active' : ''}`} to="/">Home</Link>
                            <Link className={`nav-link ${path === '/todos' ? 'active' : ''}`} to="/Todos">Todo's</Link>
                        </div>
                    </div>
                </nav>
            </header>
    );
};

export default HeaderComponent;