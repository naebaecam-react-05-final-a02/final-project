import CommunityPostDetail from './_components/CommunityPostDetail';

const CommunityPostDetailPage = ({ params }: { params: { id: string } }) => {
  return <CommunityPostDetail postId={params.id} />;
};

export default CommunityPostDetailPage;
