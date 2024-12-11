import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import '../pages/login.css';
import { handleSuccess, handleError } from "./utils.jsx";
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError('Both fields are required');
    }

    try {
      const url = "http://localhost:7500/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, error
      } = result;
      const token = result.token


      if (success) {
        localStorage.setItem("token", token)
        handleSuccess(message);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);

    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="center">
          <h1>Login</h1>
          <form method="POST" onSubmit={handleSubmit}>
            <div className="txt_field">
              <label htmlFor="email">Email</label>
              <input
                onChange={handleChange}
                type='email'
                name='email'
                placeholder="Enter email"
              />
            </div>

            <div className="txt_field">
              <label htmlFor="password">Password</label>
              <input
                onChange={handleChange}
                type='password'
                name='password'
                placeholder="Enter password"
              />
            </div>

            <input type="submit" value="Login" />
            <div className="signup_link">
              Don't have an account? <Link to="/signup">Sign Up Here</Link>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Login;
