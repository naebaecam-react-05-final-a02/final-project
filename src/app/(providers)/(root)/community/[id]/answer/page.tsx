import CommunityPostAnswerForm from './_components/CommunityPostAnswerForm/CommunityPostAnswerForm';

const CommunityAnswerPage = ({ params }: { params: { id: string } }) => {
  console.log(params.id);
  return <CommunityPostAnswerForm postId={params.id} />;
};

export default CommunityAnswerPage;
