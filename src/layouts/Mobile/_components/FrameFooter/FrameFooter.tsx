import HttpsIcon from '@/assets/mockup/https.svg';
import RefreshIcon from '@/assets/mockup/replay.svg';
import LanguageIcon from '@/assets/mockup/spellcheck.svg';

import PrevIcon from '@/assets/mockup/arrow_back_ios.svg';
import NextIcon from '@/assets/mockup/arrow_forward_ios.svg';
import ShareIcon from '@/assets/mockup/cloud_upload.svg';
import BookmarkIcon from '@/assets/mockup/turned_in_not.svg';
import PagesIcon from '@/assets/mockup/width_normal.svg';

const FrameFooter = () => {
  return (
    <div className="px-5 py-2 bg-[#2d2d2d] box-border w-full h-[130px] relative flex flex-col items-center">
      <div className="rounded-xl w-full h-11 bg-white/50 px-2 flex items-center justify-between gap-1">
        <LanguageIcon width={24} height={24} />
        <div className="flex gap-2">
          <HttpsIcon />
          <p className="text-white text-lg">https://www.oosie.com</p>
        </div>
        <RefreshIcon width={24} height={24} />
      </div>
      <div className="w-full h-11 flex items-center justify-between">
        <PrevIcon width={24} height={24} />
        <NextIcon width={24} height={24} />
        <ShareIcon width={24} height={24} />
        <BookmarkIcon width={24} height={24} />
        <PagesIcon width={24} height={24} />
      </div>
      <div className="w-full h-[26px] flex items-end justify-center">
        <div className="w-40 h-1 rounded-full bg-white"></div>
      </div>
    </div>
  );
};

export default FrameFooter;
