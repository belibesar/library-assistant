import React from "react";

type Option = {
  value: string;
  label: string;
};

type FormSelectProps = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  required?: boolean;
};

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  value,
  onChange,
  options,
  required = false,
}) => (
  <div>
    <label className="mb-1 block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default FormSelect;
