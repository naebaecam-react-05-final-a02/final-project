'use client';
import { Toast } from '@/components/Toast/Toast';
import { ToastTypes } from '@/types/toast';
import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface ToastContextTypes {
  add: (content: ToastTypes['content']) => void;
  delete: (id: ToastTypes['id']) => void;
}

const initialValue: ToastContextTypes = {
  add: () => {},
  delete: () => {},
};

const ToastContext = createContext(initialValue);

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastTypes[]>([]);
  const value = {
    add: (content: ToastTypes['content']) => {
      setToasts((prev) => [{ id: uuidv4(), content }, ...prev]);
    },
    delete: (id: ToastTypes['id']) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    },
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="absolute top-4 right-4 pt-10">
        {toasts && toasts.map((toast) => <Toast id={toast.id} key={toast.id} content={toast.content} />)}
      </div>
    </ToastContext.Provider>
  );
};
