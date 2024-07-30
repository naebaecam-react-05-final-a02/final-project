'use client';

import NavBar from '@/components/common/NavBar';
import UserProfile from '@/components/UserProfile';
import { PropsWithChildren } from 'react';
import DockBar from './_components/DockBar';
import Header from './_components/Header/Header';
import ThemeButton from './_components/ThemeButton';

interface MobileLayoutProps {}

const Mobile = ({ children }: PropsWithChildren<MobileLayoutProps>) => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ThemeButton />
      <div className="w-[390px] h-[844px] border-8 border-black rounded-[40px] relative overflow-hidden flex flex-col pt-11 pb-10">
        <Header />
        <section className="h-full flex-1 relative">
          <header className=" w-full h-14 border-b border-b-gray-500 mb-4">
            <UserProfile />
          </header>

          {children}
          <NavBar />
        </section>
        <DockBar />
      </div>
    </div>
  );
};

export default Mobile;
