import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';
interface ExerciseData {
  date: string;
  userId: string;
  exerciseType: string;
  name: string;
  id: string;
  record: any[];
}

export async function GET() {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류.' }, { status: 401 });
    }

    const userId = user.id;

    const { data, error } = await supabase.from('exercisesBookmarks').select('*').eq('userId', userId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '북마크 목록 조회를 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
