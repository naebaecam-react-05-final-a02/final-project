'use client';

import { useThemeStore } from '@/stores/useThemeStore';
import { cva } from 'class-variance-authority';
import Image from 'next/image';

const headerVariants = cva('absolute top-0', {
  variants: {
    darkMode: {
      false: 'bg-white',
      true: 'bg-black',
    },
  },
});

const Header = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const header = darkMode ? '/frames/dark.svg' : '/frames/light.svg';
  return (
    <div className={headerVariants({ darkMode })}>
      <Image src={header} width={390} height={44} alt={'header'} />
    </div>
  );
};

export default Header;
