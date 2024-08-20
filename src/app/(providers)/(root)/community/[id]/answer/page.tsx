import { getPostDetail } from '../_utils/getPostDetail';
import CommunityPostAnswerForm from './_components/CommunityPostAnswerForm/CommunityPostAnswerForm';

const CommunityAnswerPage = async ({ params }: { params: { id: string } }) => {
  const postData = await getPostDetail(params.id);
  return <CommunityPostAnswerForm postId={params.id} initialData={postData} />;
};

export default CommunityAnswerPage;
