import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const today = dayjs().format('YYYY-MM-DD');

  const { data } = await supabase
    .from('challenges')
    .select('*')
    .order('startDate', { ascending: true })
    .gt('startDate', today)
    .range(0, 3);

  return NextResponse.json(data);
}
