// src/pages/Upload.js
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Upload.css'
import Spinner from '../components/Spinner'; // Import spinner
import './UploadSuccess.css';
import { BaseUrl } from '../utils';


const Upload = () => {
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Add loading state

    const handleImageUpload = async () => {
        if (!image) return;

        const formData = new FormData();
        formData.append('file', image);

        setLoading(true); // Set loading to true when fetch starts
        try {
            await axios.post(BaseUrl + 'uploadimage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/upload-success');
        } catch (error) {
            navigate('/upload-failed');
        } finally {
            setLoading(false); // Set loading to false when fetch ends
        }
    };

    const handlePdfUpload = async () => {
        if (!pdf) return;

        const formData = new FormData();
        formData.append('myFile', pdf);

        setLoading(true); // Set loading to true when fetch starts
        try {
            const response = await axios.post(BaseUrl + 'upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const responseBody = response.data
            navigate('/upload-success', { state: responseBody });  // Redirect on success
        } catch (error) {
            navigate('/upload-failed');  // Redirect on failure
        } finally {
            setLoading(false); // Set loading to false when fetch ends
        }
    };

    return (
        <>
            <Navbar />
            <div className="upload-container">
                {loading ? ( // Conditionally render spinner
                    <Spinner />
                ) : (
                    <>
                        <div className="upload-box">
                            <h2>Upload Image</h2>
                            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                            <button onClick={handleImageUpload}>Upload Image</button>
                        </div>
                        <div className="upload-box">
                            <h2>Upload PDF</h2>
                            <input type="file" accept=".pdf" onChange={(e) => setPdf(e.target.files[0])} />
                            <button onClick={handlePdfUpload}>Upload PDF</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Upload;
