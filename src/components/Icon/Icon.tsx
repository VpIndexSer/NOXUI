import React from 'react';
import './Icon.css';

export interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ name, className = '', style, onClick }) => {
  return (
    <span 
      className={`icon icon-${name} ${className}`} 
      style={style}
      onClick={onClick}
    />
  );
};

export default Icon; 