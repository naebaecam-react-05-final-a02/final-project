import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  try {
    const { record } = await request.json();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류.', isBookmarked: false }, { status: 401 });
    }

    const userId = user.id;
    // 북마크 존재 여부 확인
    const { data: existingBookmark, error: checkError } = await supabase
      .from('exercisesBookmarks')
      .select('id')
      .eq('userId', userId)
      .eq('name', record.name)
      .single();
    if (checkError && checkError.code !== 'PGRST116') {
      return NextResponse.json({ error: checkError.message, isBookmarked: false }, { status: 400 });
    }

    let isBookmarked = false;

    if (existingBookmark) {
      // 북마크 제거
      const { error: deleteError } = await supabase.from('exercisesBookmarks').delete().eq('id', existingBookmark.id);
      if (deleteError) {
        return NextResponse.json({ error: deleteError.message, isBookmarked: true }, { status: 400 });
      }
      isBookmarked = false;
    } else {
      // 북마크 추가
      const { error: insertError } = await supabase.from('exercisesBookmarks').insert({
        userId,
        name: record.name,
        exerciseType: record.exerciseType,
        memo: record.memo,
        record: record.record,
        date: record.date,
      });
      if (insertError) {
        return NextResponse.json({ error: insertError.message, isBookmarked: false }, { status: 400 });
      }
      isBookmarked = true;
    }

    return NextResponse.json({ message: '북마크 상태가 업데이트되었습니다.', isBookmarked }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '북마크 업데이트를 실패했습니다.', error: (error as Error).message, isBookmarked: false },
      { status: 500 },
    );
  }
}
