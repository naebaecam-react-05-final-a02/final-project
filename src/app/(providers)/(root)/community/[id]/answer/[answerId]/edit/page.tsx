import { Answer } from '@/types/community';
import EditAnswerForm from './_components/EditAnswerForm';

interface EditAnswerPageProps {
  params: {
    id: string;
    answerId: string;
  };
}

const getAnswer = async (answerId: string): Promise<Answer> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/community/posts/answer/${answerId}`);

  if (!res.ok) throw new Error('Failed to fetch answer');
  return res.json();
};

async function EditAnswerPage({ params }: EditAnswerPageProps) {
  const { id: postId, answerId } = params;

  let initialAnswer: Answer | null = null;
  let error: Error | null = null;

  try {
    initialAnswer = await getAnswer(answerId);
  } catch (e) {
    error = e instanceof Error ? e : new Error('Failed to fetch answer');
  }

  if (error) {
    return <div>답변을 불러오는데 실패했습니다: {error.message}</div>;
  }

  if (!initialAnswer) {
    return <div>답변을 찾을 수 없습니다.</div>;
  }

  return <EditAnswerForm postId={postId} answerId={answerId} initialAnswer={initialAnswer} />;
}

export default EditAnswerPage;
