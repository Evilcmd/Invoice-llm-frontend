// src/pages/UploadSuccess.js
import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { isLoggedIn } from '../utils';
import axios from 'axios';
import { BaseUrl } from '../utils';

const UploadSuccess = () => {
    const navigate = useNavigate();  // Replaces useHistory
    const location = useLocation();
    const { customer_details, product_details, total_amount, amount_payable } = location.state;
    const responseBody = location.state || {};

    const handleSaveClick = async () => {
        if (!isLoggedIn()) {
            alert('Please login or signup.');
            return;
        }

        try {
            await axios.post(BaseUrl + 'invoices', responseBody, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
                }
            });
            navigate('/save-success');  // Replaces history.push('/save-success')
        } catch (error) {
            navigate('/save-failed');  // Replaces history.push('/save-failed')
        }
    };

    return (
        <>
            <Navbar />
            <div>
                <h2>Upload Success</h2>

                <h3>Customer Details</h3>
                <p>Name: {customer_details.name}</p>
                <p>Address: {customer_details.address}</p>
                <p>Phone Number: {customer_details.phone_number}</p>
                <p>Email: {customer_details.email}</p>

                <h3>Product Details</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rate</th>
                            <th>Quantity</th>
                            <th>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {product_details.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{product.rate}</td>
                                <td>{product.quantity}</td>
                                <td>{product.total_amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Total Amount: {total_amount}</h3>
                <h3>Amount Payable: {amount_payable}</h3>
                <button onClick={handleSaveClick}>Click to Save</button>
            </div>
        </>
    );

};

export default UploadSuccess;
