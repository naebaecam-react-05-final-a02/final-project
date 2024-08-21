import Loading from '@/components/Loading/Loading';
import { Suspense } from 'react';
import CommunityPostDetail from './_components/CommunityPostDetail';
import { getAnswers } from './_utils/getAnswers';

const CommunityPostDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const answersData = await getAnswers(postId);

  return (
    <Suspense fallback={<Loading />}>
      <CommunityPostDetail
        postId={postId}
        initialData={{
          answers: answersData,
        }}
      />
    </Suspense>
  );
};

export default CommunityPostDetailPage;
