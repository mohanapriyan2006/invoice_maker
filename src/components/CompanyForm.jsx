import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { api } from '../API/api';
import DataContext from '../context/DataContest';
import { useParams } from 'react-router-dom';

const CompanyForm = ({ editMode = false }) => {

  const { id } = useParams();

  const { token, navigate, fetchCompany, userDetails, yourCompanies } = useContext(DataContext);

  const [editCompanyData, setEditCompanyData] = useState(null);


  const formik = useFormik({
    initialValues: {
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

    onSubmit: (values, { setFieldError }) => {
      const saveCompany = async () => {
        try {
          if (editMode && editCompanyData) {
            // PUT request (Update)
            await api.put(`/companies/${editCompanyData.company_id}`, values);
          } else {
            // POST request (Create)
            await api.post("/companies", {
              ...values,
              company_owner: userDetails.user_id,
            });
          }

          fetchCompany();
          navigate("/companies");
        } catch (e) {
          if (e.response && e.response.data) {
            setFieldError("company_ifsc_code", "Invalid Details, check again");
            console.error("Company Save Error: ", e.response.data);
          } else {
            alert("Server Error: " + e.message);
          }
        }
      };

      saveCompany();
    },
  });

  // Pre-fill values if editing
  useEffect(() => {
    if (editMode) {
      const temp = yourCompanies.find(val => val.company_id === id);
      setEditCompanyData(temp);
    }
    if (editMode && editCompanyData) {
      formik.setValues({
        company_name: editCompanyData.company_name || '',
        company_address: editCompanyData.company_address || '',
        company_gstin: editCompanyData.company_gstin || '',
        company_msme: editCompanyData.company_msme || '',
        company_email: editCompanyData.company_email || '',
        company_bank_account_no: editCompanyData.company_bank_account_no || '',
        company_bank_name: editCompanyData.company_bank_name || '',
        company_account_holder: editCompanyData.company_account_holder || '',
        company_branch: editCompanyData.company_branch || '',
        company_ifsc_code: editCompanyData.company_ifsc_code || ''
      });
    }
  }, [editMode, editCompanyData]);

  return (
    <form onSubmit={formik.handleSubmit} className="model-form">
      <h2 className="form-title">
        {editMode ? 'Edit Company' : 'Company Registration'}
      </h2>

      {Object.keys(formik.initialValues).map((key) => (
        <div key={key} className="flex flex-col">
          <label htmlFor={key} className="capitalize font-semibold">
            {key.replace(/_/g, ' ')}<span className='text-red-600'>*</span>
          </label>
          <input
            id={key}
            name={key}
            type='text'
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
          className="cancel">
          Cancel
        </button>
        <button type="submit" className="btn-1 px-6 h-12">
          {editMode ? 'Update' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default CompanyForm;

