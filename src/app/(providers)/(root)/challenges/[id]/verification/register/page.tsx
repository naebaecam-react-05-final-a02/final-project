import VerificationRegister from './_components/registerVerification/VerificationRegister';

const ChallengeVerificationRegisterPage = async ({ params }: { params: { id: string } }) => {
  return <VerificationRegister params={params} />;
};

export default ChallengeVerificationRegisterPage;
