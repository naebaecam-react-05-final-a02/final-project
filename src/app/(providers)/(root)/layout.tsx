import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <div id="root">{children}</div>;
};

export default RootLayout;
