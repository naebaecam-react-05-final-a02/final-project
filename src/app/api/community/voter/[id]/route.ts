import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// 투표 결과 가져오기
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const postId = params.id;

  const supabase = createClient();
  // 사용자 인증 가져오기
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ message: '인증 오류.' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('communityVoter')
      .select('*')
      .eq('postId', postId)
      .eq('userId', user.id)
      .single();

    if (error?.code) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ available: true, data });
      }
    }

    return NextResponse.json({ available: false, data });
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error);
    return NextResponse.json(
      { message: '데이터를 가져오는 데 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
