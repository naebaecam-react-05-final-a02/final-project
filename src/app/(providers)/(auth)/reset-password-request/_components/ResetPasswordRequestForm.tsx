'use client';

import { useRequestPasswordReset } from '@/hooks/auth/useUsers';
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
    <div className="flex justify-center items-center  ">
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
    </div>
  );
};

export default ResetPasswordRequestForm;
