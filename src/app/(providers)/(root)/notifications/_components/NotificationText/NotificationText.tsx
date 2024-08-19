import { NotificationWithCategory } from '@/types/notification';
import NotificationChallengeText from './NotificationChallengeText';
import NotificationDashboardText from './NotificationDashboardText';

type NotificationTextProps = {
  notification: NotificationWithCategory;
  id: string | null;
};
const NotificationText = ({ notification, id }: NotificationTextProps) => {
  // challenge
  if (notification.type === 'challenge') {
    return <NotificationChallengeText category={notification.category} id={id!} />;
  }

  // community
  if (notification.category === 'comment') {
    return (
      <div>
        <div>
          새로운 <span className="text-primary-100">댓글</span>이 달렸습니다.
        </div>
      </div>
    );
  }

  if (notification.category === 'reply') {
    return (
      <div>
        <div>
          새로운 <span className="text-primary-100">답변</span>이 등록되었습니다.
        </div>
      </div>
    );
  }

  if (notification.category === 'following') {
    return (
      <div>
        <div>
          누군가 당신을 <span className="text-primary-100">팔로우</span> 했습니다.
        </div>
      </div>
    );
  }

  // dashboard
  if (notification.type === 'dashboard') {
    return <NotificationDashboardText category={notification.category} />;
  }
};

export default NotificationText;
