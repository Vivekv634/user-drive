import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function About() {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [ID, setID] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (Cookies.get('userTokenID')) {
            setID(Cookies.get('userTokenID'));
        } else {
            navigate('/login');
        }
    }, [navigate]);


    useEffect(() => {
        const fetchData = async () => {
            const URI = `http://localhost:5500/api/user/getData?id=${ID}`;
            const response = await axios.get(URI);
            const result = response.data.user;
            setFname(result.fname);
            setLname(result.lname);
            setEmail(result.email);
        }
        fetchData();
    }, [ID]);

    return (
        <div className="about">
            {fname && lname && email ?
                <div className="info">
                    <table>
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{fname}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{lname}</td>
                            </tr>
                            <tr>
                                <td>Email Address</td>
                                <td>{email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> : <div className="fetching">fetching data...</div>}
            <div className="links">
                <Link to='/edit' className='aboutLink'>Edit profile</Link>
                <Link to='/changePassword' className='aboutLink'>Change Password</Link>
            </div>
        </div>
    )
}
