import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DataContext from '../../context/DataContest';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {

    const { navigate, userDetails, Toast, setLoginPage, setToken, setuserDetails, updateUser } = useContext(DataContext);

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

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
        onSubmit: async (values, { setFieldError }) => {
            // Basic security: ensure user_name matches logged in user
            if (values.user_name !== userDetails.user_name) {
                setFieldError('user_name', 'Username does not match your account');
                return;
            }
            setIsLoading(true);
            try {
                await updateUser(values.user_name, { password: values.newPassword });
                Toast.fire({ icon: 'success', title: 'Password updated. Please login again.' });
                // Logout flow for preview mode
                localStorage.removeItem('token');
                localStorage.removeItem('userDetail');
                setLoginPage({ isActive: true, isLogined: false });
                setToken("");
                setuserDetails({});
                navigate('/');
            } catch (e) {
                if (e.code === 'User not found') {
                    setFieldError('user_name', 'User not found');
                } else {
                    setFieldError('user_name', 'Failed to update password');
                }
            } finally {
                setIsLoading(false);
            }
        }
    });


    return (
        <div className="place-content-center place-items-center py-8 md:py-20">

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

                <button
                    type="submit"
                    className='btn-1 mt-1 flex items-center justify-center gap-2'
                    disabled={isLoading}
                >
                    {isLoading && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    {isLoading ? 'Changing...' : 'Change Password'}
                </button>
            </form>

            <h4>Go To <button className='back mt-4' onClick={() => {
                navigate('/home');
                setLoginPage({
                    isActive: false,
                    isLogined: true
                })
            }}>Back</button>
            </h4>
        </div>
    );
};

export default ChangePassword;
