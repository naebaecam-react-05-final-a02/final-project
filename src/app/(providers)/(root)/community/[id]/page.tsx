import Loading from '@/components/Loading/Loading';
import { Suspense } from 'react';
import CommunityPostDetail from './_components/CommunityPostDetail';

const CommunityPostDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;

  return (
    <Suspense fallback={<Loading />}>
      <CommunityPostDetail postId={postId} />
    </Suspense>
  );
};

export default CommunityPostDetailPage;
