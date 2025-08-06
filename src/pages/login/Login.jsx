import React, { useContext, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { api, setBearerToken } from '../../API/api';
import DataContext from '../../context/DataContest';

const Login = () => {

  const navigate = useNavigate();
  const { setLoginPage, setToken, setuserDetails, initDataLoad, Toast } = useContext(DataContext);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const formik = useFormik({
    initialValues: {
      user_name: '',
      password: ''
    },
    validationSchema: Yup.object({
      user_name: Yup.string()
        .min(6, 'username must be at least 6 characters')
        .required('username is required'),
      password: Yup.string()
        .min(4, 'Password must be at least 4 characters')
        .required('Password is required')
    }),
    onSubmit: (values, { setFieldError }) => {

      const postUser = async () => {
        setIsLoading(true);
        try {
          const res = await api.post("users/login", { ...values });
          if (res.data.access_token) {
            localStorage.setItem("token", res.data.access_token);
            setToken(res.data.access_token);
            setBearerToken(res.data.access_token);
            localStorage.setItem("userDetail", JSON.stringify(res.data.user_details));
            setuserDetails(res.data.user_details);
          }

          Toast.fire({
            icon: "success",
            title: "Logined successfully"
          });

          initDataLoad();
          navigate("/home");
          setLoginPage({
            isActive: false,
            isLogined: true
          })

        } catch (e) {
          if (e.response) {
            if (e.response.status === 401) {
              console.log("Unauthorized: Invalid username or password");
              setFieldError("password", "Invalid username or password");
            } else {
              console.log("Server error:", e.response.status);
              alert("Something went wrong!, Try again");
            }
          } else if (e.request) {
            console.log("No response from server.");
            alert("No response from server, Try again");
          } else {
            console.log("Request error:", e.message);
            alert("Something went wrong!, Try again");
          }
        } finally {
          setIsLoading(false);
        }
      };

      postUser();

    }
  });

  return (
    <div className='place-content-center place-items-center py-5 md:py-10'>

      <h2 className='login-title'>Welcome Back 😊</h2>

      <form onSubmit={formik.handleSubmit} className='login-form' >
        <div className='w-full text-center  -mt-4 '>
          <h3 className='text-blue-900 text-[26px] font-semibold'>Login</h3>
        </div>
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

        <div className=" w-full">
          <label htmlFor="password" className="sr-only">Enter password:</label>
          <div className='relative'>
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
        </div>

        {formik.touched.password && formik.errors.password && (
          <div style={{ color: 'red' }}>{formik.errors.password}</div>
        )}

        {/* <p className='text-sm text-yellow-700 mt-4'>Forget <a 
        onClick={() => navigate('/changePassword')}
        className='cursor-pointer hover:underline hover:text-blue-700'>username/password</a> ?</p> */}

        <button 
          type="submit" 
          className='btn-1 mt-1 flex items-center justify-center gap-2' 
          disabled={isLoading}
        >
          {isLoading && (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          )}
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <h4>I don't have account, click to <button className='px-2 btn-1  mt-5' onClick={() => navigate('/signup')}>SignUp</button></h4>
    </div>
  );
};

export default Login;