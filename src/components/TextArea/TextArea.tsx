import React from "react";
import "./TextArea.css";

export interface TextareaProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
  showCount?: boolean;
  autoSize?: boolean | { minRows?: number; maxRows?: number };
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  className = "",
  rows = 4,
  maxLength,
  showCount = false,
  autoSize = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  const getAutoSizeStyle = () => {
    if (!autoSize) return {};

    const minRows = typeof autoSize === 'object' ? autoSize.minRows || 2 : 2;
    const maxRows = typeof autoSize === 'object' ? autoSize.maxRows || 6 : 6;

    return {
      minHeight: `${minRows * 1.5}em`,
      maxHeight: maxRows ? `${maxRows * 1.5}em` : 'none',
    };
  };

  return (
    <div className={`custom-textarea ${className}`}>
      {label && <label className="textarea-label">{label}</label>}
      <div className="textarea-container">
        <textarea
          className={`textarea-field ${error ? "has-error" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          style={getAutoSizeStyle()}
        />
        {showCount && maxLength && (
          <div className="textarea-count">
            {value.length}/{maxLength}
          </div>
        )}
      </div>
      {error && <span className="textarea-error">{error}</span>}
    </div>
  );
};

export default Textarea;
