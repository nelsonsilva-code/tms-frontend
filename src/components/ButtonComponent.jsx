import React from 'react';

const ButtonComponent = ({ className = '', onClick, text }) => {
    return (
        <button
            className={className ? 'btn btn-primary mb-2 ' + className : 'btn btn-primary mb-2 '}
            onClick={onClick ?? null}
        >
            {text}
        </button>
    );
};

export default ButtonComponent;
