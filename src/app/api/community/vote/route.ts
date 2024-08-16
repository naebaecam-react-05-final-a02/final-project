import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request: NextRequest) {
  const supabase = createClient();
  try {
    const { title, items, postId } = await request.json();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류.' }, { status: 401 });
    }
    // 필수 필드 검증
    if (!title || !Array.isArray(items) || items.length < 2) {
      return NextResponse.json({ message: '제목과 최소 두 개의 항목을 입력해야 합니다.' }, { status: 400 });
    }
    const { data, error } = await supabase
      .from('communityVotes')
      .insert([
        {
          title,
          postId,
          items: items,
        },
      ])
      .select()
      .single();
    if (error) {
      throw error;
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
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  try {
    const { data, error } = await supabase.from('communityVotes').select('*').eq('postId', id).single();

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

export async function PATCH(request: NextRequest) {
  const supabase = createClient();
  try {
    const { title, items, postId, selectedOption } = await request.json();
    // 사용자 인증 가져오기
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ message: '인증 오류.' }, { status: 401 });
    }
    const userId = user.id;
    // 데이터베이스에 투표 데이터 추가
    const { data, error: voteError } = await supabase
      .from('communityVotes')
      .update([
        {
          items: items,
        },
      ])
      .eq('postId', postId)
      .select()
      .single();
    if (voteError) {
      throw voteError;
    }
    const { data: existingVote, error: existingVoteError } = await supabase
      .from('communityVoter')
      .select('*')
      .eq('postId', postId)
      .eq('userId', userId)
      .single();

    if (existingVoteError && existingVoteError.code !== 'PGRST116') {
      throw existingVoteError;
    }

    if (existingVote) {
      const { error: updateError } = await supabase
        .from('communityVoter')
        .update({ selectedOption })
        .eq('postId', postId)
        .eq('userId', userId);

      if (updateError) {
        throw updateError;
      }
    } else {
      const { error: insertError } = await supabase.from('communityVoter').insert({ postId, userId, selectedOption });

      if (insertError) {
        throw insertError;
      }
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
