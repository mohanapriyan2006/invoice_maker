
import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Building2, Mail, CreditCard, MapPin, Hash, Award, Landmark, User, GitBranch, Code } from 'lucide-react';
import DataContext from '../context/DataContest';
import { api } from '../API/api';
import { useParams } from 'react-router-dom';
import indiaStateCities from '../data/indiaStateCities.js';

const CompanyForm = ({ editMode = false }) => {
  const { navigate, fetchCompany, userDetails, yourCompanies, Toast } = useContext(DataContext);
  const [editCompanyData, setEditCompanyData] = useState(null);
  const { id } = useParams();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");


  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    formik.setFieldValue('company_state', e.target.value);
    formik.setFieldValue('company_city', '');
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    formik.setFieldValue('company_city', e.target.value);
  };

  const cities = indiaStateCities.find(s => s.state === selectedState)?.cities || [];

  const formik = useFormik({
    initialValues: {
      company_name: '',
      company_address: '',
      company_state: '',
      company_city: '',
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
      company_city: Yup.string().required('City is required'),
      company_state: Yup.string().required('State is required'),
      company_gstin: Yup.string().required('GSTIN is required'),
      company_msme: Yup.string().required('MSME is required'),
      company_email: Yup.string().email('Invalid email').required('Email is required'),
      company_bank_account_no: Yup.string().required('Bank Account No. is required'),
      company_bank_name: Yup.string().required('Bank Name is required'),
      company_account_holder: Yup.string().required('Account Holder Name is required'),
      company_branch: Yup.string().required('Branch is required'),
      company_ifsc_code: Yup.string().required('IFSC Code is required'),
    }),

    onSubmit: (values, { setFieldError, setSubmitting }) => {
      const saveCompany = async () => {
        try {
          if (editMode && editCompanyData) {
            await api.put(`/companies/${editCompanyData.company_id}`, values);
            Toast.fire({
              icon: "success",
              title: "Successfully company updated"
            });
          } else {
            console.log("posting..");
            await api.post("/companies", {
              ...values,
              company_owner: userDetails.user_id,
            });
            Toast.fire({
              icon: "success",
              title: "Successfully company created"
            });
          }

          fetchCompany();
          setSubmitting(false);
          navigate("/companies");
        } catch (e) {
          setSubmitting(false);
          if (e.response && e.response.data) {
            setFieldError(e.response?.data?.detail[0]?.loc[1] || 'company_ifsc_code', e.response?.data?.detail[0].msg || "Invalid data , check again!");
            console.error("Company Save Error: ", e.response.data);
          } else {
            alert("Server Error: " + e.message);
          }
        }
      };

      saveCompany();
    },
  });

  useEffect(() => {
    if (editMode && id) {
      const temp = yourCompanies.find(val => val.company_id === id);
      setEditCompanyData(temp);
    }
  }, [editMode, id, yourCompanies]);

  useEffect(() => {
    if (editMode && editCompanyData) {
      setSelectedState(editCompanyData.company_state || '');
      setSelectedCity(editCompanyData.company_city || '');
      formik.setValues({
        company_name: editCompanyData.company_name || '',
        company_address: editCompanyData.company_address || '',
        company_city: editCompanyData.company_city || '',
        company_state: editCompanyData.company_state || '',
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
  }, [editCompanyData, editMode]);



  const getFieldIcon = (key) => {
    const iconMap = {
      company_name: <Building2 className="w-5 h-5" />,
      company_address: <MapPin className="w-5 h-5" />,
      company_city: <MapPin className="w-5 h-5" />,
      company_state: <MapPin className="w-5 h-5" />,
      company_gstin: <Hash className="w-5 h-5" />,
      company_msme: <Award className="w-5 h-5" />,
      company_email: <Mail className="w-5 h-5" />,
      company_bank_account_no: <CreditCard className="w-5 h-5" />,
      company_bank_name: <Landmark className="w-5 h-5" />,
      company_account_holder: <User className="w-5 h-5" />,
      company_branch: <GitBranch className="w-5 h-5" />,
      company_ifsc_code: <Code className="w-5 h-5" />
    };
    return iconMap[key] || <Building2 className="w-5 h-5" />;
  };

  const getFieldType = (key) => {
    if (key === 'company_email') return 'email';
    // if (key === 'company_bank_account_no') return 'number';
    return 'text';
  };

  const getFieldPlaceholder = (key) => {
    const placeholderMap = {
      company_name: 'Enter your company name',
      company_address: 'Enter complete address',
      company_city: 'Enter city name',
      company_state: 'Enter state name',
      company_gstin: 'Enter GSTIN number',
      company_msme: 'Enter MSME registration number',
      company_email: 'Enter company email address',
      company_bank_account_no: 'Enter bank account number',
      company_bank_name: 'Enter bank name',
      company_account_holder: 'Enter account holder name',
      company_branch: 'Enter branch name',
      company_ifsc_code: 'Enter IFSC code'
    };
    return placeholderMap[key] || 'Enter value';
  };

  const fieldGroups = [
    {
      title: 'Company Information',
      icon: <Building2 className="w-5 h-5" />,
      fields: ['company_name', 'company_address', 'company_state', 'company_city',  'company_email']   
    },
    {
      title: 'Registration Details',
      icon: <Award className="w-5 h-5" />,
      fields: ['company_gstin', 'company_msme']
    },
    {
      title: 'Banking Information',
      icon: <Landmark className="w-5 h-5" />,
      fields: ['company_bank_account_no', 'company_bank_name', 'company_account_holder', 'company_branch', 'company_ifsc_code']
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                {editMode ? 'Edit Company' : 'Company Registration'}
              </h2>
            </div>
            <p className="text-blue-100 mt-2">
              {editMode ? 'Update your company information' : 'Register your company with all required details'}
            </p>
          </div>

          <div className="p-8">
            <form onSubmit={formik.handleSubmit} className="space-y-8">
              {fieldGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-6">
                  <div className="flex items-center space-x-3 pb-4 border-b border-blue-100">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {group.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{group.title}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {group.fields.map((key) => (
                      <div
                        key={key}
                        className={`flex flex-col ${key === 'company_address' ? 'md:col-span-2' : ''}`}
                      >
                        <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-2">
                          {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          <span className="text-red-500 ml-1">*</span>
                        </label>

                        {key === 'company_state' ? (
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                              {getFieldIcon(key)}
                            </div>
                            <select
                              id={key}
                              name={key}
                              value={selectedState}
                              onChange={handleStateChange}
                              onBlur={formik.handleBlur}
                              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${formik.touched[key] && formik.errors[key]
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                }`}
                            >
                              <option value="">-- Select State --</option>
                              {indiaStateCities.map((item, index) => (
                                <option key={index} value={item.state}>
                                  {item.state}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : key === 'company_city' ? (
                          <div className="relative">
                            <div className=" absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10">
                              {getFieldIcon(key)}
                            </div>
                            <select
                              id={key}
                              name={key}
                              value={selectedCity}
                              onChange={handleCityChange}
                              onBlur={formik.handleBlur}
                              disabled={!selectedState}
                              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed ${formik.touched[key] && formik.errors[key]
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                }`}
                            >
                              <option value="">-- Select City --</option>
                              {cities.map((city, index) => (
                                <option key={index} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) : (
                          <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              {getFieldIcon(key)}
                            </div>
                            <input
                              id={key}
                              name={key}
                              type={getFieldType(key)}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values[key]}
                              placeholder={getFieldPlaceholder(key)}
                              className={`w-full pl-12 pr-4 py-3 border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${formik.touched[key] && formik.errors[key]
                                ? 'border-red-300 focus:border-red-500'
                                : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                                }`}
                            />
                          </div>
                        )}
                        {formik.touched[key] && formik.errors[key] && (
                          <div className="mt-1 text-sm text-red-500">{formik.errors[key]}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex flex-col sm:flex-row gap-4 pt-8 mt-8 border-t border-gray-200">
                <button
                  onClick={() => navigate('/companies')}
                  type="button"
                  className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formik.isValid || formik.isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                >
                  {formik.isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    editMode ? 'Update Company' : 'Register Company'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyForm;