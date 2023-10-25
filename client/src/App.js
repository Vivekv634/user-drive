import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Edit from './pages/Edit';
import PasswordChange from './pages/PasswordChange';
import PageNotFound from './pages/PageNotFound';
import ForgetPassword from './pages/ForgetPassword';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/edit' element={<Edit />} />
        <Route exact path='/changePassword' element={<PasswordChange />} />
        <Route exact path='/forgetPassword' element={<ForgetPassword />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
