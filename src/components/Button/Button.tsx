import React from "react";
import "./Button.css";

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: 'primary' | 'default' | 'dashed' | 'link' | 'text' | 'button' | 'reset' | 'submit';
  size?: 'small' | 'medium' | 'large';
  danger?: boolean;
  loading?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  backgroundColor?: string;
  borderRadius?: string;
  disabled?: boolean;
  theme?: "light" | "dark";
  variant?: "primary" | "secondary" | "danger" | "info" | "warning" | "dark" | "neon";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  backgroundColor,
  borderRadius,
  disabled = false,
  loading = false,
  theme = "light",
  variant = "primary",
  className = "",
}) => {
  const styleOverrides: React.CSSProperties = {
    backgroundColor,
    borderRadius,
  };

  return (
    <button
      className={`custom-button ${variant} ${theme} ${className}`}
      style={styleOverrides}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? <span className="spinner" /> : label}
    </button>
  );
};

export default Button;
