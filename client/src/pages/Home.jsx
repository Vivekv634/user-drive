import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import SecureServer from '../images/secure_server.svg';

export default function Home() {
    const [cookie, setCookie] = useState('');
    useEffect(() => {
        setCookie(Cookies.get('userTokenID'));
    }, []);
    return (
        <div className="home">
            <div className="home-content">
                <div className="left">
                    <div className="heading">Privacy First: Protecting Your Data, Every Byte of the Way</div>
                    <div className="sub-heading">User Data Security Service</div>
                    <div className="home-link">
                        {cookie ? <Link to='/about' className='link'>Go To DashBoard</Link> : <Link to='/signup' className='link'>Get Started</Link>}</div>
                </div>
                <div className="right"><img src={SecureServer} alt="" /></div>
            </div>
        </div>
    )
}
