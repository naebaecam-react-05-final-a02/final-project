'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import Mobile from '@/layouts/Mobile';

const MyPage = () => {
  const { data, isPending } = useGetUser();
  console.log(data);

  if (isPending) return <div>Loading...</div>;
  return <Mobile>page</Mobile>;
};

export default MyPage;
