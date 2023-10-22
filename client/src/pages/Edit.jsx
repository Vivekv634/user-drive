import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Edit() {
  const [ID, setID] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (Cookies.get('userTokenID')) {
      setID(Cookies.get('userTokenID'));
    } else {
      navigate('/login');
    }
  }, [navigate]);
  return (
    <>
      hello
    </>
  )
}
