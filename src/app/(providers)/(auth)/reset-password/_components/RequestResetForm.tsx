'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useRequestPasswordReset } from '@/hooks/auth/useUsers';
import { useEffect, useState } from 'react';
import VerifyCodeForm from './VerifyCodeForm';

interface RequestResetFormProps {
  onSuccess: (email: string) => void;
  setError: (error: string | null) => void;
}

const RequestResetForm = ({ onSuccess, setError }: RequestResetFormProps) => {
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const { mutate: requestPasswordReset, isPending: isRequesting } = useRequestPasswordReset();

  useEffect(() => {
    if (timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((time) => time - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    requestPasswordReset(email, {
      onSuccess: () => {
        setTimeLeft(180);
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full">
      <h2 className="text-18 font-semibold mb-6">가입에 사용하신 이메일을 입력해주세요!</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-4">
        <div className="w-full mb-4">
          <div className="flex items-end w-full gap-2">
            <Input
              label="이메일"
              name="email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              autoComplete="email"
              required
            />
            <Button
              type="submit"
              className={`!w-16 h-10 text-nowrap px-2 py-3.5 ${timeLeft > 0 ? 'bg-button-hover-gradient' : ''}`}
              disabled={isRequesting || timeLeft > 0}
            >
              {isRequesting ? '요청 중...' : timeLeft > 0 ? formatTime(timeLeft) : '인증'}
            </Button>
          </div>
        </div>
      </form>
      <VerifyCodeForm email={email} onSuccess={handleVerifySuccess} setError={setError} />
    </div>
  );
};

export default RequestResetForm;
