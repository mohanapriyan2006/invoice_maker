import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
// Use local storage registration via DataContext
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useContext } from 'react';
import DataContext from '../../context/DataContest';


const SignUp = () => {

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register: registerUser, Toast } = useContext(DataContext);


    const formik = useFormik({
        initialValues: {
            name: '',
            user_name: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
            user_name: Yup.string()
                .min(6, 'username must be at least 6 characters')
                .required('username is required'),
            role: Yup.string().oneOf(['artist', 'collector'], 'Invalid role').required('Role is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string()
                .min(4, 'Password must be at least 4 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: async (vals, { setFieldError }) => {
            const { name, user_name, role, email, password } = vals;
            const form = { name, user_name, role, email, password };
            setIsLoading(true);
            try {
                await registerUser(form);
            } catch (e) {
                if (e?.code === 'USERNAME_TAKEN') {
                    setFieldError('user_name', 'Username already registered!');
                } else {
                    setFieldError('user_name', e?.message || 'Signup failed. Try again.');
                }
            } finally {
                setIsLoading(false);
            }
        }
    });

    return (
        <div className='place-content-center place-items-center py-5 md:py-10'>
            <h2 className='login-title'>Create an account 😊</h2>
            <form onSubmit={formik.handleSubmit} className='login-form'>

                <div className='w-full text-center  -mt-4 '>
                    <h3 className='text-blue-900 text-[26px] font-semibold'>SignUp</h3>
                </div>

                <label htmlFor="name" className='absolute -left-999999'>Enter name:</label>
                <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    className='login-input'
                    placeholder='  Enter name'
                />
                {formik.touched.name && formik.errors.name && (
                    <div style={{ color: 'red' }}>{formik.errors.name}</div>
                )}

                <label htmlFor="user_name" className='absolute -left-999999'>Enter user_name:</label>
                <input
                    type="text"
                    name="user_name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.user_name}
                    className='login-input'
                    placeholder='  Enter username'

                />
                {formik.touched.user_name && formik.errors.user_name && (
                    <div style={{ color: 'red' }}>{formik.errors.user_name}</div>
                )}

                <label htmlFor="email" className='absolute -left-999999'>Enter email:</label>
                <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className='login-input'
                    placeholder='  Enter email'
                />
                {formik.touched.email && formik.errors.email && (
                    <div style={{ color: 'red' }}>{formik.errors.email}</div>
                )}

                <div className="relative w-full">
                    <label htmlFor="password" className="sr-only">Enter password:</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                        placeholder="  Enter password"
                        className="login-input pr-10"
                    />
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? <EyeOff className="w-auto h-5 mt-3 text-gray-500" /> : <Eye className="w-auto h-5 mt-3 text-gray-500" />}
                    </div>
                </div>
                {formik.touched.password && formik.errors.password && (
                    <div style={{ color: 'red' }}>{formik.errors.password}</div>
                )}

                <label htmlFor="confirmPassword" className='absolute -left-999999'>Confirm password:</label>
                <input
                    type="password"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    className='login-input'
                    placeholder='  Re-Enter password'


                />
                {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                    <div style={{ color: 'red' }}>{formik.errors.confirmPassword}</div>
                )}

                <button type="submit" className='btn-1  flex items-center justify-center gap-2 mt-5' disabled={isLoading}>
                    {isLoading && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isLoading ? 'Signing...' : 'Sign Up'}
                </button>
            </form>

            <h4>I already have account, click to <button className='px-2 btn-1  mt-5' onClick={() => navigate('/')}>Login</button></h4>

        </div>
    );
};

export default SignUp;
