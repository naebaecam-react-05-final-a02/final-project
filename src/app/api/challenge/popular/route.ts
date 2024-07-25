import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const today = dayjs().format('YYYY-MM-DD');
  console.log(today);

  const { data } = await supabase
    .from('challenges')
    .select('*')
    .order('startDate', { ascending: true })
    .gt('startDate', today)
    .range(0, 3);
  console.log(data);
  return NextResponse.json({ data });
}
