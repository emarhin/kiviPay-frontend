"use client";
import SignUp from "@/components/auth/signup";
import AuthBase from "@/components/auth/base";
import React from "react";
export default function handleSignUp() {
  const [loading, setLoading] = React.useState(false);

  const handleSignUp = async (
    companyName: string,
    email: string,
    phoneNumber: string,
    companyAddress: string,
    password: string,
    confirmPassword: string,
  ) => {
    console.log("Sign Up Data:", {
      companyName,
      email,
      phoneNumber,
      companyAddress,
      password,
      confirmPassword,
    });

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setLoading(false);
    window.location.href = "/login";
  };

  // Handle Google sign-up/login
  const handleGoogleLogin = () => {
    // Implement Google OAuth logic here
    console.log("Google login clicked");
  };

  return (
    <AuthBase
      sideImageSrc=""
      AuthComponent={() => (
        <SignUp
          onSignUp={() => handleSignUp}
          onGoogleLogin={handleGoogleLogin}
          logoSrc="/thundar-logo.png" // Optional: path to your logo
          isLoading={loading}
        />
      )}
    />
  );
}
