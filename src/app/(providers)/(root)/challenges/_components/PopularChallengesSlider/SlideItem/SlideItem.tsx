import { cva } from 'class-variance-authority';
import Link from 'next/link';
import { TChallenge } from '../../../_types/types';
import Bullet from '../../Bullet/Bullet';

const SlideItemVariants = cva('border border-white/10 w-[270px] h-[270px] slide-item transition', {
  variants: {
    pos: {
      active: 'blur-0 scale-100',

      prev: 'blur-[4px] scale-75 translate-x-5',
      next: 'blur-[4px] scale-75 -translate-x-5',
      normal: 'blur-[6px] scale-75',
      dummy: 'opacity-0',
    },
    defaultVariants: {
      pos: 'normal',
    },
  },
});

interface SlideItemProps {
  challenge: TChallenge;

  index: number;
  activeIndex: number;
}

const SlideItem = ({ challenge, index, activeIndex }: SlideItemProps) => {
  const pos =
    challenge.id === -1 || challenge.id === -5
      ? 'dummy'
      : index === activeIndex
      ? 'active'
      : index === activeIndex - 1
      ? 'prev'
      : index === activeIndex + 1
      ? 'next'
      : 'normal';

  return (
    <div className={SlideItemVariants({ pos })}>
      <div className="flex flex-col gap-3 items-start">
        <div className="flex gap-2">
          <div className="w-7 h-7 bg-gray-500 rounded-md"></div>
          <h3 className="text-xl font-semibold truncate w-52">{challenge.title}</h3>
        </div>
        <div className="flex text-sm gap-3 bg-white/10 px-[8px] py-[3px] rounded-[4px]">
          <p className="text-primary-100">참여 {challenge.participants}</p>
          <p>인증 {challenge.verifications}</p>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2">
        <div className="flex">
          <Bullet />
          <p className="text-[16px] font-semibold truncate">{challenge.content}</p>
        </div>

        <p className="text-[12px] text-white/50 font-light">
          {challenge.startDate} ~ {challenge.endDate}
        </p>
        <Link href={`/challenges/${challenge.id}/detail`}>
          <button className="w-full h-12 relative rounded-lg overflow-hidden flex justify-center items-center">
            <p className="absolute z-10 font-semibold">참여하기</p>
            <div className="rounded-lg border border-white/30 absolute inset-0 backdrop-[5px] -z-10"></div>
            <div className="h-1/2 w-full bg-gradient-to-b from-white/0 to-white/100 absolute bottom-0 opacity-50 backdrop-[5px]"></div>
            <div className="w-full h-full flex justify-center items-center bg-radial-gradient-button rounded-lg absolute -z-20"></div>
            <div className="absolute w-full h-full bg-primary-100/70"></div>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SlideItem;
