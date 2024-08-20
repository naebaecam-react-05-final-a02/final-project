import { useGetChallengeDetail } from '@/hooks/challenge/useChallenge';
import { ChallengeNotificationCategory } from '@/types/notification';

type NotificationChallengeTextProps = { category: ChallengeNotificationCategory; id: string };

const NotificationChallengeText = ({ category, id }: NotificationChallengeTextProps) => {
  const { data: challenge, isLoading } = useGetChallengeDetail(Number(id));

  if (isLoading) {
    return <div className="animate-pulse w-full h-5 bg-gray-300 rounded-full" />;
  }

  if (category === 'pre-start') {
    return (
      <div className="line-clamp-2">
        <span className="text-primary-100">{`${challenge.title} 챌린지`}</span>가 내일부터 시작됩니다. <br />
        준비되셨나요?
      </div>
    );
  }

  if (category === 'verification') {
    return (
      <div className="line-clamp-2">
        오늘 아직 <span className="text-primary-100">{`${challenge.title} 챌린지`}</span> 인증을 완료하지 않으셨습니다.
      </div>
    );
  }
};

export default NotificationChallengeText;
