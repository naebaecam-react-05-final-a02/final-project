'use client';

import DefaultHeader from '@/components/MobileHeader/MobileHeader';
import NavBar from '@/components/NavBar';
import { PropsWithChildren } from 'react';
import BackBoard from './BackBoard/BackBoard';

interface MobileLayoutProps {
  headerLayout?: React.ReactElement;
  footerLayout?: React.ReactElement;
}

const Mobile = ({
  children,
  headerLayout = <DefaultHeader />,
  footerLayout = <NavBar />,
}: PropsWithChildren<MobileLayoutProps>) => {
  return (
    <div className="w-full h-screen relative text-white">
      <section className="h-full w-full flex flex-col ">
        <header className=" w-full h-14 mb-4 px-4">{headerLayout}</header>
        <div className="flex-1 relative w-full h-full overflow-scroll scroll pb-4">{children}</div>
        <footer className="w-full h-[72px]">{footerLayout}</footer>
      </section>
      <BackBoard />
    </div>
  );
};

export default Mobile;
