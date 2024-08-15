'use client';

import GlassButton from '@/components/ButtonIcon/GlassButton';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useNotificationsIsRead } from '@/hooks/notifications/useNotifications';
import { HiOutlineTrash } from 'react-icons/hi';

const NotificationClear = () => {
  const modal = useModal();

  const { mutate: notificationsIsRead } = useNotificationsIsRead();

  const handleClear = async () => {
    const yes = await modal.confirm(['전체 알림을 삭제하시겠습니까?']);
    if (!yes) return null;

    notificationsIsRead(undefined, {
      onSuccess: async () => {
        await modal.alert(['전체 알림이 삭제 되었습니다.']);
      },
    });
  };

  return (
    <div className="hover:cursor-pointer" onClick={handleClear}>
      <GlassButton>
        <div className="text-2xl">
          <HiOutlineTrash />
        </div>
      </GlassButton>
    </div>
  );
};

export default NotificationClear;
