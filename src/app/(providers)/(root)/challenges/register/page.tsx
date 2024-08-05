import Mobile from '@/layouts/Mobile';
import ChallengeRegisterForm from './_components/ChallengeRegisterForm';

const ChallengeRegisterPage = () => {
  return (
    <Mobile>
      <main className='className="grid gap-y-11 w-full"'>
        <ChallengeRegisterForm />
      </main>
    </Mobile>
  );
};

export default ChallengeRegisterPage;
