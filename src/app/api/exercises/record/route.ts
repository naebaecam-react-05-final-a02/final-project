import { createClient } from '@/supabase/server';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { NextRequest, NextResponse } from 'next/server';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

interface ExerciseData {
  date: string;
  userId: string;
  exerciseType: string;
  name: string;
  memo: string;
  id: string;
  record: any[];
}

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const { date, exerciseType, name, memo, record } = await request.json();

    const formattedDate = dayjs(date).tz().format('YYYY-MM-DD');

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류.' }, { status: 401 });
    }

    const userId = user.id;

    // 필수 필드 검증
    if (!formattedDate || !exerciseType || !name || !record) {
      return NextResponse.json({ message: '모든 필드를 채워주겐니!!!' }, { status: 400 });
    }

    // record 필드가 JSON 배열인지 확인
    if (!Array.isArray(record)) {
      return NextResponse.json({ message: 'record 필드는 JSON 배열이어야 한단다!!!.' }, { status: 400 });
    }

    // 데이터베이스에 운동 기록 추가
    const { data, error } = await supabase
      .from('exercises')
      .insert([
        {
          date: formattedDate,
          userId,
          exerciseType,
          name,
          memo,
          record,
        },
      ])
      .select()
      .single<ExerciseData>();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: '운동 기록이 성공적으로 등록되었지 뭐람?', data }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '운동 기록 등록에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
