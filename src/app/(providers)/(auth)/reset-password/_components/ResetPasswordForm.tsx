'use client';

import { useResetPassword } from '@/hooks/auth/useUsers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ResetPasswordFormProps {
  email: string;
  setError: (error: string | null) => void;
}

const ResetPasswordForm = ({ email, setError }: ResetPasswordFormProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    resetPassword(
      { newPassword },
      {
        onSuccess: () => {
          alert('비밀번호가 성공적으로 변경되었습니다.');
          router.push('/');
        },
        onError: (error) => {
          setError(error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다.');
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="mb-4">
        <label htmlFor="new-password" className="block font-semibold text-[18px] mb-1.5">
          새 비밀번호
        </label>
        <input
          type="password"
          id="new-password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="confirm-password" className="block font-semibold text-[18px] mb-1.5">
          새 비밀번호 확인
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
          required
        />
      </div>
      <button type="submit" className="bg-[#D9D9D9] px-4 py-2 rounded-md w-full" disabled={isResetting}>
        {isResetting ? '변경 중...' : '비밀번호 변경'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
