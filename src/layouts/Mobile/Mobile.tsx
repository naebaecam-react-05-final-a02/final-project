'use client';

import NavBar from '@/components/NavBar';
import UserProfile from '@/components/UserProfile';
import { useThemeStore } from '@/stores/useThemeStore';
import { cva } from 'class-variance-authority';
import { PropsWithChildren } from 'react';
import FrameDockBar from './_components/DockBar/DockBar';
import FrameHeader from './_components/Header/Header';
import ThemeButton from './_components/ThemeButton';
import BackBoard from './BackBoard/BackBoard';

interface MobileLayoutProps {}

const MobileFrameVariants = cva(
  'w-[390px] h-[844px] border-8 border-black rounded-[44px] relative overflow-hidden pt-11 pb-10',
  {
    variants: {
      darkMode: {
        true: ' text-white',
        false: ' text-black',
      },
    },
    defaultVariants: {
      darkMode: false,
    },
  },
);

const Mobile = ({ children }: PropsWithChildren<MobileLayoutProps>) => {
  const darkMode = useThemeStore((state) => state.darkMode);
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <ThemeButton />
      <div className={MobileFrameVariants({ darkMode })}>
        <FrameHeader />
        <section className="h-full relative">
          <div className="relative w-full h-full overflow-scroll scroll px-4">
            <header className=" w-full h-14 border-b border-b-gray-500 mb-4">
              <UserProfile />
            </header>

            {children}
          </div>
          <NavBar />
          <BackBoard />
        </section>
        <FrameDockBar />
      </div>
    </div>
  );
};

export default Mobile;
