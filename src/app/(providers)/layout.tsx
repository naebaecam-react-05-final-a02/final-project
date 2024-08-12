import { ModalProvider } from '@/contexts/modal.context/modal.context';
import QueryProvider from '@/providers/QueryProvider';
import React from 'react';

const ProvidersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <ModalProvider>{children}</ModalProvider>
    </QueryProvider>
  );
};

export default ProvidersLayout;
