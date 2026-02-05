import React from "react";

interface TextInputProps {
  id?: string;
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  prefix?: React.ReactNode; // e.g., "$"
  suffix?: React.ReactNode; // e.g., select or icon
  className?: string;
  required?: boolean;
  error?: string;
  type?: string;
  disabled?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder = "",
  prefix,
  suffix,
  className = "",
  required = false,
  error,
  type = "text",
  disabled = false,
}) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm/6 font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <div
          className={`
            flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300
            has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-900
            ${error ? "outline-red-500 has-[input:focus-within]:outline-red-600" : ""}
            ${className}
          `}
        >
          {prefix && (
            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
              {prefix}
            </div>
          )}
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className="block  w-full h-12 min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
          />
          {suffix && <div className="shrink-0">{suffix}</div>}
        </div>
      </div>
      {error && <span className="mt-1 text-sm text-red-600">{error}</span>}
    </div>
  );
};

export default TextInput;
