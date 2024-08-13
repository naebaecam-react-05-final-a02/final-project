import { DashboardNotificationCategory } from '@/types/notification';

type NotificationDashboardTextProps = { category: DashboardNotificationCategory };
const NotificationDashboardText = ({ category }: NotificationDashboardTextProps) => {
  if (category === 'diet') {
    return (
      <div>
        <div>
          오늘은 아직 <span className="text-primary-100">식단</span>을 등록하지 않으셨군요!
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
        <div>오늘 한 운동을 등록해주세요!</div>
      </div>
    );
  }

  if (category === 'weight') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">체중</span>을 등록하지 않으셨군요!
        </div>
        <div>오늘의 체중을 등록해주세요!</div>
      </div>
    );
  }
};

export default NotificationDashboardText;
