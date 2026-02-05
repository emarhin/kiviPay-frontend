import React from "react";

interface BaseProps {
  sideImageSrc?: string;
  AuthComponent: React.FC<any>;
  authComponentProps?: any;
}

const BaseAuth: React.FC<BaseProps> = ({
  sideImageSrc,
  AuthComponent,
  authComponentProps,
}) => {
  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Side - Big Image */}
      <div className="hidden lg:flex lg:w-1/2 bg-gray-900 relative">
        {sideImageSrc ? (
          <>
            <img
              src={sideImageSrc}
              alt="Side illustration"
              className="object-cover w-full h-full"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gray-900/50"></div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-800"></div>
        )}

        {/* Overlay with centered text */}
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-white text-center max-w-xl">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4 lg:mb-6">
              Make collection of payment easier for business
            </h1>
            <p className="text-gray-200 text-base lg:text-lg">
              Thundarpay makes it easy for businesses to accept payments from
              their customers with lightning-fast transactions.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-md px-4 sm:px-6 py-8">
          <AuthComponent {...authComponentProps} />
        </div>
      </div>
    </div>
  );
};

export default BaseAuth;
