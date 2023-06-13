import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Registration.css"
const RegistrationForm = () => {
  const initialValues = {
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required').min(3, 'First name must be at least 3 characters'),
    lastName: Yup.string().required('Last Name is required').min(3, 'Last name must be at least 3 characters'),
    userName: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/,
        'Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission
    console.log(values);

    // Reset the form
    resetForm();
  };

  return (
    <div className="register-container">
      <h1>Sign Up</h1>
      <p>Please fill in this form to create an account.</p>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor="firstName"><b>First Name:</b></label>
            <Field type="text" id="firstName" name="firstName" placeholder="Enter First Name" />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="lastName"><b>Last Name:</b></label>
            <Field type="text" id="lastName" name="lastName" placeholder="Enter Last Name" />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="email"><b>Email:</b></label>
            <Field type="email" id="email" name="email" placeholder="Enter Email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="password"><b>Password:</b></label>
            <Field type="password" id="password" name="password" placeholder="Enter Password" />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div>
            <label htmlFor="confirmPassword"><b>Confirm Password:</b></label>
            <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" />
            <ErrorMessage name="confirmPassword" component="div" className="error" />
          </div>
          <p>By creating an account you agree to our <span style={{ color: 'dodgerblue' }}>Terms & Privacy</span>.</p>
          <div className="clearfix">
            <button type="submit" className="btn">Sign Up</button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
