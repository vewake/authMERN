import React, { useState } from "react";
import { ToastContainer } from 'react-toastify';
import '../pages/signup.css'
import { handleSuccess, handleError } from "./utils.jsx";
import { Link, useNavigate } from 'react-router-dom';
// import { Navigate } from "react-router-dom";



function Signup() {

    const [signupInfo, setsignupInfo] = useState({
        name: '',
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copysignupInfo = { ...signupInfo }
        copysignupInfo[name] = value;
        setsignupInfo(copysignupInfo)
    }
    //console.log('signupInfo ->', signupInfo)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = signupInfo;
        if (!name || !email || !password) {
            return handleError('ALL fields are required')
        }

        try {
            const url = "http://localhost:7500/user/signup";
            const respond = await fetch(url, {
                method: "POST",
                headers: {
                    'content-type': 'application/json'

                },
                body: JSON.stringify(signupInfo)
            });

            const result = await respond.json();
            const { success, message, error } = result;

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);

            }
            else if (error) {
                const detials = error?.details[0].message;
                handleError(detials);
            }
            else if (!success) {
                handleError(message)
            }
            console.log(result)

        } catch (error) {
            handleError(error);
        }
    }

    return (
        <>
            <div className="container">
                <div className="center">
                    <h1>Register</h1>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="txt_field">
                            <label htmlFor="name">Name</label>
                            <input
                                onChange={handleChange}
                                type='text'
                                name='name'
                                placeholder="Enter name"
                            />
                        </div>

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

                        <input type="submit" value="Sign Up" />
                        {/* <div className="signup_link">
                            Have an Account? <a href="login.html">Login Here</a>
                        </div> */}

                        <div className="signup_link">
                            Have an Account? <Link to="/login">Login Here</Link>
                        </div>

                    </form>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}

export default Signup;
