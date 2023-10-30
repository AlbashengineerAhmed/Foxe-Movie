import React from 'react';
import Login from '../Login/Login.jsx';
import Movies from '../Movies/Movies.jsx';
import Navbar from '../Navbar/Navbar.jsx';
import People from '../People/People.jsx';
import Tvshow from '../Tvshow/Tvshow.jsx';
import Register from '../Register/Register.jsx';
import Notfound from '../Notfound/Notfound.jsx';
import Footer from '../Footer/Footer.jsx';
import Home from '../Home/Home.jsx';
import './App.css';
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import JwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import Details from './../Details/Details';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import baseURL from '../../config.js';

function App() {
  const Navigate = useNavigate();
  const [loginData, setLoginData] = useState(null);
  const [name, setName] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const userProfile = async () => {
    try {
      const userToken = localStorage.getItem('userToken');
      if (userToken) {
        const config = {
          headers: {
            'authorization': `ahmed_${userToken}`,
          },
        };

        const { data } = await axios.get(`${baseURL}/user/profile`, config);
        setName(data.user.firstName);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setLoading(false); // Ensure to set loading to false when the request completes
    }
  };

  function setUserData() {
    const decodeToken = JwtDecode(localStorage.getItem('userToken'));
    setLoginData(decodeToken);
    setLoading(false);
  }

  function logOut() {
    localStorage.removeItem('userToken');
    setLoginData(null);
    Navigate('/login');
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      setUserData();
      userProfile();
    } else {
      setLoading(false); // If there's no token, set loading to false
    }
  }, []);

  return (
    <>
      <Navbar name={name} loginData={loginData} logOut={logOut} />
      <div className="container-fluid" style={{minHeight:"750px"}}>
        {loading ? (
          <div className="text-center" style={{ paddingTop: '100px' }}>
            <i className="fa fa-spinner fa-spin fa-3x"></i> Loading...
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoute loginData={loginData} />}>
              <Route path="home" element={<Home />} />
              <Route path="movies" element={<Movies />} />
              <Route path="tvshow" element={<Tvshow />} />
              <Route path="people" element={<People />} />
              <Route path="details" element={<Details />} />
            </Route>
            <Route path="login" element={<Login setUserData={setUserData} />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        )}
      </div>
      <Footer />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
