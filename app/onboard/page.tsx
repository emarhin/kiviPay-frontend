"use client";

import LinearStepperOnboarding from "@/components/onboard";
import BaseAuth from "@/components/auth/base";
import ResetPassword from "@/components/auth/reset-password";

const onboard = () => {
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

  function handleSubmit(
    logo: File | null,
    documents: File[],
    description: string,
    numberOfEmployees: string,
    companyName: string,
    industry: string,
  ): void {
    throw new Error("Function not implemented.");
  }

  function handleBack(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <BaseAuth
      sideImageSrc="/images/auth-side.jpg"
      AuthComponent={() => (
        <LinearStepperOnboarding
          onSubmit={handleSubmit}
          onBack={handleBack}
          companyName="Acme Inc."
          email="contact@acme.com"
          isLoading={false}
        />
      )}
    />
  );
};
export default onboard;
