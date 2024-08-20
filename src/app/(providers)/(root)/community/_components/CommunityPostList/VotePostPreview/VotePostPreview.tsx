import { CommunityVotePostData } from '@/types/community';
import Link from 'next/link';
import React from 'react';
import { FaChevronRight } from 'react-icons/fa6';

interface VotePostPreview {
  latestVotePost: CommunityVotePostData;
}

const VotePostPreview = React.memo(({ latestVotePost }: VotePostPreview) => {
  return (
    <Link href={`/community/${latestVotePost.id}`} key={latestVotePost.id}>
      <div className="relative flex bg-whiteT-10 border border-whiteT-20 rounded-lg items-center justify-between px-4 py-3 pr-20">
        <h2 className="text-white  overflow-hidden truncate ">{latestVotePost.title}</h2>
        <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary-70 font-semibold text-[12px] flex items-center underline underline-offset-2">
          투표하기
          <FaChevronRight className="ml-1 flex justify-center items-center" />
        </button>
      </div>
    </Link>
  );
});

VotePostPreview.displayName = 'VotePostPreview';

export default VotePostPreview;
