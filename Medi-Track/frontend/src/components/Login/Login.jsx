import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import { Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [loginError, setLoginError] = useState(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const navigate = useNavigate();
    const backend_url = 'http://localhost:3001';

    const handleSubmit = (event) => {
        event.preventDefault();
        setShowAnimation(true);

        axios
            .post(`${backend_url}/login`, { email, password, role })
            .then((result) => {
                if (result.data === 'Success') {
                    localStorage.setItem('role', role);
                    localStorage.setItem('email', email);
                    if (role === 'Admin') navigate('/home');
                    else if (role === 'Patient') navigate('/patdash');
                    else if (role === 'Doctor') navigate('/docdash');
                } else {
                    setLoginError(true);
                    setShowAnimation(false);
                }
            })
            .catch((err) => {
                console.error('Login error:', err);
                setLoginError(true);
                setShowAnimation(false);
            });
    };

    useEffect(() => {
        if (showAnimation) {
            setTimeout(() => {
                setShowAnimation(false);
            }, 1000);
        }
    }, [showAnimation]);

    return (
        <div className="login-background">
            <div className="login-container">
                <h2 className="login-title">Welcome to Medi-Track</h2>
                <form onSubmit={handleSubmit}>
                <div className="input-group mb-3 text-start">
                        <div className="label-container">
                            <label htmlFor="email"><strong>Email</strong></label>
                        </div>
                        <div className="input-container">
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group mb-3 text-start">
                        <div className="label-container">
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="input-container">
                            <input
                                type="password"
                                placeholder="Enter Password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className="input-group mb-3 text-start">
                        <div className="label-container">
                            <label htmlFor="role">Role</label>
                        </div>
                        <div className="input-container">
                            <select
                                className="form-select"
                                id="role"
                                value={role}
                                onChange={(event) => setRole(event.target.value)}
                            >
                                <option value="">Select your role</option>
                                <option value="Admin">Admin</option>
                                <option value="Patient">Patient</option>
                                <option value="Doctor">Doctor</option>
                            </select>
                        </div>
                    </div><div className="btn-container">
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button></div>
                </form>
                {loginError && (
                    <div className="alert alert-danger" role="alert">
                        Incorrect Credentials! Please try again.
                    </div>
                )}
                {showAnimation && (
                    <div className="my-3 text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )}
                <Link to="/register" className="btn btn-secondary mt-3">
                    Register
                </Link>
                <p className="mt-3 text-muted">© Medi-Track</p>
            </div>
        </div>
    );
};

export default Login;