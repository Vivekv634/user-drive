import React, { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ProfileImage from '../images/profile.svg';
import { userDataContext } from '../Context/userDataContext';

export default function About() {
    const { fname, setFname, lname, setLname, email, setEmail } = useContext(userDataContext);
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
    });

    const handleDeleteProfile = async () => {
        const confirmation = window.confirm("Are you sure you want to delete your account?");
        if (confirmation) {
            const response = await axios.delete(`http://localhost:5500/api/user/deleteData?id=${ID}`);
            const result = response.data;
            if (result.success) {
                alert(result.success);
                Cookies.remove('userTokenID');
                navigate('/');
            }
        }
    }
    return (
        <div className="about">
                <div className="about-content">
                    <div className="left">
                        <img src={ProfileImage} alt="" />
                        <div className="about-links">
                            <Link to='/edit'>Edit Profile</Link>
                            <Link to='/changepassword'>Change Password</Link>
                            <Link id='delete-profile-btn' onClick={handleDeleteProfile}>Delete Profile</Link>
                        </div>
                    </div>
                    <div className="right">

                        <table>
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
                    </div>
                </div>
        </div>
    )
}
