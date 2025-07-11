import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DataContext from '../../context/DataContest';
import { api } from '../../API/api';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {

    const { navigate, userDetails, token, Toast , setLoginPage } = useContext(DataContext);

    const [showPassword, setShowPassword] = useState(false);

    const formik = useFormik({
        initialValues: {
            user_name: '',
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            user_name: Yup.string()
                .min(6, 'username must be at least 6 characters')
                .required('username is required'),
            newPassword: Yup.string()
                .min(4, 'Password must be at least 4 characters')
                .required('New password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                .required('Please confirm your new password')
        }),
        onSubmit: (values, { setFieldError }) => {
            console.log('Form submitted:', values);
            const putUser = async (userID) => {
                try {
                    await api.put(`users/${userID}`, { user_name: values.user_name, password: values.newPassword }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    Toast.fire({
                        icon: "success",
                        title: "Successfully userdetail updated"
                    });
                    navigate("/");
                } catch (e) {
                    if (e.response && e.response.data) {
                        console.log("Error Details:", e.response.data);
                        if (e.response.data.detail) {
                            setFieldError("user_name", "Username already registered !");
                        } else {
                            setFieldError("user_name", "Signup failed. Try again.");
                        }
                    } else {
                        setFieldError("user_name", "Server error. Try again later.");
                    }
                }

            }
            putUser(userDetails.user_id);
        }
    });


    return (
        <div className="place-content-center place-items-center py-5">

            <form onSubmit={formik.handleSubmit} className='login-form' >
                <div className='w-full text-center  -mt-4 '>
                    <h3 className='text-blue-900 text-[26px] font-semibold'>Change password</h3>
                </div>

                <div>
                    <label className='absolute -left-99999' htmlFor="user_name">Enter username :</label>
                    <input
                        type="text"
                        name="user_name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.user_name}
                        placeholder='  Enter username'
                        className='login-input'
                    />
                    {formik.touched.user_name && formik.errors.user_name && (
                        <div style={{ color: 'red' }}>{formik.errors.user_name}</div>
                    )}
                </div>

                <div className='relative w-full'>
                    <label className='absolute -left-99999' >New Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.newPassword}
                        placeholder='  Enter new password'
                        className='login-input'
                    />
                    <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(prev => !prev)}
                    >
                        {showPassword ? <EyeOff className="w-auto h-5 mt-4 text-gray-500" /> : <Eye className="w-auto mt-4 h-5 text-gray-500" />}
                    </div>
                </div>
                {formik.touched.newPassword && formik.errors.newPassword ? (
                    <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
                ) : null}

                <div>
                    <label className='absolute -left-99999'>Confirm Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        name="confirmPassword"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                        placeholder='  confirm password'
                        className="login-input pr-10"
                    />

                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
                    ) : null}
                </div>

                <button type="submit" className='btn-1  mt-1'>
                    Change Password
                </button>
            </form>

            <h4><button className='back h-2' onClick={() => {
                navigate('/home');
                setLoginPage({
                    isActive: false,
                    isLogined: true
                })
            }}>Back</button> / Go to<button className='px-2 btn-1  mt-5' onClick={() => navigate('/')}>login</button></h4>
        </div>
    );
};

export default ChangePassword;
