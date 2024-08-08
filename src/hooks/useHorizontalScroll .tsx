'use client';

import { useEffect, useRef } from 'react';

const useHorizontalScroll = () => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      let timeoutId: NodeJS.Timeout | null = null;
      let totalDelta = 0;

      const smoothScroll = (scrollAmount: number) => {
        el.scrollTo({
          left: el.scrollLeft + scrollAmount,
          behavior: 'smooth',
        });
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        totalDelta += e.deltaY;

        if (timeoutId !== null) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
          const scrollAmount = Math.sign(totalDelta) * Math.min(Math.abs(totalDelta), 300);
          smoothScroll(scrollAmount);
          totalDelta = 0;
        }, 50);
      };

      el.addEventListener('wheel', onWheel, { passive: false });
      return () => el.removeEventListener('wheel', onWheel);
    }
  }, []);

  return elRef;
};

export default useHorizontalScroll;
