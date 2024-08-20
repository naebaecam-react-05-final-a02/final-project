'use client';

import { useNotificationIsRead } from '@/hooks/notifications/useNotifications';
import { Notification, NotificationWithCategory } from '@/types/notification';
import { makeNotificationLink, notificationTypeConverter } from '@/utils/notificationTypeConverter';
import { useRouter } from 'next/navigation';
import NotificationText from '../../app/(providers)/(root)/notifications/_components/NotificationText';
import NotificationChip from '../NotificationChip';

const ModalNotificationList = ({ notifications }: { notifications: Notification[] }) => {
  const router = useRouter();
  const { mutate: notificationIsRead } = useNotificationIsRead();

  const handleRoute = async (nid: number, notification: NotificationWithCategory, idForURL: string | null) => {
    await notificationIsRead(nid);
    router.push(makeNotificationLink(notification, idForURL));
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
