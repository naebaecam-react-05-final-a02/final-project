import { createClient } from '@/supabase/server';
import { getNextDateISO } from '@/utils/dateFormatter';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { NextRequest, NextResponse } from 'next/server';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export const GET = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') as string;

    const supabase = createClient();
    // get user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { data, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('userId', user.id)
      .gte('date', date)
      .lt('date', getNextDateISO(date))
      .order('id');

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ message: '운동 조회에 실패했습니다' }, { status: 400 });
  }
};

export const PUT = async (request: NextRequest) => {
  try {
    const { exerciseData, exerciseId } = await request.json();
    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (exerciseData.date) {
      const formattedDate = dayjs(exerciseData.date).tz().format('YYYY-MM-DD');
      exerciseData.date = formattedDate;
    }

    const { error } = await supabase.from('exercises').update(exerciseData).eq('id', exerciseId);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ message: '운동이 성공적으로 수정되었습니다' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: '운동 수정에 실패했습니다' }, { status: 400 });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id') as string;

    const supabase = createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { error } = await supabase.from('exercises').delete().eq('id', id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ message: '운동이 성공적으로 삭제되었습니다' }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ message: '운동 삭제에 실패했습니다' }, { status: 400 });
  }
};
