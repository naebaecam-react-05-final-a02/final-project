'use client';
import NotificationSVG from '@/assets/nav/notification.svg';
import ModalNotifications from '@/components/ModalNotifications';
import { useGetUser } from '@/hooks/auth/useUsers';
import { useGetNotifications } from '@/hooks/notifications/useNotifications';
import { queryClient } from '@/providers/QueryProvider';
import { createClient } from '@/supabase/client';
import { useEffect, useState } from 'react';
import { TiCancel } from 'react-icons/ti';
import IconButton from '../IconButton/IconButton';

const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const supabase = createClient();

  const { data: notifications, error } = useGetNotifications(supabase);
  const { data: user } = useGetUser();

  useEffect(() => {
    if (!user) return;

    const channels = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications', filter: `targetUserId=eq.${user.id}` },
        (payload) => {
          // console.log('PAYLOAD___', payload);
          queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
      )
      .subscribe((status) => {
        // console.log('STATUS___', status);
      });
    return () => {
      channels.unsubscribe();
    };
  }, [user, supabase]);

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
          <>
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-10" onClick={() => setIsOpen(false)} />
            <ModalNotifications notifications={notifications} onClose={() => setIsOpen(false)} />
          </>
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
