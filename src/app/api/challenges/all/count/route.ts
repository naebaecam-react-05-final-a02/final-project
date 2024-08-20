import { createClient } from '@/supabase/server';
import { ChallengeCategoryTypes, ChallengeStatusTypes } from '@/types/challenge';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.get('categories')?.split(',');
  const order = searchParams.get('order');
  const status = searchParams.get('status')?.split(',');
  const searchValue = searchParams.get('searchValue') ?? '';
  const today = dayjs().format('YYYY-MM-DD');

  const supabase = createClient();

  const ascending = order === 'startDate' || order === 'endDate' ? true : false;

  if (categories?.includes('all')) {
    categories.pop();
    categories.push(...['lifestyle', 'exercise', 'diet', 'etc']);
  }

  if (status?.includes('all')) {
    status.pop();
    status.push(...['LF', 'RUN', 'END']);
  }
  const { count, error } = await supabase
    .from('challenges')
    .select(`*`, { count: 'exact', head: true })
    .in('category', categories as Array<ChallengeCategoryTypes>)
    .in('isProgress', status as Array<ChallengeStatusTypes>)
    .like('title', `%${searchValue}%`)
    .order(order as string, { ascending })
    .gte('endDate', today);

  if (error) {
    return NextResponse.json({ error: error.message, data: null, nextPage: null });
  }
  return NextResponse.json(count);
}
