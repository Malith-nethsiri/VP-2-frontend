import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const { verifyEmail, resendVerification, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [message, setMessage] = useState('');
  const [isResending, setIsResending] = useState(false);

  const token = searchParams.get('token');

  useEffect(() => {
    const handleVerification = async () => {
      try {
        const result = await verifyEmail(token);
        if (result.success) {
          setStatus('success');
          setMessage(result.message);
          toast.success('Email verified successfully!');

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            navigate('/dashboard');
          }, 3000);
        }
      } catch (error) {
        setStatus('error');
        setMessage(error.message);
        toast.error(error.message);
      }
    };

    if (token) {
      handleVerification();
    } else {
      setStatus('error');
      setMessage('No verification token provided');
    }
  }, [token, verifyEmail, navigate]);

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      const result = await resendVerification();
      if (result.success) {
        toast.success('Verification email sent!');
        setMessage('A new verification email has been sent to your email address.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <span className="text-primary-600 font-bold text-xl">VP</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          {status === 'verifying' && (
            <div className="text-center">
              <ArrowPathIcon className="mx-auto h-12 w-12 text-primary-500 animate-spin" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Verifying your email...
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Please wait while we verify your email address.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <CheckCircleIcon className="mx-auto h-12 w-12 text-green-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Email verified successfully!
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {message}
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Redirecting to dashboard in a few seconds...
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-4 w-full btn-primary"
              >
                Go to Dashboard
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="text-center">
              <XCircleIcon className="mx-auto h-12 w-12 text-red-500" />
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                Verification failed
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {message}
              </p>

              {user && !user.is_verified && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleResendVerification}
                    disabled={isResending}
                    className="w-full btn-primary"
                  >
                    {isResending ? (
                      <div className="flex items-center justify-center">
                        <div className="spinner mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      'Resend verification email'
                    )}
                  </button>

                  <button
                    onClick={() => navigate('/dashboard')}
                    className="w-full btn-secondary"
                  >
                    Continue to dashboard
                  </button>
                </div>
              )}

              {!user && (
                <div className="mt-6">
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full btn-primary"
                  >
                    Go to Login
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Having trouble? Contact support for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;