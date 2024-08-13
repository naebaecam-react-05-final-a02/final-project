'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { createClient } from '@/supabase/client';
import { Notification, NotificationWithCategory } from '@/types/notification';
import { makeNotificationLink, notificationTypeConverter } from '@/utils/notificationTypeConverter';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import NotificationText from '../../app/(providers)/(root)/notifications/_components/NotificationText';
import NotificationChip from '../NotificationChip';

const ModalNotificationList = ({ notifications }: { notifications: Notification[] }) => {
  const supabase = createClient();
  const router = useRouter();
  const modal = useModal();
  console.log('notifications', notifications);

  const { mutate: updateIsRead } = useMutation({
    mutationFn: async (id: number) => {
      const response = await supabase.from('notifications').update({ isRead: true }).eq('id', id);
      // console.log('update isRead', response);
    },
  });

  const handleRoute = (id: number, notification: NotificationWithCategory, idForURL: string | null) => {
    updateIsRead(id, {
      onSuccess: () => {
        router.push(makeNotificationLink(notification, idForURL));
      },
      onError: () => {
        modal.alert(['알 수 없는 에러 발생']);
      },
    });
  };

  return (
    <ul className="flex flex-col gap-y-2 text-xs flex-1 text-white">
      {notifications.slice(0, 5).map(({ id, type, category, createdAt, idForURL }) => (
        <li
          onClick={() => {
            handleRoute(id, { type, category } as NotificationWithCategory, idForURL);
          }}
          key={id}
          className="flex gap-x-2 items-center border-gradient-noti py-2 cursor-pointer hover:bg-white/5 px-2 rounded"
        >
          <NotificationChip type={notificationTypeConverter(type)} />

          <div className="flex-1 whitespace-normal ">
            <NotificationText notification={{ type, category } as NotificationWithCategory} id={idForURL} />
          </div>
          {/* <div className="flex flex-col text-[10px]">
          <div>{format(createdAt, 'yyyy-MM-dd')}</div>
          <div>{format(createdAt, 'h:mm:ss a')}</div>
        </div> */}
        </li>
      ))}
    </ul>
  );
};

export default ModalNotificationList;
