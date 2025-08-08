import React, { createContext, useContext, useState } from 'react';
import { Modal } from '@/components/ui/modal';

interface ModalConfig {
  title?: string;
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  showCloseButton?: boolean;
}

interface ModalContextType {
  showModal: (config: ModalConfig) => void;
  showAlert: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  showConfirm: (message: string, onConfirm: () => void, type?: 'warning' | 'error') => void;
  hideModal: () => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const showModal = (modalConfig: ModalConfig) => {
    setConfig(modalConfig);
    setIsOpen(true);
  };

  const showAlert = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    showModal({
      message,
      type,
      confirmText: '確定'
    });
  };

  const showConfirm = (
    message: string, 
    onConfirm: () => void, 
    type: 'warning' | 'error' = 'warning'
  ) => {
    showModal({
      message,
      type,
      onConfirm: () => {
        onConfirm();
        hideModal();
      },
      confirmText: '確定',
      cancelText: '取消'
    });
  };

  const hideModal = () => {
    setIsOpen(false);
    setConfig(null);
  };

  const handleConfirm = () => {
    if (config?.onConfirm) {
      config.onConfirm();
    } else {
      hideModal();
    }
  };

  return (
    <ModalContext.Provider value={{ showModal, showAlert, showConfirm, hideModal }}>
      {children}
      {config && (
        <Modal
          isOpen={isOpen}
          onClose={hideModal}
          title={config.title}
          type={config.type}
          onConfirm={config.onConfirm ? handleConfirm : undefined}
          confirmText={config.confirmText}
          cancelText={config.cancelText}
          showCloseButton={config.showCloseButton !== false}
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            {config.message}
          </p>
        </Modal>
      )}
    </ModalContext.Provider>
  );
};
