// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, getUsername, logout } from '../utils';
import './Navbar.css';

const Navbar = () => {
    const userLoggedIn = isLoggedIn();
    const username = getUsername();

    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/upload">Upload</Link></li>
                {userLoggedIn ? (
                    <>
                        <li><Link to="/retrieve">Retrieve</Link></li>
                        <li>{username}</li>
                        <li><button onClick={logout}>Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
