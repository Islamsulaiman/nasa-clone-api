import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import "./Login.css";

const LoginForm = () => {
  const initialValues = {
    userName: '',
    password: ''
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = (values, { resetForm }) => {
    // Handle form submission
    console.log(values);

    // Reset the form
    resetForm();
  };

  return (
    <div className='login'>
        <div className="login-container">
        <h1>Login</h1>
        <p>Please enter your username and password.</p>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
            <div>
                <label htmlFor="userName"><b>Username:</b></label>
                <Field type="text" id="userName" name="userName" placeholder="Enter Username" />
                <ErrorMessage name="userName" component="div" className="error" />
            </div>
            <div>
                <label htmlFor="password"><b>Password:</b></label>
                <Field type="password" id="password" name="password" placeholder="Enter Password" />
                <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="clearfix">
                <button type="submit" className="btn">Login</button>
            </div>
            </Form>
        </Formik>
        </div>
    </div>
  );
};

export default LoginForm;
