import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../utils/api';
import {
  UserIcon,
  DocumentTextIcon,
  DocumentDuplicateIcon,
  MapPinIcon,
  CheckCircleIcon,
  PlusIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user, resendVerification } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resendingVerification, setResendingVerification] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await api.get('/users/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setResendingVerification(true);
    try {
      await resendVerification();
      toast.success('Verification email sent!');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setResendingVerification(false);
    }
  };

  const getProfileCompletenessColor = (percentage) => {
    if (percentage >= 80) return 'text-green-600 bg-green-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusBadge = (status) => {
    const badges = {
      completed: 'badge badge-success',
      draft: 'badge badge-warning',
      pending: 'badge badge-warning',
      processing: 'badge badge-info',
      failed: 'badge badge-error'
    };
    return badges[status] || 'badge badge-info';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome back, {user?.full_name}
              </h1>
              <p className="text-gray-600">
                {user?.professional_title || 'Professional Valuer'}
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getProfileCompletenessColor(user?.profile_completeness || 0)}`}>
                Profile {user?.profile_completeness || 0}% complete
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Verification Notice */}
      {user && !user.is_verified && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5 mr-3" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800">
                Email verification required
              </h3>
              <p className="text-sm text-yellow-700 mt-1">
                Please verify your email address to access all features. Check your inbox for the verification email.
              </p>
              <div className="mt-3">
                <button
                  onClick={handleResendVerification}
                  disabled={resendingVerification}
                  className="text-sm font-medium text-yellow-800 hover:text-yellow-900 underline"
                >
                  {resendingVerification ? 'Sending...' : 'Resend verification email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link
          to="/profile"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center">
            <UserIcon className="h-8 w-8 text-primary-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Profile</h3>
              <p className="text-sm text-gray-600">Manage your details</p>
            </div>
          </div>
        </Link>

        <Link
          to="/documents"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center">
            <DocumentDuplicateIcon className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Documents</h3>
              <p className="text-sm text-gray-600">Upload & process</p>
            </div>
          </div>
        </Link>

        <Link
          to="/reports"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center">
            <DocumentTextIcon className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Reports</h3>
              <p className="text-sm text-gray-600">Generate reports</p>
            </div>
          </div>
        </Link>

        <Link
          to="/location"
          className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center">
            <MapPinIcon className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Location</h3>
              <p className="text-sm text-gray-600">Maps & amenities</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Statistics */}
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {dashboardData.statistics.reports.total}
                </h3>
                <p className="text-sm text-gray-600">Total Reports</p>
                <div className="mt-2 text-xs text-gray-500">
                  {dashboardData.statistics.reports.completed} completed, {dashboardData.statistics.reports.draft} drafts
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <DocumentDuplicateIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {dashboardData.statistics.documents.total}
                </h3>
                <p className="text-sm text-gray-600">Total Documents</p>
                <div className="mt-2 text-xs text-gray-500">
                  {dashboardData.statistics.documents.processed} processed, {dashboardData.statistics.documents.pending} pending
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircleIcon className="h-8 w-8 text-primary-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {user?.profile_completeness || 0}%
                </h3>
                <p className="text-sm text-gray-600">Profile Complete</p>
                <div className="mt-2">
                  <Link
                    to="/profile"
                    className="text-xs text-primary-600 hover:text-primary-500"
                  >
                    Complete your profile →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Reports */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
            <Link
              to="/reports"
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 transition-colors duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-1" />
              New Report
            </Link>
          </div>
        </div>
        <div className="px-6 py-4">
          {dashboardData && dashboardData.recent_reports.length > 0 ? (
            <div className="space-y-4">
              {dashboardData.recent_reports.map((report) => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {report.reference_number || `Report #${report.id}`}
                      </h3>
                      <span className={getStatusBadge(report.status)}>
                        {report.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {report.property_type} - {report.client_name}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {report.property_address}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">
                      Created {new Date(report.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reports yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first valuation report.
              </p>
              <div className="mt-6">
                <Link
                  to="/reports"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Report
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;