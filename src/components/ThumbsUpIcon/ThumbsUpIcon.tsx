'use client';
import { cva } from 'class-variance-authority';
import { BiLike, BiSolidLike } from 'react-icons/bi';

const thumbsUpIconVariants = cva('flex gap-1 items-center absolute top-1 right-1 px-3 py-1', {
  variants: {
    isBackground: {
      true: ' rounded-full bg-black/50',
      false: '',
    },
  },
});

const ThumbsUpIcon = ({
  verificationId,
  likesCount,
  isLiked,
  isBackground = true,
}: {
  verificationId: number;
  likesCount: number;
  isLiked: boolean;
  isBackground?: boolean;
}) => {
  return (
    <div className={thumbsUpIconVariants({ isBackground })}>
      {isLiked ? (
        <BiSolidLike color="white" className="h-[18px] w-[18px]" />
      ) : (
        <BiLike color="white" className="h-[18px] w-[18px]" />
      )}
      <p className="text-[12px] text-white">{likesCount}</p>
    </div>
  );
};

export default ThumbsUpIcon;
