import Loading from '@/components/Loading/Loading';
import { communityQueryKeys } from '@/hooks/community/queries';
import api from '@/service/service'; // api import 추가
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Suspense } from 'react';
import CommunityPostDetail from './_components/CommunityPostDetail';
import { getAnswers } from './_utils/getAnswers';
import { getPostDetail } from './_utils/getPostDetail';

const CommunityPostDetailPage = async ({ params }: { params: { id: string } }) => {
  const postId = params.id;
  const postData = await getPostDetail(postId);
  const answersData = await getAnswers(postId);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: communityQueryKeys.votes(),
    queryFn: () => api.community.getVote(postId),
  });

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CommunityPostDetail
          postId={postId}
          initialData={{
            post: postData,
            answers: answersData,
          }}
        />
      </HydrationBoundary>
    </Suspense>
  );
};

export default CommunityPostDetailPage;
