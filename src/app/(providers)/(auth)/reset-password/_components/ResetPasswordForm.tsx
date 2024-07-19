'use client';

import { useResetPassword } from '@/hooks/auth/useUsers';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('code');
  const { mutate: resetPassword, isPending, error } = useResetPassword();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    const token = searchParams.get('code');
    if (!token) {
      alert('유효하지 않은 비밀번호 재설정 링크입니다.');
      return;
    }

    resetPassword(
      { newPassword, token },
      {
        onSuccess: () => {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          router.push('/login');
        },
        onError: (error) => {
          console.error('Password reset error:', error);
          alert(error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다.');
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-black">
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="새 비밀번호"
        className="px-2 py-1.5 border border-black"
        required
      />
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="새 비밀번호 확인"
        className="px-2 py-1.5 border border-black"
        required
      />
      <button type="submit" disabled={isPending} className="px-2 py-1.5 border border-black">
        {isPending ? '처리 중...' : '비밀번호 변경'}
      </button>
      {error && <p className="text-red-500">에러: {error instanceof Error ? error.message : '알 수 없는 오류'}</p>}
    </form>
  );
};

export default ResetPasswordForm;
