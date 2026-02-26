import React, { useState, useEffect } from "react";
import TextInput from "../inputs/textinput";
import ThunderAnimation from "../animation/thundar";

interface ResetPasswordProps {
  onResetPassword: (newPassword: string, confirmPassword: string) => void;
  onBackToLogin: () => void;
  logoSrc?: string;
  isLoading?: boolean;
  error?: string;
  token?: string;
  email?: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  onResetPassword,
  onBackToLogin,
  logoSrc,
  isLoading = false,
  error: propError,
  email,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validate password strength
  const validatePassword = (password: string) => {
    if (password.length < 8) return "At least 8 characters";
    if (!/(?=.*[a-z])/.test(password)) return "Include lowercase letter";
    if (!/(?=.*[A-Z])/.test(password)) return "Include uppercase letter";
    if (!/(?=.*\d)/.test(password)) return "Include a number";
    return "";
  };

  // Validate form on change
  useEffect(() => {
    const newErrors: { newPassword?: string; confirmPassword?: string } = {};

    if (touched.newPassword && newPassword) {
      const passwordError = validatePassword(newPassword);
      if (passwordError) newErrors.newPassword = passwordError;
    }

    if (touched.confirmPassword && confirmPassword) {
      if (newPassword !== confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
  }, [newPassword, confirmPassword, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTouched({
      newPassword: true,
      confirmPassword: true,
    });

    // Validate
    const passwordError = validatePassword(newPassword);
    const hasErrors = passwordError || newPassword !== confirmPassword;

    if (hasErrors) {
      setErrors({
        newPassword: passwordError,
        confirmPassword:
          newPassword !== confirmPassword ? "Passwords don't match" : undefined,
      });
      return;
    }

    onResetPassword(newPassword, confirmPassword);
  };

  const getPasswordStrength = () => {
    if (!newPassword) return { score: 0, label: "", color: "bg-gray-200" };

    let score = 0;
    if (newPassword.length >= 8) score++;
    if (/[a-z]/.test(newPassword)) score++;
    if (/[A-Z]/.test(newPassword)) score++;
    if (/\d/.test(newPassword)) score++;
    if (/[^A-Za-z0-9]/.test(newPassword)) score++;

    const strength = [
      { label: "Very Weak", color: "bg-red-500" },
      { label: "Weak", color: "bg-red-400" },
      { label: "Fair", color: "bg-yellow-500" },
      { label: "Good", color: "bg-green-400" },
      { label: "Strong", color: "bg-green-600" },
    ][score];

    return { score, ...strength };
  };

  const passwordStrength = getPasswordStrength();

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
        <h1 className="text-lg font-bold text-gray-900">Create New Password</h1>
        {email && (
          <p className="text-sm text-gray-600 mt-1">
            Resetting password for <span className="font-medium">{email}</span>
          </p>
        )}
        <p className="text-gray-600 text-xs mt-2">
          Your new password must be different from previous passwords
        </p>
      </div>

      {/* Error Message */}
      {propError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 text-sm">{propError}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="newPassword"
              className="block text-sm text-gray-700"
            >
              New Password <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <TextInput
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Create a new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors.newPassword}
              required
              disabled={isLoading}
            />
          </div>
          {newPassword && (
            <div className="mt-1">
              <div className="flex gap-0.5 mb-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-0.5 flex-1 rounded-full ${
                      i <= passwordStrength.score
                        ? passwordStrength.color
                        : "bg-gray-200"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {passwordStrength.label} • 8+ chars, upper & lower case, number
              </p>
            </div>
          )}
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-600">{errors.newPassword}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="confirmPassword"
              className="block text-sm text-gray-700"
            >
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              className="text-xs text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div className="relative">
            <TextInput
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.confirmPassword}
              required
              disabled={isLoading}
            />
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-600">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={
              !newPassword ||
              !confirmPassword ||
              !!errors.newPassword ||
              !!errors.confirmPassword ||
              isLoading
            }
            className="w-full bg-[#FDC700] hover:bg-[#FDC700]/80 disabled:bg-[#FDC700]/25 disabled:cursor-not-allowed text-[#733E0B] py-2 rounded font-medium transition-colors duration-200 text-sm"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Resetting Password...
              </span>
            ) : (
              "Reset Password"
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

      {/* Security Note */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <div className="flex">
          <svg
            className="h-4 w-4 text-blue-400 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <div className="ml-2">
            <p className="text-xs text-blue-700">
              For security, this link expires in 1 hour. Create a strong, unique
              password.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
