import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Input from '../components/Input';
import axios from 'axios';

export default function Edit() {
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
      const result = response.data;
      // setdata(result);
      setFname(result.user.fname);
      setLname(result.user.lname);
      setEmail(result.user.email);
    }
    fetchData();
  }, [ID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URI = `http://localhost:5500/api/user/updateData?id=${ID}`;
    const response = await axios.post(URI, { fname, lname, email });
    const result = response.data;
    if (result.success) {
      alert(result.success);
      navigate('/about');
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1>Edit Profile</h1>
        <div id="inputs">
          <Input id='fname' label='First Name' type='text' value={fname} handleValue={setFname} required={false} />
          <Input id='lname' label='Last Name' type='text' value={lname} handleValue={setLname} required={false} />
          <Input id='email' label='Email Address' type='email' value={email} handleValue={setEmail} required={false} />
        </div>
        <input type="submit" value='Save Changes' />
      </form>
    </>
  )
}
