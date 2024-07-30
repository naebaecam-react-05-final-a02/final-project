import Mobile from '@/layouts/Mobile';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="root">
      <Mobile>{children}</Mobile>
    </div>
  );
};

export default RootLayout;
