export const dynamic = 'force-dynamic';

import Loading from '@/components/Loading/Loading';
import { Suspense } from 'react';
import CommunityPostList from './_components/CommunityPostList';
import { getInitialPosts } from './_utils/getInitialPosts';

const CommunityPage = async () => {
  const initialData = await getInitialPosts();

  return (
    <Suspense fallback={<Loading />}>
      <CommunityPostList initialData={initialData} />
    </Suspense>
  );
};

export default CommunityPage;
