import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-m text-gray-900">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprie Me
          </button>
        )}
      </div>
      <div className="flex">
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          required
          className="text-gray-900 text-sm rouned-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block  p-3 drop-shadow rounded-md w-full"
        />
      </div>
    </div>
  );
};

export default FormField;
