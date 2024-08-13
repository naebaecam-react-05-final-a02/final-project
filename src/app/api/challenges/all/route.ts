import { createClient } from '@/supabase/server';
import { ChallengeCategoryTypes, ChallengeStatusTypes } from '@/types/challenge';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const categories = searchParams.get('categories')?.split(',');
  const order = searchParams.get('order');
  const status = searchParams.get('status')?.split(',');
  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));
  const today = dayjs().format('YYYY-MM-DD');

  const supabase = createClient();
  const to = (page - 1) * limit;
  const from = page * limit;

  if (categories?.includes('all')) {
    categories.pop();
    categories.push(...['lifestyle', 'exercise', 'diet', 'etc']);
  }

  if (status?.includes('all')) {
    status.pop();
    status.push(...['LF', 'RUN', 'END']);
  }

  const ascending = order === 'startDate' || order === 'endDate' ? true : false;

  const { data, error } = await supabase
    .from('challenges')
    .select(`*`)
    .in('category', categories as Array<ChallengeCategoryTypes>)
    .in('isProgress', status as Array<ChallengeStatusTypes>)
    .order(order as string, { ascending })
    .gte('endDate', today)
    .range(to, from);

  if (error) {
    return NextResponse.json({ error: error.message, data: null, nextPage: null });
  }

  if (!data || data.length < 1) {
    return NextResponse.json({
      error: `${page} Page does not exist`,
      data: null,
      nextPage: null,
    });
  }

  if (data.length > limit) {
    const response = data.slice(0, limit);
    const nextPage = page + 1;
    return NextResponse.json({ error: null, data: response, nextPage });
  } else {
    const nextPage = null;
    return NextResponse.json({ error: null, data, nextPage });
  }
}
