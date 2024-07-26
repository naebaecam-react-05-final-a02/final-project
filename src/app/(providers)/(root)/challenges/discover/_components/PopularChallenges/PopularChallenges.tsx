import api from '@/service/service';
import Link from 'next/link';
import Categories from '../Categories';
import ChallengeList from '../ChallengeList';

const PopularChallenges = async () => {
  try {
    const data = await api.challenge.getPopularChallenges();

    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-3xl">인기있는 챌린지</h2>
          <Link href="/challenges/discover/popular">
            <div>전체보기</div>
          </Link>
        </div>
        <Categories />
        <ChallengeList data={data} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching popular challenges:', error);
    return <div>인기 있는 챌린지를 불러오는 중 오류가 발생했습니다.</div>;
  }
};

export default PopularChallenges;
