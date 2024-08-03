'use client';

import Image from 'next/image';

const FrameHeader = () => {
  return (
    <div className="absolute top-0 w-[390px] h-[44px] bg-gradient-to-b from-black/100 to-black/0">
      <Image src={'/frames/dark.svg'} width={390} height={44} alt={'header'} />
    </div>
  );
};

export default FrameHeader;
