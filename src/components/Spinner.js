// src/components/Spinner.js
import React from 'react';
import './Spinner.css';

const Spinner = () => {
    return (
        <div className="spinner">
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Spinner;
