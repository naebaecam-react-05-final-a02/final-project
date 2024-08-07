'use client';

import Image from 'next/image';

const FrameHeader = () => {
  return (
    <div className="w-[390px] h-11 bg-gradient-to-b from-black/100 to-black/0 relative">
      <Image src={'/frames/dark.svg'} width={390} height={44} alt={'header'} />
    </div>
  );
};

export default FrameHeader;
