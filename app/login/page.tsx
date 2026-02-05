"use client";
import AuthBase from "@/components/auth/base";
import Login from "@/components/auth/singin";
import React from "react";

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false);
  return (
    <AuthBase
      sideImageSrc=""
      AuthComponent={() => (
        <Login
          onLogin={async () => {
            setLoading(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));

            window.location.href = "/onboard";
          }}
          onGoogleLogin={() => {
            window.location.href = "/onboard";
          }}
          logoSrc="/thundar-logo.png"
          isLoading={loading}
        />
      )}
    />
  );
}
