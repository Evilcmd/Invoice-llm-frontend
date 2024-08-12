// src/pages/Login.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginUser } from '../utils';
import './Login.css'
import Spinner from '../components/Spinner';
import { BaseUrl } from '../utils';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(BaseUrl + 'login', { uname: username, passwd: password }, { headers: { 'Content-Type': 'application/json' } });
            loginUser(response.data.token);
            navigate('/');
        } catch (error) {
            navigate('/loginfailed');
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
                            <h2>Login</h2>
                            <label>Username</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                            <label>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <button type="submit">Log In</button>
                        </form>
                    </>
                )}
            </>
        </>
    );
};

export default Login;
