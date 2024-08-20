'use client';

import ChevronLeft from '@/icons/ChevronLeft';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentProps } from 'react';

type BackButtonProps = Omit<ComponentProps<'button'>, 'onClick'> & {
  customAction?: () => void;
};

const BackButton = ({ className = '', customAction, ...props }: BackButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (customAction) {
      customAction();
    } else if (pathname === '/exercises' || pathname === '/diets') {
      router.push('/');
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      aria-label="back-button"
      className={`rounded-xl border-2 border-black/10 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_rgba(255,255,255,0.10)] backdrop-blur-[5px] p-2 ${className}`}
      {...props}
    >
      <ChevronLeft />
    </button>
  );
};

export default BackButton;
