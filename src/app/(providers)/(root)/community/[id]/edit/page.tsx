import { getPostDetail } from '../_utils/getPostDetail';
import CommunityPostEditForm from './_components/CommunityPostEditForm';

const CommunityEditPage = async ({ params }: { params: { id: string } }) => {
  const postData = await getPostDetail(params.id);

  return <CommunityPostEditForm postId={params.id} initialData={postData} />;
};

export default CommunityEditPage;
