'use client';

import { useEffect, useRef } from 'react';

const useHorizontalScrollForUl = () => {
  const ulRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ul = ulRef.current;
    if (ul) {
      let isScrolling = false;
      let startX: number;
      let scrollLeft: number;

      const onMouseDown = (e: MouseEvent) => {
        isScrolling = true;
        startX = e.pageX - ul.offsetLeft;
        scrollLeft = ul.scrollLeft;
        ul.style.cursor = 'grabbing';
      };

      const onMouseUp = () => {
        isScrolling = false;
        ul.style.cursor = 'grab';
      };

      const onMouseLeave = () => {
        isScrolling = false;
        ul.style.cursor = 'grab';
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - ul.offsetLeft;
        const walk = (x - startX) * 2; // 스크롤 속도 조절
        ul.scrollLeft = scrollLeft - walk;
      };

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        ul.scrollLeft += e.deltaY;
      };

      ul.addEventListener('mousedown', onMouseDown);
      ul.addEventListener('mouseup', onMouseUp);
      ul.addEventListener('mouseleave', onMouseLeave);
      ul.addEventListener('mousemove', onMouseMove);
      ul.addEventListener('wheel', onWheel, { passive: false });

      return () => {
        ul.removeEventListener('mousedown', onMouseDown);
        ul.removeEventListener('mouseup', onMouseUp);
        ul.removeEventListener('mouseleave', onMouseLeave);
        ul.removeEventListener('mousemove', onMouseMove);
        ul.removeEventListener('wheel', onWheel);
      };
    }
  }, []);

  return ulRef;
};

export default useHorizontalScrollForUl;
