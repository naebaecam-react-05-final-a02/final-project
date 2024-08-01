import ArrowRight from '@/assets/arrow-right.svg';
import Link from 'next/link';
import ArticleTitle from '../../ArticleTitle/ArticleTitle';
import Bullet from '../../Bullet';
import DDayLabel from '../../DDayLabel';

const ChallengeItem = () => {
  return (
    <article className="h-[74px] w-full py-3 px-4 bg-white/10 rounded-lg flex justify-between items-center">
      <div className="flex flex-col justify-between">
        <div className="flex gap-2">
          <ArticleTitle icon="🔥" title="만보 걷기 챌린지" />
          <DDayLabel>14</DDayLabel>
        </div>
        <div className="flex items-center opacity-50">
          <Bullet />
          <p className="text-sm">만보 걸음 인증</p>
        </div>
      </div>

      <Link href="/">
        <ArrowRight className="w-6 h-6 " />
      </Link>
    </article>
  );
};

export default ChallengeItem;
