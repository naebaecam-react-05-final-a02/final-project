import ArticleTitle from '../ArticleTitle/ArticleTitle';
import ChallengeItem from './ChallengeItem/ChallengeItem';

const MyChallenges = () => {
  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="w-full flex justify-between items-center">
        <ArticleTitle icon="🤛" title="내가 참여중인 챌린지" />
        <p className="text-white/50 text-sm">총 10개</p>
      </div>
      <ul className="flex flex-col gap-2">
        {Array.from({ length: 10 }, (_, i) => {
          return (
            <li key={i}>
              <ChallengeItem />
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default MyChallenges;
