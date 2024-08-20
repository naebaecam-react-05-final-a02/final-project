import Loading from '@/components/Loading/Loading';
import { Suspense } from 'react';
import CommunityPostDetail from './_components/CommunityPostDetail';
import { getAnswers } from './_utils/getAnswers';
import { getPostDetail } from './_utils/getPostDetail';

const CommunityPostDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const postData = await getPostDetail(postId);
  const answersData = await getAnswers(postId);

  return (
    <Suspense fallback={<Loading />}>
      <CommunityPostDetail
        postId={postId}
        initialData={{
          post: postData,
          answers: answersData,
        }}
      />
    </Suspense>
  );
};

export default CommunityPostDetailPage;
