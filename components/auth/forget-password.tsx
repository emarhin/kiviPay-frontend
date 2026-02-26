import React, { useState, useEffect } from "react";
import TextInput from "../inputs/textinput";
import ThunderAnimation from "../animation/thundar";

interface ForgotPasswordProps {
  onSendResetEmail: (email: string) => void;
  onBackToLogin: () => void;
  logoSrc?: string;
  isLoading?: boolean;
  error?: string;
  successMessage?: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSendResetEmail,
  onBackToLogin,
  logoSrc,
  isLoading = false,
  error: propError,
  successMessage,
}) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>("");
  const [touched, setTouched] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    setError("");
    return true;
  };

  useEffect(() => {
    if (touched) {
      validateForm();
    }
  }, [email, touched]);

  const handleBlur = () => {
    setTouched(true);
    validateForm();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);

    if (validateForm()) {
      onSendResetEmail(email);
      setSubmitted(true);
      //redirect
      window.location.href = "/reset-password";
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      {/* Logo */}
      {logoSrc && (
        <div className="mb-4 text-center">
          {/* <img src={logoSrc} alt="Logo" className="h-8 w-auto mx-auto" /> */}
          <div className="mt-2 flex justify-center">
            <ThunderAnimation size={90} animated={false} speed={1} />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-900">Reset Your Password</h1>
        <p className="text-gray-600 text-sm mt-1">
          Enter your email address and we'll send you instructions to reset your
          password
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
              <p className="mt-1 text-xs text-green-600">
                If you don't see the email, check your spam folder.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {propError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 text-sm">{propError}</p>
        </div>
      )}

      {/* Form (only show if not submitted or no success message) */}
      {!successMessage && (
        <>
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 mb-1"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <TextInput
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                // onBlur={handleBlur}
                error={error}
                required
                // disabled={isLoading || submitted}
                // size="sm"
              />
              {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>

            <div className="pt-1">
              <button
                type="submit"
                disabled={!!error || !email.trim() || isLoading || submitted}
                className="w-full bg-[#FDC700] hover:bg-[#FDC700]/80 disabled:bg-[#FDC700]/25 disabled:cursor-not-allowed text-[#733E0B] py-2 rounded font-medium transition-colors duration-200 text-sm"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-1">
                    <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending Reset Link...
                  </span>
                ) : submitted ? (
                  "Reset Link Sent"
                ) : (
                  "Send Reset Instructions"
                )}
              </button>
            </div>
          </form>

          {/* Back to Login */}
          <div className="mt-4 text-center">
            <button
              onClick={onBackToLogin}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              disabled={isLoading}
            >
              ← Back to Sign In
            </button>
          </div>
        </>
      )}

      {/* Instructions after successful submission */}
      {successMessage && (
        <div className="mt-6 space-y-4">
          <div className="bg-gray-50 p-4 rounded border border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              What to do next:
            </h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">1.</span>
                Check your email for the reset link
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">2.</span>
                Click the link in the email (expires in 1 hour)
              </li>
              <li className="flex items-start">
                <span className="text-gray-500 mr-2">3.</span>
                Create a new password for your account
              </li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={onBackToLogin}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Sign In
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Didn't receive the email?{" "}
              <button
                onClick={() => setSubmitted(false)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Try again
              </button>
            </p>
          </div>
        </div>
      )}

      {/* Support Information */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Need help?{" "}
          <a
            href="mailto:support@thundarpay.com"
            className="text-blue-600 hover:text-blue-800"
          >
            Contact Support
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
