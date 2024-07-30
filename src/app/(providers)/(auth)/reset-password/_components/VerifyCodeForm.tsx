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
  const { mutate: verifyCode, isPending: isVerifying } = useVerifyResetCode();

  const handleVerifyCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verifyCode(
      { email, code },
      {
        onSuccess: () => {
          alert('인증 성공! 새 비밀번호를 설정해주세요.');
          onSuccess(email);
        },
        onError: (error) => {
          setError(`인증 실패: ${error instanceof Error ? error.message : '오류가 발생했습니다.'}`);
        },
      },
    );
  };

  return (
    <form onSubmit={handleVerifyCode}>
      <div className="mb-4">
        <div className="flex gap-2">
          <div className="flex items-end w-full gap-2">
            <Input
              label="인증번호 입력"
              name="verify-code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="인증 코드"
              required
            />

            <Button type="submit" className="w-16 h-10 text-nowrap px-2 py-3.5" disabled={isVerifying}>
              {isVerifying ? '요청 중...' : '인증'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default VerifyCodeForm;
