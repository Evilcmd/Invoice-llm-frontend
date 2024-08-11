// src/components/Hero.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => (
    <div className="hero">
        <h1>Welcome to the File Upload App</h1>
        <Link to="/upload"><button>Get Started</button></Link>
    </div>
);

export default Hero;
