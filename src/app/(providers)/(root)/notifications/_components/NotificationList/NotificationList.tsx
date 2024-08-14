'use client';

import NotificationText from '@/app/(providers)/(root)/notifications/_components/NotificationText';
import Loading from '@/components/Loading/Loading';
import NotificationChip from '@/components/NotificationChip';
import { useGetNotifications, useNotificationIsRead } from '@/hooks/notifications/useNotifications';
import { createClient } from '@/supabase/client';
import { NotificationWithCategory } from '@/types/notification';
import { makeNotificationLink, notificationTypeConverter } from '@/utils/notificationTypeConverter';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { useRouter } from 'next/navigation';

dayjs.locale('ko');

const NotificationList = () => {
  const supabase = createClient();
  const router = useRouter();
  const { mutate: notificationIsRead } = useNotificationIsRead();

  const { data: notifications, error, isLoading, isPending } = useGetNotifications(supabase);

  if (isLoading || isPending) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-300">알림을 가져오는 동안 에러가 발생했습니다.</div>;
  }

  if (notifications && !notifications.length) {
    return <div className="text-base w-full text-center mt-14">도착한 알림이 없습니다!</div>;
  }

  const handleRoute = async (nid: number, notification: NotificationWithCategory, idForURL: string | null) => {
    notificationIsRead(nid);
    router.push(makeNotificationLink(notification, idForURL));
  };
  // router.push(makeNotificationLink(notification, idForURL));
  return (
    <>
      <h6 className="text-white/70 text-xs">최근 50개의 알람까지 보여집니다.</h6>
      <ul className="flex flex-col gap-y-6">
        {notifications?.map(({ id, type, createdAt, category, idForURL }) => (
          <li
            onClick={() => {
              handleRoute(id, { type, category } as NotificationWithCategory, idForURL);
            }}
            key={id}
            className="select-none flex gap-x-7 cursor-pointer hover:bg-white/5 p-2 rounded"
          >
            <div className="flex flex-col items-center gap-y-2 pt-[10px]">
              <div className="rounded-full bg-white/10 size-[7px]" />
              <div className="bg-white/10 w-px h-12" />
            </div>
            <div className="w-full pb-[10px] flex flex-col gap-y-2">
              <div className="flex w-full">
                <div className="flex-1">
                  <NotificationChip type={notificationTypeConverter(type)} />
                </div>
                <div className="text-white/50 text-xs">{dayjs(createdAt).format('YYYY.MM.DD A hh:mm')}</div>
              </div>
              <div className="text-xs">
                <NotificationText notification={{ type, category } as NotificationWithCategory} id={idForURL} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotificationList;
