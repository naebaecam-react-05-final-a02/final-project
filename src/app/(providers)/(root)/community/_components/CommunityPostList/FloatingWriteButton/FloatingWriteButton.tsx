'use client';

import Puls from '@/icons/Puls';
import Link from 'next/link';
import { useState } from 'react';

interface FloatingWriteButtonProps {
  inView: boolean;
}

const FloatingWriteButton = ({ inView }: FloatingWriteButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const isExpanded = !inView || isHovered;

  return (
    <Link href="/community/write">
      <button
        className={`
          transition-all duration-300 ease-in-out px-4 py-4
          flex items-center justify-center pointer-events-auto
          h-14 bg-black text-white rounded-full border-2 border-whiteT-10
          shadow-[-4px_-4px_8px_0px_rgba(18,242,135,0.10),_4px_4px_8px_0px_rgba(0,0,0,0.40)]
          ${isExpanded ? 'w-[110px]' : 'w-14'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Puls className="flex-shrink-0 w-6 h-6 text-primary-100" />
        <span
          className={`
            ml-1 text-[16px] font-semibold whitespace-nowrap overflow-hidden
            transition-all duration-300
            ${isExpanded ? 'w-auto opacity-100' : 'w-0 opacity-0'}
          `}
        >
          글쓰기
        </span>
      </button>
    </Link>
  );
};

export default FloatingWriteButton;
