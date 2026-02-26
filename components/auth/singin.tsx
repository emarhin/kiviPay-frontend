import React, { useState, useEffect } from "react";
import TextInput from "../inputs/textinput";
import ThunderAnimation from "../animation/thundar";

interface LoginProps {
  onLogin: (email: string, password: string) => void;
  onGoogleLogin: () => void;
  logoSrc?: string;
  isLoading?: boolean;
  error?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Login: React.FC<LoginProps> = ({
  onLogin,
  onGoogleLogin,
  logoSrc,
  isLoading = false,
  error: propError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate form on change
  useEffect(() => {
    const newErrors: FormErrors = {};

    if (touched.email) {
      if (!email.trim()) {
        newErrors.email = "Required";
      } else if (!isValidEmail(email)) {
        newErrors.email = "Invalid email";
      }
    }

    if (touched.password && !password.trim()) {
      newErrors.password = "Required";
    }

    setErrors(newErrors);
  }, [email, password, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    setTouched({
      email: true,
      password: true,
    });

    // Check if form is valid
    const hasErrors = Object.keys(errors).length > 0;
    const isEmptyField = !email.trim() || !password.trim();

    if (hasErrors || isEmptyField) {
      return;
    }

    onLogin(email, password);
  };

  const isFormValid = () => {
    return email.trim() && isValidEmail(email) && password.trim();
  };

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      {/* Logo */}
      {logoSrc && (
        <div className="mb-4 text-center ">
          {/* <img src={logoSrc} alt="Logo" className="h-[90px] w-auto mx-auto" /> */}
          <div className="mt-2 flex justify-center">
            <ThunderAnimation size={90} animated={false} speed={1} />
          </div>
        </div>
      )}

      {/* Welcome */}
      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-900">
          Welcome to Thundarpay
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Sign in to access your dashboard and manage payments
        </p>
      </div>

      {/* Prop Error Display */}
      {propError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-red-600 text-sm">{propError}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <TextInput
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password <span className="text-red-500">*</span>
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
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              disabled={isLoading}
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
          )}
          <div className="mt-1 text-right">
            <a
              href="/forgot-password"
              className="text-xs text-black hover:text-[#FDC700]"
            >
              Forgot Password?
            </a>
          </div>
        </div>

        <div className="pt-1">
          <button
            type="submit"
            disabled={!isFormValid() || isLoading}
            className="w-full bg-[#FDC700] hover:bg-[#FDC700]/80 disabled:bg-[#FDC700]/25 disabled:cursor-not-allowed text-[#733E0B] py-2 rounded font-medium transition-colors duration-200 text-sm"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="my-4 flex items-center">
        <div className="flex-1 border-t border-gray-300"></div>
        <div className="px-2 text-gray-500 text-xs">OR</div>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Social Buttons */}
      <div>
        <button
          onClick={onGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed py-2 rounded text-sm font-medium transition-colors duration-200"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-4 h-4"
            aria-hidden="true"
          />
          <span>Continue with Google</span>
        </button>
      </div>

      {/* Sign Up */}
      <div className="mt-4 text-center pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          Don't have an Account?{" "}
          <a
            href="/signup"
            className="text-black hover:text-[#FDC700] font-medium"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
