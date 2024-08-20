'use client';

import Button from '@/components/Button';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useResetPassword } from '@/hooks/auth/useUsers';
import { useRouter } from 'next/navigation';
import { FormEvent, MouseEvent, useState } from 'react';
import PasswordField from '../../_components/PasswordField';
import { validatePassword } from '../../_utils/validatePassword';

interface ResetPasswordFormProps {
  email: string;
  setError: (error: string | null) => void;
}

const ResetPasswordForm = ({ setError }: ResetPasswordFormProps) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();
  const router = useRouter();
  const modal = useModal();

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

  const handleSubmit = (e: MouseEvent<HTMLButtonElement> | FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (passwordError) {
      setError(passwordError);
      return;
    }
    resetPassword(
      { newPassword },
      {
        onSuccess: () => {
          modal.alert(['비밀번호가 성공적으로 변경되었습니다.']);
          router.push('/');
        },
        onError: (error) => {
          setError(error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div className="flex flex-col w-full h-full justify-between md:min-h-[700px] ">
      <div>
        <h2 className="text-18 font-semibold mb-6 text-white">새로운 비밀번호를 설정해 주세요!</h2>
        <form className="flex flex-col gap-4">
          <PasswordField value={newPassword} onChange={handleNewPasswordChange} error={passwordError} />
          <PasswordField
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={confirmPasswordError}
            isConfirmPassword
          />
        </form>
      </div>
      <Button
        onClick={handleSubmit}
        type="submit"
        className="mb-10"
        disabled={isResetting || !!passwordError || !!confirmPasswordError}
      >
        {isResetting ? '변경 중...' : '확인'}
      </Button>
    </div>
  );
};

export default ResetPasswordForm;
