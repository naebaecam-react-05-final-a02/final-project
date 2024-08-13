import NotificationSVG from '@/assets/nav/notification.svg';
import { useModal } from '@/contexts/modal.context/modal.context';
import IconButton from '../IconButton/IconButton';

const NotificationButton = () => {
  const modal = useModal();
  return (
    <IconButton
      onClick={() => {
        modal.alert(['아직 준비중인 기능입니다!']);
      }}
    >
      <NotificationSVG className="cursor-not-allowed" />
    </IconButton>
  );
};

export default NotificationButton;
