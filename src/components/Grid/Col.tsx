import React from "react";
import "./Grid.css";

export interface ColProps {
  span: number; // 1 to 24
  className?: string;
  children: React.ReactNode;
  gutter?: number;
}

const Col: React.FC<ColProps> = ({ span, className = "", children, gutter = 0 }) => {
  const width = (span / 24) * 100;
  const padding = gutter / 2;

  const style: React.CSSProperties = {
    width: `${width}%`,
    paddingLeft: padding,
    paddingRight: padding,
  };

  return (
    <div className={`grid-col ${className}`} style={style}>
      {children}
    </div>
  );
};

export default Col;
