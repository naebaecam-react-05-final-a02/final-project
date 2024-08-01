import { cva } from 'class-variance-authority';

const SlideItemVariants = cva('border border-white/10 w-[270px] h-[270px] slide-item transition', {
  variants: {
    pos: {
      active: 'blur-0 scale-100',

      prev: 'blur-[6px] scale-75 translate-x-4',
      next: 'blur-[6px] scale-75 -translate-x-4',
      normal: 'blur-[6px] scale-75',
    },
    defaultVariants: {
      pos: 'normal',
    },
  },
});

// const SlideItemWrapperVariants = cva('', {
//   variants: {
//     pos: {
//       true: '',
//       false: 'w-[189px] h-[189px]',
//     },
//   },
// });

const SlideItem = ({ index, activeIndex }: { index: number; activeIndex: number }) => {
  const pos =
    index === activeIndex
      ? 'active'
      : index === activeIndex - 1
      ? 'prev'
      : index === activeIndex + 1
      ? 'next'
      : 'normal';
  console.log(pos);
  return (
    <div className={SlideItemVariants({ pos })}>
      <div>
        <h3>만보 걷기 챌린지</h3>
        <div>
          <p>참여 40</p>
          <p>인증 12</p>
          <p>후기 4</p>
        </div>
      </div>
      <div>
        <p>만보 걸음 인증</p>
        <p>2024.07.31 ~ 2024.08.31</p>
        <button>참여하기</button>
      </div>
    </div>
  );
};

export default SlideItem;
