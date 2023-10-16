import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="container">
                <div className="title">
                    <Link className='link' to='/'>userDrive</Link>
                </div>
                <ul>
                    <li><Link className='link' to='/login'>Login</Link></li>
                    <li><Link className='link' to='/signup'>Signup</Link></li>
                </ul>
            </div>
        </div>
    )
}
