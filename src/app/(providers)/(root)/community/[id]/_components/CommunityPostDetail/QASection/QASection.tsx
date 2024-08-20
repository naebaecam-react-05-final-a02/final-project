import { Answer } from '@/types/community';
import AcceptedAnswerItem from './AcceptedAnswerItem';
import AnswerItem from './AnswerItem';

interface QASectionProps {
  answers: Answer[] | undefined;
  userId: string;
  postId: string;
  acceptedAnswer: Answer | null;
  isAuthor: boolean;
  onAcceptAnswer: (answerId: string, answerUserId: string) => void;
  isAcceptedAnswerLoading: boolean;
  onEditAnswer: (answerId: string) => void;
  onDeleteAnswer: (answerId: string) => void;
}

const QASection = ({
  answers,
  userId,
  postId,
  acceptedAnswer,
  isAuthor,
  onAcceptAnswer,
  isAcceptedAnswerLoading,
  onEditAnswer,
  onDeleteAnswer,
}: QASectionProps) => {
  return (
    <div className="px-4 mt-6">
      {acceptedAnswer ? (
        <>
          <h3 className="text-[14px] font-medium mb-2">덤벨점수를 받은 답변입니다.</h3>
          <AcceptedAnswerItem answer={acceptedAnswer} postId={postId} />
          <div
            className="h-[1px] bg-whiteT-20 my-8"
            style={{
              boxShadow: '0px 1px 2px 0px rgba(255, 255, 255, 0.10), 0px -2px 4px 0px rgba(0, 0, 0, 0.70)',
            }}
          />
        </>
      ) : (
        <h3 className="text-[14px] font-medium mb-2">아직 채택 받은 답변이 없습니다.</h3>
      )}

      {answers &&
        answers.map((answer, index) => (
          <div key={answer.id} className={index === answers.length - 1 ? 'mb-[70px]' : ''}>
            <AnswerItem
              answer={answer}
              userId={userId}
              postId={postId}
              isAuthor={isAuthor}
              acceptedAnswer={acceptedAnswer}
              onAcceptAnswer={onAcceptAnswer}
              isAcceptedAnswerLoading={isAcceptedAnswerLoading}
              onEditAnswer={onEditAnswer}
              onDeleteAnswer={onDeleteAnswer}
            />
            {index < answers.length - 1 && (
              <div
                className="h-[1px] bg-whiteT-20 my-8"
                style={{
                  boxShadow: '0px 1px 2px 0px rgba(255, 255, 255, 0.10), 0px -2px 4px 0px rgba(0, 0, 0, 0.70)',
                }}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default QASection;
