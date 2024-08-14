import { usersQueryKeys } from '@/hooks/auth/queries';
import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const supabase = createClient();

  try {
    const { title, items, id } = await request.json();

    // 사용자 인증 가져오기
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류.' }, { status: 401 });
    }

    const userId = user.id;
    console.log('@@title', title);

    if (!id) {
      // 필수 필드 검증
      if (!title || !Array.isArray(items) || items.length < 2) {
        console.log('@@1', 1);
        return NextResponse.json({ message: '제목과 최소 두 개의 항목을 입력해야 합니다.' }, { status: 400 });
      }
      const { data, error } = await supabase
        .from('communityVotes')
        .insert([
          {
            title,
            items: JSON.stringify(items),
          },
        ])
        .select()
        .single();
      if (error) {
        throw error;
      }
    } else {
      // 데이터베이스에 투표 데이터 추가
      const { data, error: voteError } = await supabase
        .from('communityVotes')
        .update([
          {
            items: JSON.stringify(items),
          },
        ])
        .eq('id', id)
        .select()
        .single();
      const { error: voterError } = await supabase
        .from('communityVoter')
        .upsert([
          {
            id,
            userId,
          },
        ])
        .select()
        .single();
    }

    return NextResponse.json({ message: '투표가 성공적으로 등록되었습니다.' }, { status: 200 });
  } catch (error) {
    console.error('@@ error', error);
    return NextResponse.json(
      { message: '투표 등록에 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}

// 투표 결과 가져오기
export async function GET(request: NextRequest) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('communityVotes').select('*').single(); // 가장 최근 투표 가져오기 (또는 특정 ID로 변경 가능)

    if (error) {
      throw error;
    }

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생:', error);
    return NextResponse.json(
      { message: '데이터를 가져오는 데 실패했습니다.', error: (error as Error).message },
      { status: 500 },
    );
  }
}
