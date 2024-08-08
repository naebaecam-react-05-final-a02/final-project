import NotificationSVG from '@/assets/nav/notification.svg';
import IconButton from '../IconButton/IconButton';

const NotificationButton = () => {
  return (
    <IconButton
      onClick={() => {
        alert('아직 준비중인 기능입니다!');
      }}
    >
      <NotificationSVG className="cursor-not-allowed" />
    </IconButton>
  );
};

export default NotificationButton;
