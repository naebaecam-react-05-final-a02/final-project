import { createClient } from '@/supabase/server';

export async function getAnswers(questionId: string) {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) throw userError;

  const { data: qaData, error: qaError } = await supabase
    .from('communityQa')
    .select('answerId')
    .eq('questionId', questionId)
    .single();

  if (qaError && qaError.code !== 'PGRST116') throw qaError;

  const { data: answers, error: answerError } = await supabase
    .from('communityAnswer')
    .select(
      `
    *,
    user:userId (
      id,
      nickname,
      profileURL
    )
  `,
    )
    .eq('questionId', questionId)
    .order('createdAt', { ascending: true });

  if (answerError) throw answerError;

  const filteredAnswers =
    qaData && qaData.answerId ? answers.filter((answer) => answer.id !== qaData.answerId) : answers;

  const hasUserAnswered = filteredAnswers.some((answer) => answer.userId === user?.id);

  const { data: isLike, error: isLikeError } = await supabase
    .from('communityAnswerLikes')
    .select('*')
    .eq('userId', user?.id);

  if (isLikeError) throw isLikeError;

  const answersWithLikes = filteredAnswers.map((answer) => {
    const likeInfo = isLike.find((like) => like.answerId === answer.id);
    return {
      ...answer,
      isLiked: likeInfo ? likeInfo.isLike : null,
    };
  });

  const responseData = {
    answers: answersWithLikes,
    hasUserAnswered,
  };

  return responseData;
}
