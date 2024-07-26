'use client';

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
        <label htmlFor="verify-code" className="block font-semibold text-[18px] mb-1.5">
          인증번호 입력하기
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="verify-code"
            id="verify-code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증 코드"
            className="flex-grow bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
            required
          />
          <button type="submit" className="bg-[#D9D9D9] px-4 py-2 rounded-md" disabled={isVerifying}>
            {isVerifying ? '확인 중...' : '확인'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerifyCodeForm;
