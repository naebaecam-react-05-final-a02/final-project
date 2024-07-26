import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import Link from 'next/link';
import Categories from '../Categories';
import ChallengeList from '../ChallengeList';

const PopularChallenges = async () => {
  try {
    const supabase = createClient();
    const today = dayjs().format('YYYY-MM-DD');

    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('startDate', { ascending: true })
      .gt('startDate', today)
      .range(0, 3);

    if (error) throw error;

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
