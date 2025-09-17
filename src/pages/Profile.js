import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { PlusIcon, XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import api from '../utils/api';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [qualifications, setQualifications] = useState(user?.qualifications || []);
  const [newQualification, setNewQualification] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      honorable: user?.honorable || '',
      full_name: user?.full_name || '',
      professional_title: user?.professional_title || '',
      ivsl_registration: user?.ivsl_registration || '',
      professional_status: user?.professional_status || '',
      ivsl_membership: user?.ivsl_membership || '',
      contact_number: user?.contact_number || '',
      mobile_number: user?.mobile_number || '',
      address_house: user?.address_house || '',
      address_street: user?.address_street || '',
      address_area: user?.address_area || '',
      address_city: user?.address_city || '',
      address_district: user?.address_district || '',
      alternative_contact: user?.alternative_contact || ''
    }
  });

  const addQualification = async () => {
    if (!newQualification.trim()) return;

    try {
      const response = await api.post('/users/qualifications', {
        qualification: newQualification.trim()
      });
      setQualifications(response.data.qualifications);
      setNewQualification('');
      toast.success('Qualification added successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add qualification');
    }
  };

  const removeQualification = async (index) => {
    try {
      const response = await api.delete(`/users/qualifications/${index}`);
      setQualifications(response.data.qualifications);
      toast.success('Qualification removed successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to remove qualification');
    }
  };

  const onSubmit = async (data) => {
    setSaving(true);
    try {
      await updateProfile(data);
      toast.success('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    reset({
      honorable: user?.honorable || '',
      full_name: user?.full_name || '',
      professional_title: user?.professional_title || '',
      ivsl_registration: user?.ivsl_registration || '',
      professional_status: user?.professional_status || '',
      ivsl_membership: user?.ivsl_membership || '',
      contact_number: user?.contact_number || '',
      mobile_number: user?.mobile_number || '',
      address_house: user?.address_house || '',
      address_street: user?.address_street || '',
      address_area: user?.address_area || '',
      address_city: user?.address_city || '',
      address_district: user?.address_district || '',
      alternative_contact: user?.alternative_contact || ''
    });
    setQualifications(user?.qualifications || []);
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset();
    setQualifications(user?.qualifications || []);
  };

  const getProfileCompletenessColor = (percentage) => {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const completeness = user?.profile_completeness || 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
              <p className="text-gray-600">Manage your professional information and credentials</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${getProfileCompletenessColor(completeness)}`}
                      style={{ width: `${completeness}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900">{completeness}%</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Profile completeness</p>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors duration-200"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Email Verification Status */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {user?.is_verified ? (
              <>
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-700">Email Verified</span>
              </>
            ) : (
              <>
                <XMarkIcon className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-red-700">Email Not Verified</span>
              </>
            )}
            <span className="text-sm text-gray-500">({user?.email})</span>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Basic Information</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Title</label>
                {isEditing ? (
                  <select {...register('honorable')} className="form-input">
                    <option value="">Select title</option>
                    <option value="Dr">Dr</option>
                    <option value="Mr">Mr</option>
                    <option value="Ms">Ms</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Vlr">Vlr</option>
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.honorable || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">Full Name</label>
                {isEditing ? (
                  <>
                    <input
                      {...register('full_name', {
                        required: 'Full name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                      })}
                      type="text"
                      className="form-input"
                    />
                    {errors.full_name && (
                      <p className="mt-1 text-sm text-red-600">{errors.full_name.message}</p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.full_name}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Professional Information */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Professional Information</h2>
          </div>
          <div className="px-6 py-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Professional Title</label>
                {isEditing ? (
                  <input
                    {...register('professional_title')}
                    type="text"
                    className="form-input"
                    placeholder="e.g., Chartered Valuation Surveyor"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.professional_title || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">IVSL Registration Number</label>
                {isEditing ? (
                  <input
                    {...register('ivsl_registration')}
                    type="text"
                    className="form-input"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.ivsl_registration || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">IVSL Membership</label>
                {isEditing ? (
                  <select {...register('ivsl_membership')} className="form-input">
                    <option value="">Select membership level</option>
                    <option value="Fellow">Fellow</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Associate">Associate</option>
                  </select>
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.ivsl_membership || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">Professional Status</label>
                {isEditing ? (
                  <input
                    {...register('professional_status')}
                    type="text"
                    className="form-input"
                    placeholder="e.g., Active, Retired"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.professional_status || 'Not specified'}</p>
                )}
              </div>
            </div>

            {/* Qualifications */}
            <div>
              <label className="form-label">Qualifications</label>
              {isEditing && (
                <div className="mb-3 flex space-x-2">
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
              )}
              {qualifications.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {qualifications.map((qual, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                    >
                      {qual}
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => removeQualification(index)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-primary-400 hover:bg-primary-200 hover:text-primary-500"
                        >
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mt-1 text-sm text-gray-500">No qualifications added</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
          </div>
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="form-label">Contact Number</label>
                {isEditing ? (
                  <input
                    {...register('contact_number')}
                    type="tel"
                    className="form-input"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.contact_number || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">Mobile Number</label>
                {isEditing ? (
                  <input
                    {...register('mobile_number')}
                    type="tel"
                    className="form-input"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.mobile_number || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">House Number</label>
                {isEditing ? (
                  <input
                    {...register('address_house')}
                    type="text"
                    className="form-input"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.address_house || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">Street</label>
                {isEditing ? (
                  <input
                    {...register('address_street')}
                    type="text"
                    className="form-input"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.address_street || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">Area</label>
                {isEditing ? (
                  <input
                    {...register('address_area')}
                    type="text"
                    className="form-input"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.address_area || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">City</label>
                {isEditing ? (
                  <input
                    {...register('address_city')}
                    type="text"
                    className="form-input"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.address_city || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">District</label>
                {isEditing ? (
                  <input
                    {...register('address_district')}
                    type="text"
                    className="form-input"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.address_district || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="form-label">Alternative Contact</label>
                {isEditing ? (
                  <input
                    {...register('alternative_contact')}
                    type="text"
                    className="form-input"
                    placeholder="Emergency contact or alternative number"
                  />
                ) : (
                  <p className="mt-1 text-sm text-gray-900">{user?.alternative_contact || 'Not specified'}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        {isEditing && (
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 transition-colors duration-200"
            >
              {saving ? (
                <div className="flex items-center">
                  <div className="spinner mr-2"></div>
                  Saving...
                </div>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Profile;