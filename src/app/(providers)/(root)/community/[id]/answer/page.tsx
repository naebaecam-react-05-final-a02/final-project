import CommunityPostAnswerForm from './_components/CommunityPostAnswerForm/CommunityPostAnswerForm';

const CommunityAnswerPage = async ({ params }: { params: { id: string } }) => {
  return <CommunityPostAnswerForm postId={params.id} />;
};

export default CommunityAnswerPage;
