import Header from '@/components/Header';
import Mobile from '@/layouts/Mobile';
import ChallengeRegisterForm from './_components/ChallengeRegisterForm';

const ChallengeRegisterPage = () => {
  return (
    <Mobile headerLayout={<Header title="챌린지 등록" />}>
      <main className='className="grid gap-y-11 w-full"'>
        <ChallengeRegisterForm />
      </main>
    </Mobile>
  );
};

export default ChallengeRegisterPage;
