import type { InputHTMLAttributes } from "react";

interface InputFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
}

function InputField({
  id,
  name,
  label,
  type = "text",
  value,
  onChange,
  error,
  optional = false,
  className = "",
  ...props
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-xs font-semibold text-gray-700"
      >
        {label}{" "}
        {optional && (
          <span className="font-normal text-gray-400">(Optional)</span>
        )}
      </label>

      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500 ${className}`}
        {...props}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default InputField;