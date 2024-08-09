'use client';
import NotificationSVG from '@/assets/nav/notification.svg';
import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import { useQuery } from '@tanstack/react-query';
import IconButton from '../IconButton/IconButton';

const NotificationButton = () => {
  const { data: user } = useGetUser();
  const supabase = createClient();
  const { data: alarm, error } = useQuery({
    queryKey: ['alarm'],
    queryFn: async () => {
      const response = await supabase.from('alarm').select('*').eq('targetUserId', user?.id).order('createdAt');
      return response.data;
    },
    enabled: !!user,
  });

  console.log('ALARM___', alarm);

  return (
    <div className="relative select-none">
      {alarm && alarm?.length > 0 && (
        <div
          className="absolute rounded-full size-4 bg-red-500 text-white text-[10px] 
        flex items-center justify-center
      -top-1 -right-1 z-10"
        >
          {true ? alarm.length : '+9'}
        </div>
      )}
      <IconButton
        onClick={() => {
          alert('아직 준비중인 기능입니다!');
        }}
      >
        <NotificationSVG className="cursor-not-allowed" />
      </IconButton>
    </div>
  );
};

export default NotificationButton;
