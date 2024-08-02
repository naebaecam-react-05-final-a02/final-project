import ThumbsUp from '@/assets/thumbs-up.svg';

const VerificationItem = ({}) => {
  return (
    <article className="rounded-3xl bg-white/5 border border-white/10 box-border p-2 flex flex-col gap-3">
      <div className="w-full aspect-[8/7] bg-gray-500 rounded-xl relative">
        <div className="flex gap-1 items-center absolute top-1 right-2">
          <ThumbsUp className="h-[18px] w-[18px]" />
          <p className="text-[12px]">999</p>
        </div>
      </div>
      <div>
        <div className="flex gap-1 items-center">
          <div className="w-[18px] h-[18px] bg-gray-500 border border-white rounded-full"></div>
          <p className="text-white/70 text-[12px]">닉네임</p>
        </div>
        <p className="text-[12px] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed quibusdam placeat sunt earum neque aliquid
          doloremque excepturi, assumenda odio asperiores architecto officiis quod sapiente consectetur eos corrupti
          voluptates. Culpa, aliquam.
        </p>
      </div>
    </article>
  );
};

export default VerificationItem;
