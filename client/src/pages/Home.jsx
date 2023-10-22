import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';


export default function Home() {
    const [cookie, setCookie] = useState('');
    useEffect(() => {
        setCookie(Cookies.get('userTokenID'));
    }, []);
    return (
        <div className="home">
            <div className="heading">Welcome to userDrive</div>
            {!cookie && <div className="sub-heading">Get started with a simple signup</div>}
            {cookie ? <Link to='/about'>Go To Info</Link> : <Link to='/signup'>SignUp Here</Link>}
      </div>
  )
}
