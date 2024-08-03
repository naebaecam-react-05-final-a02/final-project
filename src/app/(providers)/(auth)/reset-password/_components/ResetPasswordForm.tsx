'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useResetPassword } from '@/hooks/auth/useUsers';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { validatePassword } from '../../_utils/validatePassword';

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
        <Input
          label="새 비밀번호"
          name="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          error={passwordError}
          required
        />
      </div>
      <div className="mb-4">
        <Input
          label="새 비밀번호 확인"
          name="confirm-password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          error={confirmPasswordError}
          required
        />
      </div>

      <Button type="submit" disabled={isResetting || !!passwordError || !!confirmPasswordError}>
        {isResetting ? '변경 중...' : '비밀번호 변경'}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;
