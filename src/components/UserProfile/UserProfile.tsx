'use client';
import NotificationIcon from '@/assets/nav/notification.svg';
import SearchIcon from '@/assets/nav/search.svg';
import { useGetUser } from '@/hooks/auth/useUsers';
import Image from 'next/image';
import IconButton from './ButtonIcon/ButtonIcon';

const UserProfile = () => {
  const { data: user, error, isLoading } = useGetUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex justify-between">
      {/* 다른 사용자 정보 표시 */}
      <div className="flex items-center gap-2 h-14 ">
        <div className="relative w-9 h-9 border-white border rounded-full overflow-hidden">
          <Image
            src={user?.profileURL ?? '/default-profile.png'}
            alt={'username'}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className="text-sm text-white">{user?.nickname}</div>
      </div>
      <div className="flex items-center gap-4">
        <IconButton onClick={() => {}}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={() => {}}>
          <NotificationIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default UserProfile;
