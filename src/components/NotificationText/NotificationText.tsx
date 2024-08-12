type NotificationTextProps = {
  type?: string;
  category: string;
};

const NotificationText = ({ type, category }: NotificationTextProps) => {
  // challenge
  if (category === 'pre-start') {
    return (
      <div>
        <div>
          <span className="text-primary-100">OO챌린지</span>가 내일부터 시작됩니다.
        </div>
      </div>
    );
  }

  if (category === 'verification') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">OO챌린지</span> 인증을 하지 않았어요.
        </div>
      </div>
    );
  }

  // community
  if (category === 'comment') {
    return (
      <div>
        <div>
          게시글에 <span className="text-primary-100">댓글</span>이 달렸습니다.
        </div>
      </div>
    );
  }

  if (category === 'reply') {
    return (
      <div>
        <div>
          게시글에 <span className="text-primary-100">답변</span>이 달렸습니다.
        </div>
      </div>
    );
  }

  if (category === 'following') {
    return (
      <div>
        <div>
          누군가 나를 <span className="text-primary-100">팔로우</span> 하였습니다.
        </div>
      </div>
    );
  }

  // dashboard
  if (category === 'diet') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">식단</span>을 등록하지 않으셨군요!
        </div>
        <div>오늘 먹은 음식을 등록해주세요!</div>
      </div>
    );
  }

  if (category === 'exercise') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">운동</span>을 등록하지 않으셨군요!
        </div>
        <div>오늘의 운동을 등록해주세요!</div>
      </div>
    );
  }

  if (category === 'weight') {
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
