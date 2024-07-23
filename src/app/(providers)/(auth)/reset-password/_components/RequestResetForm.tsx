'use client';

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
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-md mb-4">
        <div className="mb-4">
          <label htmlFor="email" className="block font-semibold text-[18px] mb-1.5">
            이메일
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              className="flex-grow bg-[#F6F6F6] border-b-2 border-[#7B7B7B] px-2.5 py-2.5 focus:outline-none"
              required
            />
            <button type="submit" className="bg-[#D9D9D9] px-4 py-2 rounded-md" disabled={isRequesting}>
              {isRequesting ? '요청 중...' : '인증'}
            </button>
          </div>
        </div>
      </form>
      <VerifyCodeForm email={email} onSuccess={handleVerifySuccess} setError={setError} />
    </div>
  );
};

export default RequestResetForm;
