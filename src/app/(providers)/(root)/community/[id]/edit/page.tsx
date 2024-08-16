import CommunityPostEditForm from './_components/CommunityPostEditForm';

const CommunityEditPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return <CommunityPostEditForm postId={params.id} />;
};

export default CommunityEditPage;
