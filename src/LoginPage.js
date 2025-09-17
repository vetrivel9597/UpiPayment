import React, { useState } from 'react';
import "./App.css";
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from "axios"
import config from "./Config/URL"
import API from "./Config/Methods"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AdvancedLoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const togglePassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!formData.email || !formData.password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Login failed.');
            }


            if (formData.remember) {
                localStorage.setItem('token', data.token);
            } else {
                sessionStorage.setItem('token', data.token);
            }

            alert('Login successful!');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object().shape({
            email: yup.string()
                .matches(
                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    "Enter a valid email address"
                )
                .required("Enter your email"),
            password: yup.string().required("Enter the password")
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                console.log('values :', values)
                // const res = await axios.post(`${config.ADMIN_URL}Login`, {
                //     email : values.email,
                //     password : values.password
                // })
                const params = {
                    url: `${config.ADMIN_URL}Login`,
                    method: "POST",
                    data: {
                        email: values.email,
                        password: values.password,
                    },
                };
                const response = await API(params);
                console.log('response', response)
                if (response.status) {
                    toast.success("Login Success")
                    resetForm()
                    navigate("/DeshBoard")
                } else {
                    toast.error(response.ErrorMessage)
                }
            } catch (error) {
                console.log('OnsubmitError :', error)
            }

        }
    })

    return (
        <div className="advanced-login-container">
            <form className="advanced-login-form" onSubmit={formik.handleSubmit}>
                <h2>Login</h2>

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                />
                {
                    formik.errors.email && formik.touched.email && (
                        <div>
                            <p style={{
                                color: 'red',
                                fontSize: '0.85rem',
                                margin: '4px 0 0 0',
                                padding: '0',
                                lineHeight: '1.2',
                                fontWeight: '500',
                            }}>{formik.errors.email}</p>
                        </div>
                    )
                }

                <div className="password-wrapper">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                    />

                    {
                        formik.errors.password && formik.touched.password && (
                            <div>
                                <p style={{
                                    color: 'red',
                                    fontSize: '0.85rem',
                                    margin: '4px 0 0 0',
                                    padding: '0',
                                    lineHeight: '1.2',
                                    fontWeight: '500',
                                }} >{formik.errors.password}</p>
                            </div>
                        )
                    }
                    <button type="button" onClick={togglePassword}>
                        {showPassword ? 'Hide' : 'Show'}
                    </button>
                </div>

                <label className="remember-me">
                    <input
                        type="checkbox"
                        name="remember"
                        checked={formData.remember}
                        onChange={handleChange}
                    />
                    Remember Me
                </label>

                {error && <p className="error">{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default AdvancedLoginPage;
