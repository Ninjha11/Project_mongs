import React from 'react';

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ open, onClose, children }) => (
  open ? (
    <div className="fixed inset-0 z-40 flex">
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="relative z-50 w-full max-w-md p-4 m-4 bg-white rounded-lg shadow-lg">
        {children}
      </div>
    </div>
  ) : null
);
