import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Navbar() {
    const [cookie, setCookie] = useState('');
    useEffect(() => {
        setCookie(Cookies.get('userTokenID'));
    }, []);
    return (
        <div className="navbar">
            <div className="container">
                <div className="title">
                    <Link className='link' to='/'>userDrive</Link>
                </div>
                <ul>
                    {!cookie && <li><Link className='link' to='/login'>Login</Link></li>}
                    {!cookie && <li><Link className='link' to='/signup'>Signup</Link></li>}
                    {cookie && <li><Link className='link' to='/logout'>LogOut</Link></li>}
                </ul>
            </div>
        </div>
    )
}
