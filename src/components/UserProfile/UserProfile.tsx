'use client';
import { useGetUser } from '@/hooks/auth/useUsers';

const UserProfile = () => {
  const { data: user, error, isLoading } = useGetUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log(user);

  return (
    <div>
      <h1>유저 닉네임~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧ = {user?.nickname ?? `헬린이_${user?.userIndex}`}</h1>
      {/* 다른 사용자 정보 표시 */}
    </div>
  );
};

export default UserProfile;
