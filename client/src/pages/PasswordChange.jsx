import React, { useState, useEffect } from 'react';
import Input from '../components/Input';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import PasswordImage from '../images/password.svg';

export default function PasswordChange() {
  const [ID, setID] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('userTokenID')) {
      setID(Cookies.get('userTokenID'));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`http://localhost:5500/api/user/changePassword?id=${ID}`, { oldPassword, newPassword });
    const result = response.data;
    if (result.error) {
      alert(result.error);
    }
    if (result.success) {
      alert(result.success);
      navigate('/about');
    }
  }

  return (
    <div className="passwordChange">
      <div className="passwordChange-content">
        <div className="left"><img src={PasswordImage} alt="" /></div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h1>Change Password</h1>
            <Input id='oldPassword' label='Old Password' type='password' value={oldPassword} handleValue={setOldPassword} required={true} />
            <Input id='newPassword' label='New Password' type='password' value={newPassword} handleValue={setNewPassword} required={true} />
            <Input id='cPassword' label='Confirm New Password' type='password' value={cPassword} handleValue={setCPassword} required={true} />
            <input type="submit" value="Change Password" />
          </form>
        </div>
      </div>
    </div>
  )
}
