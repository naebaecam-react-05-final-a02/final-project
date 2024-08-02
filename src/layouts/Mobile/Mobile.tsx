'use client';

import NavBar from '@/components/NavBar';
import UserProfile from '@/components/UserProfile';
import { useThemeStore } from '@/stores/useThemeStore';
import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import FrameDockBar from './_components/DockBar/DockBar';
import FrameHeader from './_components/Header/Header';
import BackBoard from './BackBoard/BackBoard';

interface MobileLayoutProps {}

const MobileFrameVariants = cva(
  'w-[406px] h-[860px] border-8 border-black rounded-[44px] relative overflow-hidden pt-10 pb-10',
  {
    variants: {
      darkMode: {
        true: ' text-white',
        false: ' text-black',
      },
    },
    defaultVariants: {
      darkMode: true,
    },
  },
);

const Mobile = ({ children }: PropsWithChildren<MobileLayoutProps>) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className={MobileFrameVariants({ darkMode })}>
        <FrameHeader />
        <section className="h-full relative flex flex-col">
          <UserProfile />
          <div className="relative w-full h-full overflow-scroll scroll pb-4">{children}</div>
          <NavBar />
        </section>
        <FrameDockBar />
        <BackBoard />
      </div>
    </div>
  );
};

export default Mobile;
