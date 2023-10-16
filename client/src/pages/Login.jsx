import React, { useState } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5500/api/auth/login',
            { email, password },
            { headers: { 'Content-Type': 'application/json' } });
        if (response.data.userToken) {
            const header = new Headers();
            header.append('userTokenID', response.data.userToken);
            navigate('/');
        } else if (response.data.error) {
            alert(response.data.error);
        }
    }
    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                <h1>User Login Form</h1>
                <div id="inputs">
                    <Input id='email' label='Email Address' type='email' value={email} handleValue={setEmail} required={true} />
                    <Input id='password' label='Password' type='password' value={password} handleValue={setPassword} required={true} />
                </div>
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}
