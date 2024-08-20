import BackBoard from '@/layouts/BackBoard/BackBoard';
import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="grid w-full h-full place-items-center">
      <div className="relative w-full min-w-[1px] h-full ">
        <BackBoard />
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
