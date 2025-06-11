import React from 'react';
import {useNavigate} from "react-router-dom";

const HomeComponent = () => {

    const navigate = useNavigate();

    return (
        <div className="row justify-content-center mt-5">
           <div> <h1>Welcome to TMS!</h1></div>
            <br/> <br/>
           <div>
               <img
                   src="/home.png"
                   alt="TMS logo"
                   className="me-2 fade-edge-img"
                   onClick={() => navigate('/todos')}
               />
           </div>
        </div>
    );
};

export default HomeComponent;