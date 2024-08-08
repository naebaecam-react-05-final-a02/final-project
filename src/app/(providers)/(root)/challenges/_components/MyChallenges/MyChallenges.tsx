import { joinedMyChallengesDataType } from '@/types/challenge';
import _ from 'lodash';
import Link from 'next/link';
import ArticleTitle from '../ArticleTitle/ArticleTitle';
import ChallengeItem from '../ChallengeItem';

interface MyChallengesProps {
  data: joinedMyChallengesDataType;
}

const MyChallenges = ({ data }: MyChallengesProps) => {
  const challenges = data.data;
  console.log(challenges);
  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="w-full flex justify-between items-center">
        <ArticleTitle icon="🤛" title="내가 참여중인 챌린지" />
        <p className="text-white/50 text-sm">총 {challenges?.length}개</p>
      </div>
      <ul className="flex flex-col gap-2">
        {_.isEmpty(challenges) ? (
          <div>loading</div>
        ) : (
          challenges?.map((challenge) => {
            return (
              <li key={challenge.id}>
                {challenge.challenges && (
                  <Link href={`/challenges/${challenge.challenges.id}/detail`}>
                    <ChallengeItem challenge={challenge.challenges} />
                  </Link>
                )}
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
};

export default MyChallenges;
