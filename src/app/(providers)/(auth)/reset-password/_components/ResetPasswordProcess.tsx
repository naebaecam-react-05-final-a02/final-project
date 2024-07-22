'use client';

import { useRequestPasswordReset, useResetPassword, useVerifyResetCode } from '@/hooks/auth/useUsers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const ResetPasswordProcess = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [error, setError] = useState<string | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const router = useRouter();

  const { mutate: requestPasswordReset, isPending: isRequesting } = useRequestPasswordReset();
  const { mutate: verifyCode, isPending: isVerifying } = useVerifyResetCode();
  const { mutate: resetPassword, isPending: isResetting } = useResetPassword();

  const handleRequestReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email) return;
    requestPasswordReset(email, {
      onSuccess: () => {
        alert('비밀번호 재설정 코드가 이메일로 전송되었습니다. 이메일을 확인해주세요.');
        setIsCodeSent(true);
      },
      onError: (error) => {
        console.error('Password reset request error:', error);
        setError(error instanceof Error ? error.message : '오류가 발생했습니다.');
      },
    });
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    verifyCode(
      { email, code },
      {
        onSuccess: (data) => {
          alert('인증 성공! 새 비밀번호를 설정해주세요.');
          setStep('reset');
        },
        onError: (error) => {
          setError(`인증 실패: ${error instanceof Error ? error.message : '오류가 발생했습니다.'}`);
        },
      },
    );
  };

  const handleResetPassword = (e: React.FormEvent) => {
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
    <div className="flex flex-col items-center">
      {step === 'request' && (
        <>
          <form onSubmit={handleRequestReset} className="w-full max-w-md mb-4">
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

          <form onSubmit={handleVerifyCode} className="w-full max-w-md">
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
                <button
                  type="submit"
                  className="bg-[#D9D9D9] px-4 py-2 rounded-md"
                  disabled={!isCodeSent || isVerifying}
                >
                  {isVerifying ? '확인 중...' : '확인'}
                </button>
              </div>
            </div>
          </form>
        </>
      )}

      {step === 'reset' && (
        <form onSubmit={handleResetPassword} className="w-full max-w-md">
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
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      <div className="relative mb-4 mt-6">
        <Link
          className="bg-green-600 w-full rounded-md py-3 px-6 transition-all duration-300 ease-in-out hover:translate-y-1 shadow-md border-b-4 border-black border-opacity-85 relative z-10 inline-block text-white font-semibold"
          href="/"
        >
          홈으로 가기
        </Link>
        <span className={`absolute top-1 left-0 bg-black opacity-80 rounded-md w-full h-full z-0`}></span>
      </div>
    </div>
  );
};

export default ResetPasswordProcess;
