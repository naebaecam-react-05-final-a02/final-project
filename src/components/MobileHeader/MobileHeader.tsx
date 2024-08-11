'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { queryClient } from '@/providers/QueryProvider';
import { createClient } from '@/supabase/client';
import React, { useEffect } from 'react';
import NotificationButton from '../ButtonIcon/NotificationButton';
import UserProfile from '../UserProfile/UserProfile';

const DefaultHeader = () => {
  const { data: user } = useGetUser();

  useEffect(() => {
    if (!user) return;

    const supabase = createClient();
    const channels = supabase
      .channel('alarm')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'alarm', filter: `targetUserId=eq.${user.id}` },
        (payload) => {
          console.log('PAYLOAD___', payload);
          queryClient.invalidateQueries({ queryKey: ['alarm'] });
        },
      )
      .subscribe((status) => {
        console.log('STATUS___', status);
      });
    return () => {
      channels.unsubscribe();
    };
  }, [user]);

  return (
    <div className="flex justify-between header-gradient">
      {/* 다른 사용자 정보 표시 */}
      <UserProfile />
      <div className="flex items-center gap-4">
        <NotificationButton />
      </div>
    </div>
  );
};

export default React.memo(DefaultHeader);
