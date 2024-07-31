'use client';

import ChevronLeft from '@/icons/ChevronLeft';
import { useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

type BackButtonProps = Omit<ComponentProps<'button'>, 'onClick'>;

const BackButton = ({ className = '', ...props }: BackButtonProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-xl border-2 border-black/10 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_rgba(255,255,255,0.10)] backdrop-blur-[5px] p-2 ${className}`}
      {...props}
    >
      <ChevronLeft />
    </button>
  );
};

export default BackButton;
