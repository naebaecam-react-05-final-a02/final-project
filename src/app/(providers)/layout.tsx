import { ModalProvider } from '@/contexts/modal.context/modal.context';
import { ToastProvider } from '@/contexts/toast.context/toast.context';
import QueryProvider from '@/providers/QueryProvider';
import React from 'react';

const ProvidersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ToastProvider>
        <ModalProvider>{children}</ModalProvider>
      </ToastProvider>
    </QueryProvider>
  );
};

export default ProvidersLayout;
