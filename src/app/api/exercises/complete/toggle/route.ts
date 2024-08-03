import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  try {
    const { exerciseId, isCompleted } = await request.json();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류.' }, { status: 401 });
    }

    const userId = user.id;

    const { error } = await supabase
      .from('exercises')
      .update({ isCompleted: !isCompleted })
      .eq('id', exerciseId)
      .eq('userId', userId);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: '운동 완료 상태가 업데이트되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '운동 완료 상태 업데이트를 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
