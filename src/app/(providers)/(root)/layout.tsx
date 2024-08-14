import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="root">
      <div id="portal" />
      {children}
    </div>
  );
};

export default RootLayout;
