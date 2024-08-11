// src/pages/Signup.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../utils';
import './Signup.css';
import Spinner from '../components/Spinner';


const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Add loading state

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when fetch starts
        try {
            const response = await axios.post('http://localhost:8080/signup',
                { uname: username, passwd: password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            loginUser(response.data.token);
            navigate('/');
        } catch (error) {
            navigate('/signupfailed');
        } finally {
            setLoading(false); // Set loading to false when fetch ends
        }
    };

    return (
        <>
            <Navbar />
            <>
                {loading ? ( // Conditionally render spinner
                    <Spinner />
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <h2>Signup</h2>
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Sign Up</button>
                        </form>
                    </>
                )}
            </>
        </>
    );
};

export default Signup;
