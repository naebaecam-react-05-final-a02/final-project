import CommunityPostEditForm from './_components/CommunityPostEditForm';

const CommunityEditPage = async ({ params }: { params: { id: string } }) => {
  return <CommunityPostEditForm postId={params.id} />;
};

export default CommunityEditPage;
