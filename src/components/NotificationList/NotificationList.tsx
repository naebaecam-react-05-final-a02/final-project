import { Tables } from '@/types/supabase';
import { NotificationTypeConverter } from '@/utils/notificationTypeConverter';
import NotificationText from '../ButtonIcon/NotificationButton/NotificationText';

const NotificationList = ({ notifications }: { notifications: Tables<'notifications'>[] }) => {
  return (
    <ul className="flex flex-col gap-y-2 text-xs flex-1 text-white">
      {notifications.slice(0, 5).map(({ id, type, category, createdAt }) => (
        <li key={id} className="border-gradient-noti flex gap-x-2 items-center py-2">
          <div className="w-16 border-primary-100 text-primary-100 p-2 py-1 rounded border-2 flex items-center justify-center">
            {NotificationTypeConverter(type)}
          </div>
          <div className="flex-1 whitespace-normal ">
            <NotificationText type={type} category={category} />
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

export default NotificationList;
