import NavBar from '@/components/common/NavBar';
import UserProfile from '@/components/UserProfile';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="root" className="max-w-[390px] mx-auto border border-red-500 px-5">
      <header className="w-full h-14 border-b border-b-gray-500 mb-4">
        <UserProfile />
      </header>
      {children}
      <NavBar />
    </div>
  );
};

export default RootLayout;
