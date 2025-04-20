import React, { isValidElement, ReactNode } from "react";
import "./Grid.css";

export interface RowProps {
  gutter?: number;
  className?: string;
  children: ReactNode;
}

const Row: React.FC<RowProps> = ({ gutter = 0, className = "", children }) => {
  const style = {
    marginLeft: gutter ? `-${gutter / 2}px` : undefined,
    marginRight: gutter ? `-${gutter / 2}px` : undefined,
  };

  return (
    <div className={`grid-row ${className}`} style={style}>
      {React.Children.map(children, (child) => {
        if (isValidElement(child)) {
          // Only clone if the child is a valid ReactElement
          return React.cloneElement(child, {
            ...child.props,
            gutter,
          });
        }
        return child;
      })}
    </div>
  );
};

export default Row;
