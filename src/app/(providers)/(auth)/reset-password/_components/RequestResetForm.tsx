'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRequestPasswordReset } from '@/hooks/auth/useUsers';
import { useState } from 'react';
import VerifyCodeForm from './VerifyCodeForm';

interface RequestResetFormProps {
  onSuccess: (email: string) => void;
  setError: (error: string | null) => void;
}

const RequestResetForm = ({ onSuccess, setError }: RequestResetFormProps) => {
  const [email, setEmail] = useState('');

  const { mutate: requestPasswordReset, isPending: isRequesting } = useRequestPasswordReset();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    requestPasswordReset(email, {
      onSuccess: () => {
        alert('비밀번호 재설정 코드가 이메일로 전송되었습니다. 이메일을 확인해주세요.');
      },
      onError: (error) => {
        console.error('Password reset request error:', error);
        setError(error instanceof Error ? error.message : '오류가 발생했습니다.');
      },
    });
  };

  const handleVerifySuccess = () => {
    onSuccess(email);
  };

  return (
    <div className="w-full h-full">
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-4">
        <div className="w-full mb-4">
          <div className="flex items-end w-full gap-2">
            <Input
              label="이메일"
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              required
            />
            <Button type="submit" className="!w-16 h-10 text-nowrap px-2 py-3.5" disabled={isRequesting}>
              {isRequesting ? '요청 중...' : '인증'}
            </Button>
          </div>
        </div>
      </form>
      <VerifyCodeForm email={email} onSuccess={handleVerifySuccess} setError={setError} />
    </div>
  );
};

export default RequestResetForm;
