import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  ...props
}) => {
  return (
    <div className="w-full text-left mb-3">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="bg-[#eee] border-none py-3 px-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-[#ff416c] focus:bg-white"
        {...props}
      />
    </div>
  );
};

export default Input;
