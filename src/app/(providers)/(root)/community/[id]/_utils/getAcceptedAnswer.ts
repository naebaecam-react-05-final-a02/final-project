import { createClient } from '@/supabase/client';

export async function getAcceptedAnswer(questionId: string) {
  const supabase = createClient();

  try {
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
      return;
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

    return answerData;
  } catch (error) {
    return console.error('Error fetching QA data:', error);
  }
}
