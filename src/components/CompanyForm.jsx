import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../API/api';
import DataContext from '../context/DataContest';

const CompanyForm = () => {

  const { token,navigate,fetchCompany } = useContext(DataContext);


  const formik = useFormik({
    initialValues: {
      company_owner: 0,
      company_name: '',
      company_address: '',
      company_gstin: '',
      company_msme: '',
      company_email: '',
      company_bank_account_no: '',
      company_bank_name: '',
      company_account_holder: '',
      company_branch: '',
      company_ifsc_code: ''
    },

    validationSchema: Yup.object({
      company_owner: Yup.number().required('Owner ID is required'),
      company_name: Yup.string().required('Company name is required'),
      company_address: Yup.string().required('Address is required'),
      company_gstin: Yup.string().required('GSTIN is required'),
      company_msme: Yup.string().required('MSME is required'),
      company_email: Yup.string().email('Invalid email').required('Email is required'),
      company_bank_account_no: Yup.string().required('Bank Account No. is required'),
      company_bank_name: Yup.string().required('Bank Name is required'),
      company_account_holder: Yup.string().required('Account Holder Name is required'),
      company_branch: Yup.string().required('Branch is required'),
      company_ifsc_code: Yup.string().required('IFSC Code is required'),
    }),

    onSubmit: (values,{setFieldError}) => {
      const postC = async () => {
        try {
          await api.post("/companies", { ...values },
            {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            }
          )
        fetchCompany();
        navigate("/companies");

        } catch (e) {
          if (e.response && e.response.data) {
            setFieldError("company_ifsc_code","Invalid Details, Once again check")
          } else {
            alert("Server Error : ", e);
          }
        }
      }

      postC();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className=" ml-15 md:mx-auto p-4 space-y-4 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-800">Company Registration</h2>

      {Object.keys(formik.initialValues).map((key) => (
        <div key={key} className="flex flex-col">
          <label htmlFor={key} className="capitalize font-semibold">{key.replace(/_/g, ' ')}<span className='text-red-600'>*</span></label>
          <input
            id={key}
            name={key}
            type={key === 'company_owner' ? 'number' : 'text'}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[key]}
            className="border border-gray-300 p-2 rounded"
          />
          {formik.touched[key] && formik.errors[key] && (
            <span className="text-red-500 text-sm">{formik.errors[key]}</span>
          )}
        </div>
      ))}
      <div className='grid grid-cols-2 items-center gap-1 md:gap-10'>
        <button 
        onClick={() => navigate("/companies")}
        type='button'
         className="border-3 border-blue-600 h-12 px-6 rounded-2xl hover:bg-blue-500 hover:text-white cursor-pointer">Cancel</button>
        <button type="submit" className="btn-1 px-6 h-12">Submit</button>
      </div>
    </form>
  );
};

export default CompanyForm;
