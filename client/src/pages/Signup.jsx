import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Signup() {
    const navigate = useNavigate();
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (Cookies.get('userTokenID')) {
            navigate('/');
        }

    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5500/api/auth/register',
            { fname, lname, email, password },
            { headers: { 'Content-Type': 'application/json' } });
        if (response.data.success) {
            alert(response.data.success);
            navigate('/login');
        }
        else if (response.data.error) alert(response.data.error);
    }
    
    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <h1>User Registration Form</h1>
                <div id="inputs">
                    <Input id='fname' label='First Name' type='text' value={fname} handleValue={setFname} required={true} />
                    <Input id='lname' label='Last Name' type='text' value={lname} handleValue={setLname} required={true} />
                    <Input id='email' label='Email Address' type='email' value={email} handleValue={setEmail} required={true} />
                    <Input id='password' label='Password' type='password' value={password} handleValue={setPassword} required={true} />
                </div>
                <input type="submit" value="Register" />
            </form>
        </div>
    )
}
