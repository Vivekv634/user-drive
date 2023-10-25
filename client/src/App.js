import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Edit from './pages/Edit';
import PasswordChange from './pages/PasswordChange';
import PageNotFound from './pages/PageNotFound';
import { userDataContext } from './Context/userDataContext';
import { useState } from 'react';

function App() {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  return (
    <userDataContext.Provider value={{ fname, setFname, lname, setLname, email, setEmail }}>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/edit' element={<Edit />} />
          <Route exact path='/changePassword' element={<PasswordChange />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </userDataContext.Provider>
  );
}

export default App;
