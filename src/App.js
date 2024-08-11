// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Upload from './pages/Upload';
import UploadSuccess from './pages/UploadSuccess';
import UploadFailed from './pages/UploadFailed';
import SaveSuccess from './pages/SaveSuccess';
import SaveFailed from './pages/SaveFailed';
import Retrieve from './pages/Retrieve';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SignupFailed from './pages/SignupFailed';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<Upload />} />
                <Route path="/upload-success" element={<UploadSuccess />} />
                <Route path="/upload-failed" element={<UploadFailed />} />
                <Route path="/save-success" element={<SaveSuccess />} />
                <Route path="/save-failed" element={<SaveFailed />} />
                <Route path="/retrieve" element={<Retrieve />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signupfailed" element={<SignupFailed />} />
                <Route path="/login" element={<Login />} />
                <Route path="/loginfailed" element={<SignupFailed />} />
            </Routes>
        </Router>
    );
}

export default App;
