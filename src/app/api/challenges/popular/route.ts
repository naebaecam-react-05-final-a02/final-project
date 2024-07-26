import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('API route /api/challenges/popular called');

  try {
    const supabase = createClient();

    const today = dayjs().format('YYYY-MM-DD');
    console.log('Today:', today);

    const { data, error } = await supabase
      .from('challenges')
      .select('*')
      .order('startDate', { ascending: true })
      .gt('startDate', today)
      .range(0, 3);

    if (error) {
      console.error('Supabase query error:', error);
      return NextResponse.json({ error: 'Database query failed' }, { status: 500 });
    }

    console.log('Retrieved data:', data);

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
