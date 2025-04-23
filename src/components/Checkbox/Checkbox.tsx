import React, { useRef, useEffect } from "react";
import "./Checkbox.css";

export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onChange?: (e: { target: { checked: boolean } }) => void;
  onClick?: (e: React.MouseEvent<HTMLLabelElement>) => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLLabelElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLLabelElement>) => void;
  value?: any;
  name?: string;
  id?: string;
  autoFocus?: boolean;
  type?: 'checkbox' | 'radio';
  size?: 'default' | 'small' | 'large';
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  defaultChecked = false,
  indeterminate = false,
  disabled = false,
  className = "",
  style,
  onChange = () => {},
  onClick,
  onMouseEnter,
  onMouseLeave,
  value,
  name,
  id,
  autoFocus = false,
  type = 'checkbox',
  size = 'default',
}) => {
  const [internalChecked, setInternalChecked] = React.useState(checked !== undefined ? checked : defaultChecked);
  const checkboxRef = useRef<HTMLInputElement>(null);
  const isControlled = checked !== undefined;

  useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked);
    }
  }, [checked, isControlled]);

  useEffect(() => {
    if (checkboxRef.current) {
      checkboxRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalChecked(e.target.checked);
    }
    onChange?.({ target: { checked: e.target.checked } });
  };

  const handleClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const isChecked = isControlled ? checked : internalChecked;

  return (
    <label
      className={`nox-checkbox-wrapper ${className} ${size} ${disabled ? 'nox-checkbox-disabled' : ''} ${isChecked ? 'nox-checkbox-checked' : ''} ${indeterminate ? 'nox-checkbox-indeterminate' : ''}`}
      style={style}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className="nox-checkbox">
        <input
          ref={checkboxRef}
          type={type}
          className="nox-checkbox-input"
          checked={isChecked}
          defaultChecked={defaultChecked}
          disabled={disabled}
          onChange={handleChange}
          value={value}
          name={name}
          id={id}
          autoFocus={autoFocus}
        />
        <span className="nox-checkbox-inner" />
      </span>
      {label && <span className="nox-checkbox-label">{label}</span>}
    </label>
  );
};

export default Checkbox;
