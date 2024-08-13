import { NotificationWithCategory } from '@/types/notification';

type NotificationTextProps = {
  notification: NotificationWithCategory;
};
const NotificationText = ({ notification }: NotificationTextProps) => {
  // challenge
  if (notification.category === 'pre-start') {
    return (
      <div>
        <div>
          <span className="text-primary-100">OO챌린지</span>가 내일부터 시작됩니다.
        </div>
      </div>
    );
  }

  if (notification.category === 'verification') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">OO챌린지</span> 인증을 하지 않았어요.
        </div>
      </div>
    );
  }

  // community
  if (notification.category === 'comment') {
    return (
      <div>
        <div>
          게시글에 <span className="text-primary-100">댓글</span>이 달렸습니다.
        </div>
      </div>
    );
  }

  if (notification.category === 'reply') {
    return (
      <div>
        <div>
          게시글에 <span className="text-primary-100">답변</span>이 달렸습니다.
        </div>
      </div>
    );
  }

  if (notification.category === 'following') {
    return (
      <div>
        <div>
          누군가 나를 <span className="text-primary-100">팔로우</span> 하였습니다.
        </div>
      </div>
    );
  }

  // dashboard
  if (notification.category === 'diet') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">식단</span>을 등록하지 않으셨군요!
        </div>
        <div>오늘 먹은 음식을 등록해주세요!</div>
      </div>
    );
  }

  if (notification.category === 'exercise') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">운동</span>을 등록하지 않으셨군요!
        </div>
        <div>오늘의 운동을 등록해주세요!</div>
      </div>
    );
  }

  if (notification.category === 'weight') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">체중</span>을 등록하지 않으셨군요!
        </div>
        <div>오늘 체중을 등록해주세요!</div>
      </div>
    );
  }
};

export default NotificationText;
