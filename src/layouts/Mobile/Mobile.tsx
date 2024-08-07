'use client';

import DefaultHeader from '@/components/MobileHeader/MobileHeader';
import NavBar from '@/components/NavBar';
import { useScrollDirectionStore } from '@/stores/scrollDirection.store';
import useDetectScroll, { Direction } from '@smakss/react-scroll-direction';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
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
  const customElementRef = useRef<HTMLDivElement>(null);
  const [customElement, setCustomElement] = useState<HTMLDivElement>();
  const { scrollDir } = useDetectScroll({
    target: customElement,
    thr: 100,
    scrollUp: Direction.Up,
    scrollDown: Direction.Down,
    still: Direction.Still,
  });
  const setDir = useScrollDirectionStore((state) => state.setDir);

  useEffect(() => {
    setDir(scrollDir);
  }, [scrollDir, setDir]);

  useEffect(() => {
    if (customElementRef.current) {
      setCustomElement(customElementRef.current);
    }
  }, [customElementRef]);

  return (
    <div className="w-full h-screen relative text-white">
      <section className="h-full w-full flex flex-col ">
        <header className=" w-full h-14 px-4">{headerLayout}</header>
        <div ref={customElementRef} className="flex-1 relative w-full h-full overflow-scroll scroll py-4">
          {children}
        </div>

        <footer className="w-full h-[72px]">{footerLayout}</footer>
      </section>
      <BackBoard />
    </div>
  );
};

export default Mobile;
