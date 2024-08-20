import { createClient } from '@/supabase/server';
import { Answer } from '@/types/community';

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
        profileURL,
        level
      )
    `,
    )
    .eq('questionId', questionId)
    .order('createdAt', { ascending: true });

  if (answerError) throw answerError;

  const { data: isLike, error: isLikeError } = await supabase
    .from('communityAnswerLikes')
    .select('*')
    .eq('userId', user?.id);

  if (isLikeError) throw isLikeError;

  let acceptedAnswer = null;
  let otherAnswers = answers;

  if (qaData && qaData.answerId) {
    acceptedAnswer = answers.find((answer) => answer.id === qaData.answerId);
    otherAnswers = answers.filter((answer) => answer.id !== qaData.answerId);
  }

  const processAnswer = (answer: Answer) => {
    const likeInfo = isLike.find((like) => like.answerId === answer.id);
    return {
      ...answer,
      isLiked: likeInfo ? likeInfo.isLike : null,
    };
  };

  const acceptedAnswerWithLike = acceptedAnswer ? processAnswer(acceptedAnswer) : null;
  const answersWithLikes = otherAnswers.map(processAnswer);

  const hasUserAnswered = answers.some((answer) => answer.userId === user?.id);

  const responseData = {
    acceptedAnswer: acceptedAnswerWithLike,
    answers: answersWithLikes,
    hasUserAnswered,
  };

  return responseData;
}
