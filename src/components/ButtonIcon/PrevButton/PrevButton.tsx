'use client';

import PrevSVG from '@/assets/prev.svg';
import { useRouter } from 'next/navigation';
import GlassButton from '../GlassButton';

const PrevButton = ({ ...props }) => {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} {...props}>
      <GlassButton>
        <PrevSVG />
      </GlassButton>
    </button>
  );
};

export default PrevButton;
