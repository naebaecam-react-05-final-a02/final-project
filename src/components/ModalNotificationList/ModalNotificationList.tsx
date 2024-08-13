import { makeNotificationLink, notificationTypeConverter } from '@/utils/notificationTypeConverter';

import { Notification, NotificationWithCategory } from '@/types/notification';
import Link from 'next/link';
import NotificationText from '../../app/(providers)/(root)/notifications/_components/NotificationText';
import NotificationChip from '../NotificationChip';

const ModalNotificationList = ({ notifications }: { notifications: Notification[] }) => {
  console.log('notifications', notifications);

  return (
    <ul className="flex flex-col gap-y-2 text-xs flex-1 text-white">
      {notifications.slice(0, 5).map(({ id, type, category, createdAt, idForURL }) => (
        <li key={id} className="border-gradient-noti py-2 cursor-pointer hover:bg-white/5 px-2 rounded">
          <Link
            className="flex gap-x-2 items-center "
            href={makeNotificationLink({ type, category } as NotificationWithCategory, idForURL)}
          >
            <NotificationChip type={notificationTypeConverter(type)} />

            <div className="flex-1 whitespace-normal ">
              <NotificationText notification={{ type, category } as NotificationWithCategory} />
            </div>
            {/* <div className="flex flex-col text-[10px]">
          <div>{format(createdAt, 'yyyy-MM-dd')}</div>
          <div>{format(createdAt, 'h:mm:ss a')}</div>
        </div> */}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ModalNotificationList;
