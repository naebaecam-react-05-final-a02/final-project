'use client';

import ChallengeIcon from '@/assets/challenges/challenge.svg';
import { useScrollDirectionStore } from '@/stores/scrollDirection.store';
import { cva } from 'class-variance-authority';
import Link from 'next/link';

const scrollButtonVariant = cva('transition-all duration-300 overflow-hidden whitespace-nowrap', {
  variants: {
    dir: {
      still: 'pl-1 w-[112px]',
      down: 'w-0 text-transparent',
      up: 'pl-1 w-[112px]',
    },
  },
});

const WritingButton = () => {
  const scrollDir = useScrollDirectionStore((state) => state.dir);

  return (
    <Link href="/challenges/register">
      <div className="bg-black rounded-full px-4 h-[60px] flex justify-start items-center  overflow-hidden z-10">
        <div className="w-7 h-7">
          <ChallengeIcon />
        </div>
        {
          <div className={scrollButtonVariant({ dir: scrollDir as unknown as 'up' | 'down' | 'still' })}>
            <p className="h-full">챌린지 등록하기</p>
          </div>
        }
      </div>
    </Link>
  );
};

export default WritingButton;
