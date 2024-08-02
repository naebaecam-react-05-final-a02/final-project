import Button from '@/components/Button';
import PrevButtonAndTitleHeader from '@/components/PrevButtonAndTitleHeader/PrevButtonAndTitleHeader';
import Mobile from '@/layouts/Mobile';
import LocalBanner from '../[id]/verification/list/_components/LocalBanner';
import VerificationList from './_components/VerificationList/VerificationList';

const TestVerificationListPage = () => {
  return (
    <Mobile
      headerLayout={<PrevButtonAndTitleHeader>챌린지 인증 목록</PrevButtonAndTitleHeader>}
      footerLayout={
        <div className="p-[10px]">
          <Button>인증하기</Button>
        </div>
      }
    >
      <div className="px-4 mb-6">
        <LocalBanner users={214} />
      </div>
      <section className="px-4">
        <VerificationList />
      </section>
    </Mobile>
  );
};

export default TestVerificationListPage;
