import QueryProvider from '@/providers/QueryProvider';
import React from 'react';

const ProvidersLayout = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default ProvidersLayout;
