'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import Image from 'next/image';

interface Author {
  profileURL?: string | null;
  nickname?: string | null;
}

interface UserProfileProps {
  className?: string;
  challengeAuthor: Author;
}

const UserProfile = ({ className, challengeAuthor }: UserProfileProps) => {
  const { data: user, error, isLoading } = useGetUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="relative w-5 h-5 border-white border rounded-full overflow-hidden">
        <Image
          src={challengeAuthor?.profileURL ?? '/default-profile.png'}
          alt={challengeAuthor?.nickname ?? 'username'}
          fill
          style={{ objectFit: 'cover' }}
        />
      </div>
      <div className="text-[12px] text-white/70">{challengeAuthor?.nickname}</div>
    </div>
  );
};

export default UserProfile;
