import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const supabase = createClient();

  try {
    const { searchParams } = new URL(request.url);
    const questionId = searchParams.get('questionId');

    if (!questionId) {
      return NextResponse.json({ error: '질문 ID가 필요합니다.' }, { status: 400 });
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;

    // QA 테이블에서 데이터 조회
    const { data: qaData, error: qaError } = await supabase
      .from('communityQa')
      .select('answerId')
      .eq('questionId', questionId)
      .single();

    if (qaError && qaError.code !== 'PGRST116') {
      throw qaError;
    }

    if (!qaData || !qaData.answerId) {
      return NextResponse.json(false, { status: 200 });
    }

    // 답변 테이블에서 데이터 조회
    const { data: answerData, error: answerError } = await supabase
      .from('communityAnswer')
      .select(
        `
        *,
        user:userId (
          id,
          nickname,
          profileURL,
          level
        )
      `,
      )
      .eq('questionId', questionId)
      .eq('id', qaData.answerId)
      .single();

    if (answerError) throw answerError;

    return NextResponse.json(answerData, { status: 200 });
  } catch (error) {
    console.error('Error fetching QA data:', error);
    return NextResponse.json({ error: 'QA 데이터를 가져오는데 실패했습니다.' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { questionId, answerId } = await request.json();

    if (!questionId || !answerId) {
      return NextResponse.json({ error: '질문 ID와 답변 ID가 필요합니다.' }, { status: 400 });
    }

    const { data: postExists, error: postCheckError } = await supabase
      .from('communityPosts')
      .select('id')
      .eq('id', questionId)
      .single();

    if (postCheckError || !postExists) {
      return NextResponse.json({ error: '해당 질문이 존재하지 않습니다.' }, { status: 404 });
    }

    // QA 테이블 upsert
    const { data, error } = await supabase
      .from('communityQa')
      .upsert(
        {
          questionId: questionId,
          answerId: answerId,
          isAccepted: true,
          questionUserId: user.id,
        },
        {
          onConflict: 'questionId,questionUserId',
          ignoreDuplicates: false,
        },
      )
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return NextResponse.json({ message: '답변이 성공적으로 처리되었습니다.', data }, { status: 200 });
  } catch (error) {
    console.error('Error updating/inserting QA:', error);
    return NextResponse.json({ error: 'QA 처리에 실패했습니다.' }, { status: 500 });
  }
}
