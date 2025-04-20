import React from "react";
import "./Input.css";

export interface InputProps {
  type?: "text" | "password" | "email";
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  className = "",
}) => {
  return (
    <div className={`custom-input ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        className={`input-field ${error ? "has-error" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      {error && <span className="input-error">{error}</span>}
    </div>
  );
};

export default Input;
