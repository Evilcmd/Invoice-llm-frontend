// src/pages/SignupFailed.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupFailed.css';
import Navbar from '../components/Navbar';

const SignupFailed = () => {

    return (
        <>
            <Navbar />
            <div className="signup-failed-container">
                <h1>Something Went Wrong</h1>
                <p>Please try again.</p>
            </div>
        </>
    );
};

export default SignupFailed;
