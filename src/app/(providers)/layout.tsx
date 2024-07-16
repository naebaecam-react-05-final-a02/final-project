import React from 'react';
import QueryProvider from '../providers/QueryProvider';

const ProvidersLayout = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default ProvidersLayout;
