import React from "react";
import "./Radio.css";

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioProps {
  label?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  options?: RadioOption[];
  disabled?: boolean;
  direction?: "vertical" | "horizontal";
  className?: string;
}

const Radio: React.FC<RadioProps> = ({
  label,
  name,
  value,
  onChange,
  options = [],
  disabled = false,
  direction = "vertical",
  className = "",
}) => {
  return (
    <div className={`radio-group-wrapper ${direction} ${className}`}>
      {label && <div className="radio-group-label">{label}</div>}
      <div className={`radio-group ${direction}`}>
        {options.map((option, idx) => (
          <label
            key={idx}
            className={`custom-radio ${option.disabled || disabled ? "disabled" : ""}`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              disabled={option.disabled || disabled}
            />
            <span className="radio-dot" />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;
