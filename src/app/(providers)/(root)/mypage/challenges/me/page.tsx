import MyPageHeader from '@/components/Header/MyPageHeader';
import Mobile from '@/layouts/Mobile';
import MyChallengeList from '../_components/MyChallengeList';

const ParticipatingChallengesPage = () => {
  return (
    <Mobile headerLayout={<MyPageHeader />}>
      <MyChallengeList />
    </Mobile>
  );
};

export default ParticipatingChallengesPage;
