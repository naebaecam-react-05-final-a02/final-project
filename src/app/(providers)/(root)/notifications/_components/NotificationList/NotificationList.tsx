'use client';

import NotificationText from '@/app/(providers)/(root)/notifications/_components/NotificationText';
import Loading from '@/components/Loading/Loading';
import NotificationChip from '@/components/NotificationChip';
import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import { NotificationWithCategory } from '@/types/notification';
import { Tables } from '@/types/supabase';
import { notificationTypeConverter } from '@/utils/notificationTypeConverter';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const NotificationList = () => {
  const supabase = createClient();
  const { data: user } = useGetUser();

  const {
    data: notifications,
    error,
    isPending,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await supabase
        .from('notifications')
        .select('*')
        .order('createdAt', { ascending: false })
        .limit(50)
        .match({ targetUserId: user?.id, isRead: false })
        .returns<Tables<'notifications'>[]>();

      return response.data;
    },
    enabled: !!user,
  });

  if (isPending) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-red-300">알림을 가져오는 동안 에러가 발생했습니다.</div>;
  }

  if (notifications && !notifications.length) {
    return <div className="text-base w-full text-center mt-14">도착한 알림이 없습니다!</div>;
  }

  return (
    <>
      <h6 className="text-white/70 text-xs">최근 50개의 알람까지 보여집니다.</h6>
      <ul className="flex flex-col gap-y-6">
        {notifications?.map(({ id, type, createdAt, category }) => (
          <li key={id} className="flex gap-x-7">
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
                <NotificationText notification={{ type, category } as NotificationWithCategory} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default NotificationList;
