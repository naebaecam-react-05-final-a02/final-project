import React from 'react';

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full bg-[#1A1625]">
      <div className="flex items-center justify-center  bg-[#1A1625]  w-full min-h-screen bg-[url('/background.png')] bg-cover bg-center text-white ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
