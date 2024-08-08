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
    <div className="flex items-center gap-2 h-14 ">
      <div className="relative w-9 h-9 border-white border rounded-full">
        <Image
          src={user?.profileURL ?? '/user/default-avatar.png'}
          alt={'username'}
          fill
          sizes="100"
          className="object-cover rounded-full"
        />
      </div>
      <div className="text-sm">{user?.nickname ?? `헬린이_${user?.userIndex}`}</div>
    </div>
  );
};

export default UserProfile;
