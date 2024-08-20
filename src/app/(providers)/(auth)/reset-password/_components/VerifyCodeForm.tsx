'use client';

import Button from '@/components/Button';
import Input from '@/components/Input';
import { useVerifyResetCode } from '@/hooks/auth/useUsers';
import { useState } from 'react';

interface VerifyCodeFormProps {
  email: string;
  onSuccess: (email: string) => void;
  setError: (error: string | null) => void;
}

const VerifyCodeForm = ({ email, onSuccess, setError }: VerifyCodeFormProps) => {
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { mutate: verifyCode, isPending: isVerifying } = useVerifyResetCode();

  const handleVerifyCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    verifyCode(
      { email, code },
      {
        onSuccess: () => {
          setSuccessMessage('인증 되었습니다!');
          onSuccess(email);
        },
        onError: (error) => {
          const message = error instanceof Error ? error.message : '오류가 발생했습니다.';
          setErrorMessage(`인증번호가 틀렸습니다!`);
          setError(`인증 실패: ${message}`);
        },
      },
    );
  };

  return (
    <form onSubmit={handleVerifyCode}>
      <div className="mb-4">
        <div className="flex gap-2">
          <div className={`flex w-full gap-2 ${errorMessage ? 'items-center' : 'items-end'}`}>
            <Input
              label="인증번호"
              name="verify-code"
              type="password"
              value={code}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCode(e.target.value)}
              placeholder="인증 코드"
              error={errorMessage}
              required
            />

            <Button type="submit" className="!w-16 h-10 text-nowrap px-2 py-3.5" disabled={isVerifying}>
              {isVerifying ? '요청 중...' : '확인'}
            </Button>
          </div>
        </div>
      </div>
      {successMessage && <div className="text-primary-100 text-sm mt-1 ml-1">{successMessage}</div>}
    </form>
  );
};

export default VerifyCodeForm;
