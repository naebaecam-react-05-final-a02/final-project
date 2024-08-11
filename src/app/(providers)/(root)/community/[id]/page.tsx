import Mobile from '@/layouts/Mobile';
import CommunityPostDetail from './_components/CommunityPostDetail';

const CommunityPostDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <Mobile>
      <CommunityPostDetail />
    </Mobile>
  );
};

export default CommunityPostDetailPage;
