'use client';

import NavBar from '@/components/NavBar';
import UserProfile from '@/components/UserProfile';
import { PropsWithChildren } from 'react';
import BackBoard from './BackBoard/BackBoard';

interface MobileLayoutProps {}

const Mobile = ({ children }: PropsWithChildren<MobileLayoutProps>) => {
  return (
    <div className="w-full h-screen relative text-white">
      <section className="h-full w-full flex flex-col ">
        <UserProfile />
        <div className="flex-1 relative w-full h-full overflow-scroll scroll pb-4">{children}</div>
        <NavBar />
      </section>
      <BackBoard />
    </div>
  );
};

export default Mobile;
