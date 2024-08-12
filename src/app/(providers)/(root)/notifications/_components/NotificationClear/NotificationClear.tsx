'use client';

import GlassButton from '@/components/ButtonIcon/GlassButton';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useGetUser } from '@/hooks/auth/useUsers';
import { queryClient } from '@/providers/QueryProvider';
import { createClient } from '@/supabase/client';
import { useMutation } from '@tanstack/react-query';
import { HiOutlineTrash } from 'react-icons/hi';

const NotificationClear = () => {
  const { data: user } = useGetUser();
  const modal = useModal();
  const supabase = createClient();

  const { mutate: notificationClear } = useMutation({
    mutationFn: async () => {
      const response = await supabase
        .from('notifications')
        .update({ isRead: true })
        .order('createdAt', { ascending: false })
        .limit(50)
        .match({ targetUserId: user?.id, isRead: false });
      console.log('response___', response);
    },
    onSuccess: () => {
      console.log('SUCCESS___');
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
  const handleClear = async () => {
    console.log('CLEAR___');
    const yes = await modal.confirm(['전체 알림을 삭제하시겠습니까?']);
    if (!yes) return null;

    await modal.alert(['전체 알림이 삭제 되었습니다.']);
    notificationClear();
  };

  return (
    <div className="hover:cursor-pointer" onClick={handleClear}>
      <GlassButton>
        <div className="text-2xl">
          <HiOutlineTrash />
        </div>
      </GlassButton>
    </div>
  );
};

export default NotificationClear;
