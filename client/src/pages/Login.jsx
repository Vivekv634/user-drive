import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import LoginImage from '../images/login.svg';

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (Cookies.get('userTokenID')) {
            navigate('/');
        }

    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:5500/api/auth/login',
            { email, password },
            { headers: { 'Content-Type': 'application/json' } });
        if (response.data.userToken) {
            Cookies.set('userTokenID', response.data.userToken, { expires: 1, secure: true });
            window.location.reload();
        } else if (response.data.error) {
            alert(response.data.error);
            setEmail('');
            setPassword('');
        }
    }

    return (
        <div className="login">
            <div className="login-content">
                <div className="left"><img src={LoginImage} alt="" /></div>
                <div className="right">
                    <form onSubmit={handleSubmit} >
                        <h1>User Login Form</h1>
                        <Input id='email' label='Email Address' type='email' value={email} handleValue={setEmail} required={true} />
                        <Input id='password' label='Password' type='password' value={password} handleValue={setPassword} required={true} />
                        <input type="submit" value="Login" />
                        <div className="signup-link forget-password"><Link to='/forgetPassword'>Forget Password?</Link></div>
                        <div className="signup-link">Don't have an account?<Link to='/signup'>Create Here</Link></div>
                    </form>
                </div>
            </div>
        </div>
    )
}
