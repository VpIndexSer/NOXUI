import React, { useEffect } from 'react';
import './Drawer.css';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  width?: number | string;
  height?: number | string;
  maskClosable?: boolean;
  destroyOnClose?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  placement = 'right',
  width = 400,
  height = 256,
  maskClosable = true,
  destroyOnClose = false,
  className = '',
  style,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  const drawerStyle: React.CSSProperties = {
    ...style,
    width: placement === 'left' || placement === 'right' ? width : '100%',
    height: placement === 'top' || placement === 'bottom' ? height : '100%',
  };

  return (
    <>
      <div className={`nox-drawer-mask${open ? ' open' : ''}`} onClick={maskClosable ? onClose : undefined} />
      <div className={`nox-drawer nox-drawer-${placement}${open ? ' open' : ''} ${className}`} style={drawerStyle}>
        <div className="nox-drawer-header">
          <div className="nox-drawer-title">{title}</div>
          <button className="nox-drawer-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="nox-drawer-body">{(!destroyOnClose || open) && children}</div>
        {footer && <div className="nox-drawer-footer">{footer}</div>}
      </div>
    </>
  );
};

export default Drawer;