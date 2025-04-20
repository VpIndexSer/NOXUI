import React from "react";
import "./DateInput.css";

export interface DateInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const DateInput: React.FC<DateInputProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  className = "",
}) => {
  return (
    <div className={`date-input-wrapper ${className}`}>
      {label && <label className="date-label">{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="date-input"
      />
    </div>
  );
};

export default DateInput;
