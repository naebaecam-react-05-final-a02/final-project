'use client';

import { useResetPassword } from '@/hooks/auth/useUsers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { validatePassword } from '../../_utils/passwordValidation';

interface ResetPasswordFormProps {
  email: string;
  setError: (error: string | null) => void;
}

const ResetPasswordForm = ({ email, setError }: ResetPasswordFormProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();
  const router = useRouter();

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);
    const error = validatePassword(value);
    setPasswordError(error);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== newPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (passwordError) {
      setError(passwordError);
      return;
    }
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
          onChange={handleNewPasswordChange}
          className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
          required
        />
        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="confirm-password" className="block font-semibold text-[18px] mb-1.5">
          새 비밀번호 확인
        </label>
        <input
          type="password"
          id="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          className="w-full bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
          required
        />
        {confirmPasswordError && <p className="text-red-500 text-sm mt-1">{confirmPasswordError}</p>}
      </div>
      <button
        type="submit"
        className="bg-[#D9D9D9] px-4 py-2 rounded-md w-full"
        disabled={isResetting || !!passwordError || !!confirmPasswordError}
      >
        {isResetting ? '변경 중...' : '비밀번호 변경'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
