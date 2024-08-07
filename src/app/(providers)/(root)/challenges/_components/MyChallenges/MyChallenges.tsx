import { Tables } from '@/types/supabase';
import ArticleTitle from '../ArticleTitle/ArticleTitle';

type ChallengesTypes = Tables<'challenges'>;
type JoinedChallengeParticipantsTypes = Tables<'challengeParticipants'> & { challenges: ChallengesTypes };

interface MyChallengesProps {
  challenges: JoinedChallengeParticipantsTypes[] | null;
}

const MyChallenges = ({ challenges }: MyChallengesProps) => {
  return (
    <section className="flex flex-col gap-4 px-4">
      <div className="w-full flex justify-between items-center">
        <ArticleTitle icon="🤛" title="내가 참여중인 챌린지" />
        <p className="text-white/50 text-sm">총 10개</p>
      </div>
    </section>
  );
};

export default MyChallenges;
