"use client";

import BaseAuth from "@/components/auth/base";
import ResetPassword from "@/components/auth/reset-password";

const ResetPasswordPage = () => {
  const handleResetPassword = async (
    newPassword: string,
    confirmPassword: string,
  ) => {
    // API call to reset password
    console.log("Resetting password...");
  };

  const handleBackToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <BaseAuth
      sideImageSrc="/images/auth-side.jpg"
      AuthComponent={ResetPassword}
      authComponentProps={{
        onResetPassword: handleResetPassword,
        onBackToLogin: handleBackToLogin,
        logoSrc: "/thundar-logo.png",
        email: "user@example.com", // Get from URL params or state
      }}
    />
  );
};
export default ResetPasswordPage;
