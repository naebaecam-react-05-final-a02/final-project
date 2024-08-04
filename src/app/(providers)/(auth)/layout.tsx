import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center  bg-[#1A1625]  w-full h-screen bg-[url('/background.png')] bg-cover bg-center text-white ">
      {children}
    </div>
  );
};

export default AuthLayout;
