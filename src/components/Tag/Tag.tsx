import React from 'react';
import './Tag.css';

export interface TagProps {
  color?: string;
  closable?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Tag: React.FC<TagProps> = ({
  color,
  closable = false,
  onClose,
  children,
  className = '',
  style,
}) => {
  const handleClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    onClose?.(e);
  };

  const tagStyle = {
    ...style,
    ...(color ? { backgroundColor: color, borderColor: color } : {}),
  };

  return (
    <span
      className={`nox-tag ${className}`}
      style={tagStyle}
    >
      <span className="nox-tag-content">{children}</span>
      {closable && (
        <span className="nox-tag-close" onClick={handleClose}>
          ×
        </span>
      )}
    </span>
  );
};

export default Tag; 