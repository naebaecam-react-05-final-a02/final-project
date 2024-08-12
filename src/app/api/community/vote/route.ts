import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const { title, items } = await request.json();

    // 사용자 인증 가져오기
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류.' }, { status: 401 });
    }

    const userId = user.id;

    // 필수 필드 검증
    if (!title || !Array.isArray(items) || items.length < 2) {
      return NextResponse.json({ message: '제목과 최소 두 개의 항목을 입력해야 합니다.' }, { status: 400 });
    }

    // 데이터베이스에 투표 데이터 추가
    const { data, error } = await supabase
      .from('communityVotes')
      .insert([
        {
          title,
          items: JSON.stringify(items), // items 배열을 JSON 문자열로 변환하여 저장
          userId,
        },
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: '투표가 성공적으로 등록되었습니다.', data }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '투표 등록에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
