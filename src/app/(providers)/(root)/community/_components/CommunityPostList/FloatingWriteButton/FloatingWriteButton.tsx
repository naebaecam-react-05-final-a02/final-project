'use client';

import Puls from '@/icons/Puls';

interface FloatingWriteButtonProps {
  inView: boolean;
}

const FloatingWriteButton = ({ inView }: FloatingWriteButtonProps) => {
  return (
    <button
      className={`
        transition-all duration-300 ease-in-out px-4 py-4
        flex items-center justify-center z-50
        h-14 bg-black text-white rounded-full border-2 border-whiteT-10
        shadow-[-4px_-4px_8px_0px_rgba(18,242,135,0.10),_4px_4px_8px_0px_rgba(0,0,0,0.40)]
        ${inView ? 'w-14 hover:w-[110px]' : 'w-[110px]'}
      `}
    >
      <Puls className="flex-shrink-0 w-6 h-6 text-primary-100" />
      <span
        className={`
          ml-1 text-[16px] font-semibold whitespace-nowrap overflow-hidden
          transition-all duration-300
          ${inView ? 'w-0 opacity-0 group-hover:w-auto group-hover:opacity-100' : 'w-auto opacity-100'}
        `}
      >
        글쓰기
      </span>
    </button>
  );
};

export default FloatingWriteButton;
