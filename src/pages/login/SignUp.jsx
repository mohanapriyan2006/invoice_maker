import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../../API/api';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const navigate = useNavigate();


    const formik = useFormik({
        initialValues: {
            user_name: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            user_name: Yup.string()
                .min(6, 'username must be at least 6 characters')
                .required('username is required'),
            password: Yup.string()
                .min(4, 'Password must be at least 4 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required')
        }),
        onSubmit: (values) => {
            console.log('Form submitted:', values);
            const postUser = async () => {
                try {
                    await api.post("/signup", { ...values })
                    navigate("/login");
                } catch (e) {
                    console.log(e.message);
                    alert(e.message);
                }
            }

            postUser();
        }
    });

    return (
        <div className='place-content-center place-items-center py-20'>
            <h2 className='login-title'>Create an account 😊</h2>
            <form onSubmit={formik.handleSubmit} className='login-form'>

                <div className='w-full text-center  -mt-4 '>
                    <h3 className='text-blue-900 text-[26px] font-semibold'>SignUp</h3>
                </div>

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

                <label htmlFor="password" className='absolute -left-999999'>Create password:</label>
                <input
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className='login-input'
                    placeholder='  Enter password'

                />
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

                <button type="submit" className='btn-1'>Sign Up</button>
            </form>

            <h4>I already have account, click to <button className='px-2 btn-1' onClick={() => navigate('/login')}>Login</button></h4>

        </div>
    );
};

export default SignUp;
