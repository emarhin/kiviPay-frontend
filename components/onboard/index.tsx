import React, { useState, useRef } from "react";
import TextInput from "../inputs/textinput";
import ThunderAnimation, { ThunderIcon } from "../animation/thundar";

interface CompanyOnboardingProps {
  onSubmit: (
    logo: File | null,
    documents: File[],
    description: string,
    numberOfEmployees: string,
    companyName: string,
    industry: string,
  ) => void;
  onBack?: () => void;
  isLoading?: boolean;
  error?: string;
  companyName?: string;
  email?: string;
}

const CompanyOnboarding: React.FC<CompanyOnboardingProps> = ({
  onSubmit,
  onBack,
  isLoading = false,
  error: propError,
  companyName: initialCompanyName,
  email: initialEmail,
}) => {
  // Step state
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    {
      id: 1,
      title: "Company Details",
      description: "Basic information about your business",
    },
    {
      id: 2,
      title: "Business Profile",
      description: "Tell us about your company",
    },
    {
      id: 3,
      title: "Upload Files",
      description: "Logo and documents (optional)",
    },
  ];

  // Form state
  const [companyName, setCompanyName] = useState(initialCompanyName || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [description, setDescription] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [industry, setIndustry] = useState("");

  // File states
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [documents, setDocuments] = useState<File[]>([]);

  // Refs
  const logoInputRef = useRef<HTMLInputElement>(null);
  const documentInputRef = useRef<HTMLInputElement>(null);

  // Handle logo upload
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setDocuments((prev) => [...prev, ...files]);
  };

  // Remove document
  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove logo
  const removeLogo = () => {
    setLogo(null);
    setLogoPreview("");
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (onBack) {
      onBack();
    }
  };

  // Handle form submit
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onSubmit(
      logo,
      documents,
      description,
      numberOfEmployees,
      companyName,
      industry,
    );
  };

  // Employee options
  const employeeOptions = [
    "1-10",
    "11-50",
    "51-200",
    "201-500",
    "501-1000",
    "1000+",
  ];

  // Industry options
  const industries = [
    "Technology",
    "Finance",
    "Healthcare",
    "Retail",
    "Manufacturing",
    "Education",
    "Real Estate",
    "Hospitality",
    "Other",
  ];

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Calculate progress percentage
  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="w-full max-w-md mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col items-center text-center gap-3 mb-6">
          <ThunderAnimation size={90} animated={false} speed={1} />

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Complete Company Setup
            </h1>

            <p className="text-gray-600 text-sm mt-1">
              Step {currentStep + 1} of {steps.length}
            </p>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#FDC700] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Error Display */}
      {propError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{propError}</p>
        </div>
      )}

      {/* Step Content */}
      <div className="mb-8">
        {/* Step 1: Company Details */}
        {currentStep === 0 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Company Details
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Basic information about your business
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Company Name
                </label>
                <TextInput
                  type="text"
                  placeholder="Acme Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Business Email
                </label>
                <TextInput
                  type="email"
                  placeholder="contact@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                >
                  <option value="">Select Industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>
                      {ind}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Business Profile */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Business Profile
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Tell us about your company
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Company Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What does your company do?"
                  rows={4}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Briefly describe your products, services, or mission
                </p>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Team Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {employeeOptions.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setNumberOfEmployees(size)}
                      className={`py-2 text-xs rounded-md border ${
                        numberOfEmployees === size
                          ? "bg-[#FDC700] text-white border-gray-900"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <TextInput
                    type="text"
                    placeholder="Or enter exact number"
                    value={numberOfEmployees}
                    onChange={(e) => setNumberOfEmployees(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Upload Files */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Upload Files
              </h2>
              <p className="text-gray-600 text-sm mb-4">
                Add your logo and documents (optional)
              </p>
            </div>

            <div className="space-y-6">
              {/* Logo Upload */}
              <div>
                <label className="block text-sm text-gray-700 mb-2">
                  Company Logo
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  {logoPreview ? (
                    <div className="space-y-3">
                      <div className="relative inline-block">
                        <img
                          src={logoPreview}
                          alt="Logo preview"
                          className="w-20 h-20 object-contain rounded-lg border border-gray-200"
                        />
                        <button
                          type="button"
                          onClick={removeLogo}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600 text-xs"
                        >
                          ×
                        </button>
                      </div>
                      <p className="text-sm text-gray-600">{logo?.name}</p>
                    </div>
                  ) : (
                    <div
                      onClick={() => logoInputRef.current?.click()}
                      className="cursor-pointer"
                    >
                      <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                        <svg
                          className="w-6 h-6 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm mb-1">Upload Logo</p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, SVG (max 5MB)
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Documents Upload */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm text-gray-700">
                    Company Documents (Optional)
                  </label>
                  <input
                    type="file"
                    ref={documentInputRef}
                    onChange={handleDocumentUpload}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    multiple
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => documentInputRef.current?.click()}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Add Files
                  </button>
                </div>

                {documents.length > 0 && (
                  <div className="space-y-2 mt-3">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="text-gray-600">
                            {doc.type.includes("pdf") ? "📄" : "📎"}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                              {doc.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(doc.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDocument(index)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        {/* Only show Back button when NOT on the first step */}
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            disabled={isLoading}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Back
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={isLoading}
          className="w-full bg-[#FDC700] hover:bg-[#FDC700]/80 disabled:bg-[#FDC700]/25 disabled:cursor-not-allowed text-[#733E0B] py-2 rounded font-medium transition-colors duration-200 text-sm"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </span>
          ) : currentStep === steps.length - 1 ? (
            "Complete Setup"
          ) : (
            "Next"
          )}
        </button>
      </div>

      {/* Step Description */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          {currentStep === 0 && "Enter your company's basic information"}
          {currentStep === 1 && "Tell us about your business and team"}
          {currentStep === 2 && "Upload your logo and documents (optional)"}
        </p>
      </div>
    </div>
  );
};

// Export only the linear stepper version
export default CompanyOnboarding;
