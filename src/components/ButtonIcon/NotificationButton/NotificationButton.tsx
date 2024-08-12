'use client';
import NotificationSVG from '@/assets/nav/notification.svg';
import ModalPortalLayout from '@/components/ModalPortal/ModalPortalLayout';
import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { NotificationTypeConverter } from '@/utils/notificationTypeConverter';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import { TiCancel } from 'react-icons/ti';
import IconButton from '../IconButton/IconButton';
import AlarmText from './NotificationText';

const NotificationButton = () => {
  const { data: user } = useGetUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const supabase = createClient();

  const { data: notifications, error } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const response = await supabase
        .from('notifications')
        .select('*')
        .match({ targetUserId: user?.id, isRead: false })
        .order('createdAt', { ascending: false })
        .returns<Tables<'notifications'>[]>();
      return response.data;
    },
    enabled: !!user,
  });

  console.log('NOTIFICATIONS___', notifications);

  if (error) {
    return (
      <div className="relative select-none cursor-not-allowed">
        <div className="absolute  size-full z-10 text-red-500 text-lg flex flex-col items-center justify-between">
          <TiCancel />
          <span className="text-sm font-bold">ERROR</span>
        </div>
        <IconButton onClick={() => setIsOpen(true)}>
          <NotificationSVG className="cursor-not-allowed" />
        </IconButton>
      </div>
    );
  }

  return (
    <>
      <div className="relative select-none">
        {isOpen && (
          <ModalPortalLayout onClose={() => setIsOpen(false)}>
            <div
              className="fixed top-14 right-4 w-[80%] h-[450px] rounded-3xl border-primary-100 border-2 p-4 
        flex flex-col gap-y-5  z-50 backdrop-blur-sm select-none "
            >
              <h6 className="text-md text-gray-300">
                새로운 알림 <span className="text-primary-100 ">{notifications?.length ?? 0}</span>개
              </h6>
              {notifications && !notifications.length && (
                <div className="flex-1 font-bold text-lg text-white">새로운 알림이 없습니다!</div>
              )}
              {notifications && notifications.length > 0 && (
                <ul className="flex flex-col gap-y-7 text-xs flex-1 text-white">
                  {notifications.slice(0, 5).map(({ id, type, category, createdAt }) => (
                    <li key={id} className="flex gap-x-4 items-center py-1">
                      <div className="w-16 border-primary-100 text-primary-100 p-2 py-1 rounded border-2 flex items-center justify-center">
                        {NotificationTypeConverter(type)}
                      </div>
                      <div className="flex-1 whitespace-normal ">
                        <AlarmText type={type} category={category} />
                      </div>
                      <div className="flex flex-col text-[10px]">
                        <div>{format(createdAt, 'yyyy-MM-dd')}</div>
                        <div>{format(createdAt, 'h:mm:ss a')}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <Link
                href={'/notifications'}
                className="w-full py-2 text-center bg-primary-10 rounded-lg border-gray-300 border-[1px] text-sm
          text-primary-100"
              >
                알림 더 보기
              </Link>
            </div>
          </ModalPortalLayout>
        )}
        {notifications && notifications?.length > 0 && (
          <div className="absolute rounded-full size-[6px] bg-primary-100 top-2 right-2 z-10" />
        )}
        <IconButton onClick={() => setIsOpen(true)}>
          <NotificationSVG className="cursor-not-allowed" />
        </IconButton>
      </div>
    </>
  );
};

export default NotificationButton;
