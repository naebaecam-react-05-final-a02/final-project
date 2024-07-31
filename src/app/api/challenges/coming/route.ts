import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const supabase = createClient();

  const today = dayjs().format('YYYY-MM-DD');

  if (category === 'all') {
    const { data } = await supabase
      .from('challenges')
      .select('*')
      .order('startDate', { ascending: true })
      .gt('startDate', today)
      .range(0, 3);

    return NextResponse.json({ data });
  } else {
    const { data } = await supabase
      .from('challenges')
      .select('*')
      .eq('category', category)
      .order('startDate', { ascending: true })
      .gt('startDate', today)
      .range(0, 3);

    return NextResponse.json({ data });
  }
}
