import MyPageHeader from '@/components/Header/MyPageHeader';
import Mobile from '@/layouts/Mobile';
import OwnerChallengeList from '../_components/OwnerChallengeList';

const OwnerChallengesPage = () => {
  return (
    <Mobile headerLayout={<MyPageHeader />}>
      <OwnerChallengeList />
    </Mobile>
  );
};

export default OwnerChallengesPage;
