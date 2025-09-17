import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { EyeIcon, EyeSlashIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Register = () => {
  const { register: registerUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qualifications, setQualifications] = useState([]);
  const [newQualification, setNewQualification] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const addQualification = () => {
    if (newQualification.trim() && !qualifications.includes(newQualification.trim())) {
      setQualifications([...qualifications, newQualification.trim()]);
      setNewQualification('');
    }
  };

  const removeQualification = (index) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const onSubmit = async (data) => {
    setIsLoading(true);

    try {
      const registrationData = {
        ...data,
        qualifications: qualifications
      };

      const result = await registerUser(registrationData);

      if (result.success) {
        toast.success('Registration successful!');

        if (result.requiresVerification) {
          toast('Please check your email for verification instructions', {
            icon: '📧',
            duration: 6000,
          });
        }

        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <span className="text-primary-600 font-bold text-xl">VP</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your professional account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              sign in to existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>

              <div>
                <label htmlFor="honorable" className="form-label">
                  Title
                </label>
                <select
                  {...register('honorable')}
                  className="form-input"
                >
                  <option value="">Select title</option>
                  <option value="Dr">Dr</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Vlr">Vlr</option>
                </select>
              </div>

              <div>
                <label htmlFor="full_name" className="form-label">
                  Full Name *
                </label>
                <input
                  {...register('full_name', {
                    required: 'Full name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    }
                  })}
                  type="text"
                  className="form-input"
                  placeholder="Enter your full name"
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="form-label">
                  Email Address *
                </label>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password *
                </label>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 8,
                        message: 'Password must be at least 8 characters'
                      }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="form-input pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>

              <div>
                <label htmlFor="professional_title" className="form-label">
                  Professional Title
                </label>
                <input
                  {...register('professional_title')}
                  type="text"
                  className="form-input"
                  placeholder="e.g., Chartered Valuation Surveyor"
                />
              </div>

              <div>
                <label htmlFor="ivsl_registration" className="form-label">
                  IVSL Registration Number
                </label>
                <input
                  {...register('ivsl_registration')}
                  type="text"
                  className="form-input"
                  placeholder="Enter IVSL registration number"
                />
              </div>

              <div>
                <label htmlFor="ivsl_membership" className="form-label">
                  IVSL Membership
                </label>
                <select
                  {...register('ivsl_membership')}
                  className="form-input"
                >
                  <option value="">Select membership level</option>
                  <option value="Fellow">Fellow</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Associate">Associate</option>
                </select>
              </div>

              <div>
                <label htmlFor="professional_status" className="form-label">
                  Professional Status
                </label>
                <input
                  {...register('professional_status')}
                  type="text"
                  className="form-input"
                  placeholder="e.g., Active, Retired"
                />
              </div>

              <div>
                <label className="form-label">
                  Qualifications
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    className="form-input"
                    placeholder="Add qualification"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addQualification())}
                  />
                  <button
                    type="button"
                    onClick={addQualification}
                    className="px-3 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                  >
                    <PlusIcon className="h-5 w-5" />
                  </button>
                </div>
                {qualifications.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {qualifications.map((qual, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {qual}
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:bg-primary-200 hover:text-primary-500"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="contact_number" className="form-label">
                  Contact Number
                </label>
                <input
                  {...register('contact_number')}
                  type="tel"
                  className="form-input"
                  placeholder="Enter contact number"
                />
              </div>

              <div>
                <label htmlFor="mobile_number" className="form-label">
                  Mobile Number
                </label>
                <input
                  {...register('mobile_number')}
                  type="tel"
                  className="form-input"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label htmlFor="address_city" className="form-label">
                  City
                </label>
                <input
                  {...register('address_city')}
                  type="text"
                  className="form-input"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label htmlFor="address_district" className="form-label">
                  District
                </label>
                <input
                  {...register('address_district')}
                  type="text"
                  className="form-input"
                  placeholder="Enter district"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              By creating an account, you agree to follow IVSL professional standards
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;