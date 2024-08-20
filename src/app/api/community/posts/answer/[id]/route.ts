import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();
  try {
    const answerId = params.id;

    if (!answerId) {
      return NextResponse.json({ error: '답변 ID가 필요합니다.' }, { status: 400 });
    }

    const { data: answer, error: answerError } = await supabase
      .from('communityAnswer')
      .select(
        `
        *,
        user:userId (
          id,
          nickname,
          profileURL,
          level
        ),
        question:questionId (
          id,
          title,
          content,
          userId,
          createdAt,
          views,
          tags
        )
      `,
      )
      .eq('id', answerId)
      .single();

    if (answerError) throw answerError;

    if (!answer) {
      return NextResponse.json({ error: '답변을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(answer, { status: 200 });
  } catch (error) {
    console.error('Error fetching answer data:', error);
    return NextResponse.json({ error: '답변 데이터를 가져오는데 실패했습니다.' }, { status: 500 });
  }
}
