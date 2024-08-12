import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { isLoggedIn, getJwtToken } from '../utils';
import Spinner from '../components/Spinner';
import { BaseUrl } from '../utils';


const Retrieve = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        if (!isLoggedIn()) {
            setError('Please login.');
            return;
        }

        const fetchData = async () => {
            setLoading(true); // Set loading to true when fetch starts
            try {
                const token = getJwtToken();
                if (!token) {
                    setError('Token is missing.');
                    return;
                }

                const response = await axios.get(BaseUrl + 'invoices', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setData(response.data);
            } catch (err) {
                setError('Something went wrong.');
            } finally {
                setLoading(false); // Set loading to false when fetch ends
            }
        };

        fetchData();
    }, []);

    if (error) return (
        <>
            <Navbar />
            <div>{error}</div>
        </>
    );

    if (data.length === 0) return (
        <>
            <Navbar />
            <div>No records to show.</div>;
        </>
    );

    return (
        <>
            <Navbar />
            <>
                {loading ? ( // Conditionally render spinner
                    <Spinner />
                ) : (
                    <>
                        <div className="retrieve">
                            <h2>Retrieve Invoices</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Customer Details</th>
                                        <th>Product Details</th>
                                        <th>Total Amount</th>
                                        <th>Amount Payable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr>
                                                <td>
                                                    <div>Name: {item.Invoice.customer_details.name}</div>
                                                    <div>Address: {item.Invoice.customer_details.address}</div>
                                                    <div>Phone Number: {item.Invoice.customer_details.phone_number}</div>
                                                    <div>Email: {item.Invoice.customer_details.email}</div>
                                                </td>
                                                <td>
                                                    <ul>
                                                        {item.Invoice.product_details.map((product, i) => (
                                                            <li key={i}>
                                                                <div>Name: {product.name}</div>
                                                                <div>Rate: {product.rate}</div>
                                                                <div>Quantity: {product.quantity}</div>
                                                                <div>Total Amount: {product.total_amount}</div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                                <td>{item.Invoice.total_amount}</td>
                                                <td>{item.Invoice.amount_payable}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </>
        </>
    );
};

export default Retrieve;
