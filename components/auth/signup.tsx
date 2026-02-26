import React, { useState, useEffect } from "react";
import TextInput from "../inputs/textinput";
import ThunderAnimation from "../animation/thundar";

interface SignUpProps {
  onSignUp: (
    companyName: string,
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
  ) => void;
  onGoogleLogin: () => void;
  logoSrc?: string;
  isLoading?: boolean;
  error?: string;
}

interface FormErrors {
  companyName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp: React.FC<SignUpProps> = ({
  onSignUp,
  onGoogleLogin,
  logoSrc,
  isLoading = false,
  error: propError,
}) => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validate email format
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate phone number (basic international format)
  const isValidPhone = (phone: string) => {
    return /^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\D/g, ""));
  };

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
    const newErrors: FormErrors = {};

    if (touched.companyName && !companyName.trim()) {
      newErrors.companyName = "Required";
    }

    if (touched.email) {
      if (!email.trim()) {
        newErrors.email = "Required";
      } else if (!isValidEmail(email)) {
        newErrors.email = "Invalid email";
      }
    }

    if (touched.phoneNumber && phoneNumber && !isValidPhone(phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone";
    }

    if (touched.password && password) {
      const passwordError = validatePassword(password);
      if (passwordError) newErrors.password = passwordError;
    }

    if (touched.confirmPassword && confirmPassword) {
      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);
  }, [companyName, email, phoneNumber, password, confirmPassword, touched]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    setTouched({
      companyName: true,
      email: true,
      phoneNumber: true,
      password: true,
      confirmPassword: true,
    });

    // Check if form is valid
    const hasErrors = Object.keys(errors).length > 0;
    const isEmptyField =
      !companyName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim();

    if (hasErrors || isEmptyField) {
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords don't match",
      }));
      return;
    }

    onSignUp(companyName, email, phoneNumber, password, confirmPassword);
  };

  const isFormValid = () => {
    return (
      companyName.trim() &&
      email.trim() &&
      isValidEmail(email) &&
      password &&
      validatePassword(password) === "" &&
      confirmPassword &&
      password === confirmPassword
    );
  };

  const getPasswordStrength = () => {
    if (!password) return { score: 0, label: "", color: "bg-gray-200" };

    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

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
          {/* <img src={logoSrc} alt="Logo" className="h-[90px] w-auto mx-auto" /> */}
          <div className="mt-2 flex justify-center">
            <ThunderAnimation size={90} animated={false} speed={1} />
          </div>
        </div>
      )}

      {/* Welcome */}
      <div className="mb-4">
        <h1 className="text-lg font-bold text-gray-900">
          Create Account with Thundarpay
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Start accepting lightning-fast payments
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
          <label
            htmlFor="companyName"
            className="block text-sm text-gray-700 mb-1"
          >
            Company Name <span className="text-red-500">*</span>
          </label>
          <TextInput
            id="companyName"
            type="text"
            placeholder="Your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            error={errors.companyName}
            required
            disabled={isLoading}
          />
          {errors.companyName && (
            <p className="mt-1 text-xs text-red-600">{errors.companyName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
            Business Email <span className="text-red-500">*</span>
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
          <label
            htmlFor="phoneNumber"
            className="block text-sm text-gray-700 mb-1"
          >
            Phone Number{" "}
            <span className="text-gray-500 text-xs">(Optional)</span>
          </label>
          <TextInput
            id="phoneNumber"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            error={errors.phoneNumber}
            disabled={isLoading}
          />
          {errors.phoneNumber && (
            <p className="mt-1 text-xs text-red-600">{errors.phoneNumber}</p>
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
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              required
              disabled={isLoading}
            />
          </div>
          {password && (
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
          {errors.password && (
            <p className="mt-1 text-xs text-red-600">{errors.password}</p>
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
              placeholder="Confirm your password"
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
            disabled={!isFormValid() || isLoading}
            className="w-full bg-[#FDC700] hover:bg-[#FDC700]/80 disabled:bg-[#FDC700]/25 disabled:cursor-not-allowed text-[#733E0B] py-2 rounded font-medium transition-colors duration-200 text-sm"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-1">
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Creating Account...
              </span>
            ) : (
              "Create Account"
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

      {/* Terms and Privacy */}
      <div className="mt-3 text-center">
        <p className="text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <a
            href="/terms"
            className="text-black hover:text-[#FDC700] underline"
          >
            Terms
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-black hover:text-[#FDC700] underline"
          >
            Privacy
          </a>
        </p>
      </div>

      {/* Already have account */}
      <div className="mt-4 text-center pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-600">
          Already have an Account?{" "}
          <a
            href="/login"
            className="text-black hover:text-[#FDC700] font-medium"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
