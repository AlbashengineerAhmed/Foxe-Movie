import React, { useState } from 'react';
import style from './Register.module.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import baseURL from '../../config';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const initialValues = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    cPassword: '',
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required('First Name is required')
      .min(3, 'First Name must be at least 3 characters')
      .max(10, 'First Name can be at most 10 characters'),
    lastName: Yup.string()
      .required('Last Name is required')
      .min(3, 'Last Name must be at least 3 characters')
      .max(10, 'Last Name can be at most 10 characters'),
    age: Yup.number()
      .required('Age is required')
      .min(15, 'You must be at least 15 years old')
      .max(100, 'Age can be at most 100 years'),
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format')
      .matches(/(com|net)$/, 'Email must end with .com or .net'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, and be at least 8 characters long'
      ),
    cPassword: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log('Form values:', values); // Log the form values
      setLoading(true);
      try {
        const { data } = await axios.post(`${baseURL}/auth/signup`, values);
        console.log(data);
        if (data.message === 'Done') {
          toast.success('Registration successful', {
            position: 'bottom-right',
            autoClose: 3000, // Close after 3 seconds
        });
          navigate('/login');
        } else {
          formik.setErrors({ email: 'Registration failed: ' + data.message });
        }
      } catch (error) {
        formik.setErrors({ email: 'An error occurred while processing your request' });
      }
      setLoading(false);
    },
  });

  return (
    <div className="center-nav-form d-flex justify-content-center align-items-center">
      <ToastContainer />
      {/* Sign up form */}
      <section className="signup">
        <div className="container">
          <div className="signup-content d-flex justify-content-center align-items-center">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              <form
                className="register-form"
                id="register-form"
                onSubmit={formik.handleSubmit}
              >
                <div className="form-group">
                  <label htmlFor="firstName">
                    <i className="fa-solid fa-user"></i>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    {...formik.getFieldProps('firstName')}
                    placeholder="Your First Name"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <div className="error">{formik.errors.firstName}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">
                    <i className="fa-solid fa-user"></i>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    {...formik.getFieldProps('lastName')}
                    placeholder="Your Last Name"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <div className="error">{formik.errors.lastName}</div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="age">
                    <i className="fa-solid fa-user-pen"></i>
                  </label>
                  <input
                    type="text"
                    name="age"
                    id="age"
                    {...formik.getFieldProps('age')}
                    placeholder="Your Age"
                  />
                  {formik.touched.age && formik.errors.age ? (
                    <div className="error">{formik.errors.age}</div>
                  ) : null}
                </div>
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
                <div className="form-group">
                  <label htmlFor="cPassword">
                    <i className="fa-solid fa-user-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="cPassword"
                    id="cPassword"
                    {...formik.getFieldProps('cPassword')}
                    placeholder="Repeat your password"
                  />
                  {formik.touched.cPassword && formik.errors.cPassword ? (
                    <div className="error">{formik.errors.cPassword}</div>
                  ) : null}
                </div>
                <div className="form-group form-button">
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    className="form-submit"
                    value="Register"
                    disabled={loading || formik.isSubmitting}
                  />
                </div>
              </form>
            </div>
            <div className="signup-image">
              <figure>
                <img src="signup-image.jpg" alt="Sign Up" />
              </figure>
              <Link to="/login" className="signup-image-link mb-4">
                I am already a member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
