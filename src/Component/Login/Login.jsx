import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import baseURL from '../../config';

export default function Login({setUserData}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format'),
    password: Yup.string().required('Password is required'),
  });
  function goToHome(){
    let path = '/home';
    navigate(path);
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const { data } = await axios.post(`${baseURL}/auth/login`, values);
        if (data.message === 'Done') {
          localStorage.setItem('userToken', data.token)
          setUserData();
          toast.success('Login successful', {
            position: 'bottom-right',
            autoClose: 3000, // Close after 3 seconds
          });
          goToHome()
        } else {
          toast.error(`Login failed ${data.message }`, {
            position: 'bottom-right',
            autoClose: 3000, // Close after 3 seconds
          });
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occurred while processing your request', {
          position: 'bottom-right',
          autoClose: 3000, // Close after 3 seconds
        });
      }
      setLoading(false);
    },
  });

  return (
    <div className="center-nav-form d-flex justify-content-center align-items-center">
      <ToastContainer />
      {/* Login form */}
      <section className="signup">
        <div className="container">
          <div className="signup-content d-flex justify-content-center align-items-center">
            <div className="signup-form">
              <h2 className="form-title">Login</h2>
              <form
                className="signup-form m-0 p-0 w-100"
                id="login-form"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="fa-solid fa-envelope"></i>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    {...formik.getFieldProps('email')}
                    placeholder="Your Email"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="password">
                    <i className="fa-solid fa-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    {...formik.getFieldProps('password')}
                    placeholder="Password"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="login"
                    id="login"
                    className="form-submit"
                    value="Login"
                    disabled={loading || formik.isSubmitting}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src="signin-image.jpg" alt="Login" />
              </figure>
              <Link to="/register" className="signup-image-link mb-4">
                I don't have an account
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
