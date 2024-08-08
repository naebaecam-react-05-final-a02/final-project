import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const page = Number(searchParams.get('page'));
  const limit = Number(searchParams.get('limit'));
  const today = dayjs().format('YYYY-MM-DD');

  const supabase = createClient();
  const to = (page - 1) * limit;
  const from = page * limit;
  const { data, error } =
    category !== 'all'
      ? await supabase
          .from('challenges')
          .select(`*`)
          .eq('category', category)
          .order('startDate', { ascending: true })
          .gte('startDate', today)
          .range(to, from)
      : await supabase
          .from('challenges')
          .select(`*`)
          .order('startDate', { ascending: true })
          .gte('startDate', today)
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
