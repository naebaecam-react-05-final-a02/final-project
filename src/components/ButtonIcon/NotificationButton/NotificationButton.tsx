'use client';
import NotificationSVG from '@/assets/nav/notification.svg';
import ModalNotifications from '@/components/ModalNotifications';
import ModalPortalLayout from '@/components/ModalPortal/ModalPortalLayout';
import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { TiCancel } from 'react-icons/ti';
import IconButton from '../IconButton/IconButton';

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

  // console.log('NOTIFICATIONS___', notifications);

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
            <ModalNotifications notifications={notifications} onClose={() => setIsOpen(false)} />
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
