'use client';

import Input from '@/components/Input';
import { useDeleteAccount, useSignOut } from '@/hooks/auth/useUsers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaBeer, FaStarHalf } from 'react-icons/fa';

const AuthTestForm = () => {
  const router = useRouter();

  const { mutate: logout } = useSignOut({
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
    },
  });

  const { mutate: deleteAccount } = useDeleteAccount({
    onSuccess: () => {
      router.push('/login');
    },
    onError: (error) => {
      console.error('Account deletion failed:', error);
    },
  });

  return (
    <div className="w-full bg-black/70 min-h-screen !bg-[url('/background.png') p-8 rounded-lg shadow-xl">
      <Input icon={<FaBeer />} label="뭔데" />
      <Input label="드랍다운" isDropdown dropdownOptions={['테스트 1', '테스트 2', '테스트 3']} />
      <Input
        label="드랍다운2"
        icon={<FaStarHalf />}
        isDropdown
        dropdownOptions={['테스트 1', '테스트 2', '테스트 3']}
      />
      <Input label="뭔데" />
      <h1 className="text-2xl font-bold mb-6 text-center">메뉴 선택</h1>
      <div className="relative mb-4">
        <Link
          className="bg-green-600 w-full rounded-md py-3 px-6 transition-all duration-300 ease-in-out hover:translate-y-1 shadow-md border-b-4 border-black border-opacity-85 relative z-10 inline-block text-white font-semibold"
          href="/"
        >
          홈으로 가기
        </Link>
        <span className={`absolute top-1 left-0 bg-black opacity-80 rounded-md w-full h-full z-0`}></span>
      </div>
      <div className="relative mb-4">
        <button
          onClick={() => logout()}
          className="bg-red-600 w-full rounded-md py-3 px-6 transition-all duration-300 ease-in-out hover:translate-y-1 shadow-md border-b-4 border-black border-opacity-85 relative z-10 inline-block text-white font-semibold"
        >
          로그아웃
        </button>
        <span className={`absolute top-1 left-0 bg-black opacity-80 rounded-md w-full h-full z-0`}></span>
      </div>
      <div className="relative mb-4">
        <button
          onClick={() => deleteAccount()}
          className="bg-blue-600 w-full rounded-md py-3 px-6 transition-all duration-300 ease-in-out hover:translate-y-1 shadow-md border-b-4 border-black border-opacity-85 relative z-10 inline-block text-white font-semibold"
        >
          회원탈퇴
        </button>
        <span className={`absolute top-1 left-0 bg-black opacity-80 rounded-md w-full h-full z-0`}></span>
      </div>
    </div>
  );
};

export default AuthTestForm;
