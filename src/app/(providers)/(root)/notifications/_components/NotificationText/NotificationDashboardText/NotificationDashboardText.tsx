import { DashboardNotificationCategory } from '@/types/notification';

type NotificationDashboardTextProps = { category: DashboardNotificationCategory };
const NotificationDashboardText = ({ category }: NotificationDashboardTextProps) => {
  if (category === 'diet') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">식단</span>을 기록하지 않으셨네요!
        </div>
        <div>
          오늘 드신 음식을 기록하고
          <br />
          건강한 하루를 완성해보세요!
        </div>
      </div>
    );
  }

  if (category === 'exercise') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">운동</span>을 기록하지 않으셨네요!
        </div>
        <div>
          오늘 하신 운동을 기록하고
          <br />
          활기찬 하루를 완성해보세요!
        </div>
      </div>
    );
  }

  if (category === 'weight') {
    return (
      <div>
        <div>
          오늘 아직 <span className="text-primary-100">체중</span>을 기록하지 않으셨네요!
        </div>
        <div>
          오늘의 체중을 기록하고
          <br />
          건강 목표를 관리해보세요!
        </div>
      </div>
    );
  }
};

export default NotificationDashboardText;
