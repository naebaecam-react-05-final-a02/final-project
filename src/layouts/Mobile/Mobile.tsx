'use client';

import DefaultHeader from '@/components/MobileHeader/MobileHeader';
import NavBar from '@/components/NavBar';
import { useScrollDirectionStore } from '@/stores/scrollDirection.store';
import useDetectScroll, { Direction } from '@smakss/react-scroll-direction';
import _ from 'lodash';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import BackBoard from './BackBoard/BackBoard';
import MockUp from './_components/MockUp';

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
  const [width, setWidth] = useState<number>(0);

  const handleResize = _.debounce(() => {
    setWidth(window.innerWidth);
  }, 200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      // cleanup
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setDir(scrollDir);
  }, [scrollDir, setDir]);

  useEffect(() => {
    if (customElementRef.current) {
      setCustomElement(customElementRef.current);
    }
  }, [customElementRef]);

  return (
    <>
      {width > 800 ? (
        <MockUp>
          <section className="h-[670px] w-full flex flex-col relative text-white">
            <header className=" w-full h-14 px-4">{headerLayout}</header>
            <div ref={customElementRef} className="flex-1 w-full h-full overflow-scroll scroll py-4">
              {children}
            </div>

            <footer className="w-full h-[72px]">{footerLayout}</footer>
          </section>
        </MockUp>
      ) : (
        <div className="w-full h-screen relative text-white">
          <section className="h-full w-full flex flex-col ">
            <header className=" w-full h-14 px-4">{headerLayout}</header>
            <div ref={customElementRef} className="flex-1 w-full h-full overflow-scroll scroll py-4">
              {children}
            </div>

            <footer className="w-full h-[72px]">{footerLayout}</footer>
          </section>
          <BackBoard />
        </div>
      )}
    </>
  );
};

export default Mobile;
