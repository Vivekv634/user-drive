import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Input from '../components/Input';
import axios from 'axios';
import EditImage from '../images/edit.svg';
import { userDataContext } from '../Context/userDataContext';

export default function Edit() {
  // const [fname, setFname] = useState('');
  // const [lname, setLname] = useState('');
  const [error, setError] = useState('');
  const [disable, setDisable] = useState(true);
  const [ID, setID] = useState('');
  const navigate = useNavigate();
  const { fname, setFname, lname, setLname } = useContext(userDataContext);


  useEffect(() => {
    if (Cookies.get('userTokenID')) {
      setID(Cookies.get('userTokenID'));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URI = `http://localhost:5500/api/user/updateData?id=${ID}`;
    const response = await axios.post(URI, { fname, lname });
    const result = response.data;
    if (result.success) {
      alert(result.success);
      navigate('/about');
    }
  }

  useEffect(() => {
    if (/^[a-zA-Z ]*$/.test(fname) && /^[a-zA-Z ]*$/.test(lname)) {
      setError('');
      setDisable(false);
    } else {
      setError('Name can\'t contain special characters')
    }
  }, [fname, lname]);

  return (
    <div className='edit'>
      <div className="edit-content">
        <div className="left"><img src={EditImage} alt="" /></div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <h1>Edit Profile</h1>
            <Input id='fname' label='First Name' type='text' value={fname} handleValue={setFname} required={false} />
            <Input id='lname' label='Last Name' type='text' value={lname} handleValue={setLname} required={false} />
            <div className="error">{error}</div>
            <input type="submit" value='Save Changes' disabled={disable} />
          </form>
        </div>
      </div>
    </div>
  )
}
