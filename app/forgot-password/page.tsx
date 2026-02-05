"use client";
import ForgotPassword from "@/components/auth/forget-password";
import BaseAuth from "@/components/auth/base";

const ForgotPasswordPage = () => {
  const handleSendResetEmail = async (email: string) => {
    // API call to send reset email
    console.log("Sending reset email to:", email);
  };

  const handleBackToLogin = () => {
    // Navigate back to login
    window.location.href = "/login";
  };

  return (
    <BaseAuth
      sideImageSrc=""
      AuthComponent={ForgotPassword}
      authComponentProps={{
        onSendResetEmail: handleSendResetEmail,
        onBackToLogin: handleBackToLogin,
        logoSrc: "/thundar-logo.png",
      }}
    />
  );
};

export default ForgotPasswordPage;
