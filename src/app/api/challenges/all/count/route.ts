import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get('category');
  const today = dayjs().format('YYYY-MM-DD');

  const supabase = createClient();
  const { count, error } =
    category === 'all'
      ? await supabase.from('challenges').select('*', { count: 'exact', head: true }).gte('endDate', today)
      : await supabase
          .from('challenges')
          .select('*', { count: 'exact', head: true })
          .eq('category', category)
          .gte('endDate', today);

  if (error) return NextResponse.json(error);
  return NextResponse.json(count);
}
