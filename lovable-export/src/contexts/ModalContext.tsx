import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  showAlert: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const showAlert = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    alert(`${type.toUpperCase()}: ${message}`);
  };

  return (
    <ModalContext.Provider value={{ showAlert }}>
      {children}
    </ModalContext.Provider>
  );
};
