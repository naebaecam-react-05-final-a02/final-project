import ChallengeReviewForm from '../../../_components/ChallengeReviewForm';

const ChallengeReviewPage = () => {
  return (
    <div className="h-screen">
      <header className="h-14 bg-amber-600">헤더</header>
      <main className="bg-amber-300 pb-7 px-6 flex flex-col gap-6 min-h-full">
        챌린지 후기 등록 페이지
        <ChallengeReviewForm />
      </main>
    </div>
  );
};

export default ChallengeReviewPage;
