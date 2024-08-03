'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import Image from 'next/image';

const UserProfile = () => {
  const { data: user, error, isLoading } = useGetUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex items-center gap-2 h-14 ">
      <div className="relative w-9 h-9 border-white border rounded-full overflow-hidden">
        <Image src={user?.profileURL ?? '/default-profile.png'} alt={'username'} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="text-sm">{user?.nickname}</div>
    </div>
  );
};

export default UserProfile;
