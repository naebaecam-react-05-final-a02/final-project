'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import Image from 'next/image';

interface UserProfileProps {
  className?: string;
}

const UserProfile = ({ className }: UserProfileProps) => {
  const { data: user, error, isLoading } = useGetUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="relative w-[18px] h-[18px] border-white border rounded-full overflow-hidden">
        <Image src={user?.profileURL ?? '/default-profile.png'} alt={'username'} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="text-[12px] text-white/70">{user?.nickname}</div>
    </div>
  );
};

export default UserProfile;
