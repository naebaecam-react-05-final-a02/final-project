import ArrowRight from '@/assets/arrow-right.svg';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';
import ArticleTitle from '../ArticleTitle/ArticleTitle';
import Bullet from '../Bullet';
import DDayLabel from '../DDayLabel';

type TChallenges = Tables<'challenges'> & { user?: Tables<'users'> };

interface ChallengeItemProps {
  challenge: TChallenges;
}

const ChallengeItem = ({ challenge }: ChallengeItemProps) => {
  const today = dayjs();
  const ChallengeStartDate = dayjs(challenge.startDate);
  const restDate = ChallengeStartDate.diff(today, 'day');
  return (
    <article className="h-[74px] w-full py-3 px-4 bg-white/10 rounded-lg flex justify-between items-center">
      <div className="flex flex-col justify-between">
        <div className="flex gap-2">
          <ArticleTitle icon="🔥" title={challenge.title} />
          {restDate === 0 ? (
            <DDayLabel>D-DAY</DDayLabel>
          ) : restDate < 0 ? (
            <DDayLabel>진행중</DDayLabel>
          ) : (
            <DDayLabel>D-{restDate}</DDayLabel>
          )}
        </div>
        <div className="flex items-center opacity-50">
          <Bullet />
          <p className="max-w-[270px] text-sm line-clamp-1">{challenge.content}</p>
        </div>
      </div>

      <ArrowRight className="w-6 h-6 " />
    </article>
  );
};

export default ChallengeItem;
