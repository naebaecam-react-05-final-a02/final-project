import ArrowRight from '@/assets/arrow-right.svg';
import ArticleTitle from '../ArticleTitle/ArticleTitle';
import Bullet from '../Bullet';
import DDayLabel from '../DDayLabel';

const ChallengeSkeleton = () => {
  return (
    <article className="h-[74px] w-full py-3 px-4 bg-white/10 rounded-lg flex justify-between items-center">
      <div className="flex flex-col justify-between">
        <div className="flex gap-2">
          <ArticleTitle icon="🔥" title="불러오는 중" />
          <DDayLabel>불러오는 중</DDayLabel>
        </div>
        <div className="flex items-center opacity-50">
          <Bullet />
          <p className="text-sm">불러오는 중</p>
        </div>
      </div>

      <ArrowRight className="w-6 h-6 " />
    </article>
  );
};

export default ChallengeSkeleton;
