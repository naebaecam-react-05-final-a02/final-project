import NotificationSVG from '@/assets/nav/notification.svg';
import IconButton from '../IconButton/IconButton';

const NotificationButton = () => {
  return (
    <IconButton onClick={() => {}}>
      <NotificationSVG className="cursor-not-allowed" />
    </IconButton>
  );
};

export default NotificationButton;
