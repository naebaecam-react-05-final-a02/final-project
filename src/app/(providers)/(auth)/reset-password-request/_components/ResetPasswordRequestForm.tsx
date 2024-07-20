'use client';

import { useRequestPasswordReset } from '@/hooks/auth/useUsers';
import Link from 'next/link';
import { useState } from 'react';

const ResetPasswordRequestForm = () => {
  const [email, setEmail] = useState('');
  const { mutate: requestPasswordReset, isPending, error } = useRequestPasswordReset();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    requestPasswordReset(email, {
      onSuccess: () => {
        alert('비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.');
      },
      onError: (error) => {
        console.error('Password reset request error:', error);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center  ">
      <form onSubmit={handleSubmit} className="p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">비밀번호 재설정 요청</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 text-sm font-medium ">
            이메일
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 "
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{(error as Error).message}</p>}
        <button type="submit" disabled={isPending} className="border border-black py-2 px-4">
          {isPending ? '처리 중...' : '비밀번호 재설정 링크 받기'}
        </button>
      </form>
      <div className="relative mb-4">
        <Link
          className="bg-green-600 w-full rounded-md py-3 px-6 transition-all duration-300 ease-in-out hover:translate-y-1 shadow-md border-b-4 border-black border-opacity-85 relative z-10 inline-block text-white font-semibold"
          href="/"
        >
          홈으로 가기
        </Link>
        <span className={`absolute top-1 left-0 bg-black opacity-80 rounded-md w-full h-full z-0`}></span>
      </div>
    </div>
  );
};

export default ResetPasswordRequestForm;
