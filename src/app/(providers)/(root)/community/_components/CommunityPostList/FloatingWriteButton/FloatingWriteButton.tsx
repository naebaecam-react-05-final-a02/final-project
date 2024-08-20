import Puls from '@/icons/Puls';
import { useEffect, useState } from 'react';
import { FiEdit3 } from 'react-icons/fi';

interface FloatingWriteButtonProps {
  inView: boolean;
  buttonType?: 'write' | 'answer';
}

const FloatingWriteButton = ({ inView, buttonType = 'write' }: FloatingWriteButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!inView);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(!inView);
    }, 50);
    return () => clearTimeout(timer);
  }, [inView]);

  const buttonText = buttonType === 'answer' ? '답변하기' : '글쓰기';
  const IconComponent = buttonType === 'answer' ? FiEdit3 : Puls;

  return (
    <button
      className={`
        transition-all duration-300 ease-in-out
        flex items-center justify-center z-50
        h-14 bg-black text-white rounded-full border-2 border-whiteT-10
        shadow-[-4px_-4px_8px_0px_rgba(18,242,135,0.10),_4px_4px_8px_0px_rgba(0,0,0,0.40)]
        ${isExpanded || isHovered ? 'px-4 py-4' : 'w-14 px-4'}
        ${buttonType === 'answer' ? 'hover:w-[130px]' : 'hover:w-[110px]'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: isExpanded || isHovered ? (buttonType === 'answer' ? '130px' : '110px') : '56px',
      }}
    >
      <IconComponent className="flex-shrink-0 w-6 h-6 text-primary-100" />
      <span
        className={`
          ml-1 text-[16px] font-semibold whitespace-nowrap overflow-hidden
          transition-all duration-300
          ${isExpanded || isHovered ? 'w-auto opacity-100' : 'w-0 opacity-0'}
        `}
        aria-label="글쓰기 버튼"
      >
        {buttonText}
      </span>
    </button>
  );
};

export default FloatingWriteButton;
