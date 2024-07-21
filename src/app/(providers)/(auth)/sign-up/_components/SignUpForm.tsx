'use client';

import { useSignUp, useVerifyCode } from '@/hooks/auth/useUsers';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useVerificationEmail from '../_hooks/useVerificationEmail';

interface SignUpFormData {
  email: string;
  password: string;
  nickname: string;
  verificationCode: string;
}
const MAX_ATTEMPTS = 3;

const SignUpForm = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    nickname: '',
    verificationCode: '',
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const startTimer = () => {
    setTimeLeft(180); // 3분 = 180초
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === null || prevTime <= 1) {
          clearInterval(timer);
          return null;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const router = useRouter();
  const { mutate: signUp, isPending: isSignUpPending, error: signUpError } = useSignUp();
  const { mutate: sendVerificationEmail, isPending: isSendingEmail } = useVerificationEmail();
  const { mutate: verifyCode, isPending: isVerifyingCode } = useVerifyCode();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 이메일 전송
  const handleSendVerificationEmail = () => {
    if (!formData.email) {
      return alert('이메일을 입력해주세요.');
    }
    sendVerificationEmail(formData.email, {
      onSuccess: () => {
        alert('인증 코드가 이메일로 전송되었습니다.');
        setIsCodeSent(true);
        setAttempts(0);
        startTimer();
      },
      onError: (error) => {
        alert(`이메일 전송 실패`);
      },
    });
  };

  // 이메일 코드 인증 확인
  const handleVerifyCode = () => {
    verifyCode(
      { email: formData.email, code: formData.verificationCode },
      {
        onSuccess: (result) => {
          if (result.success) {
            setIsEmailVerified(true);
            setTimeLeft(null);
            alert('이메일이 성공적으로 인증되었습니다.');
          } else {
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);
            if (newAttempts >= MAX_ATTEMPTS) {
              alert(`인증 실패: 최대 시도 횟수를 초과했습니다. 새로운 코드를 요청해주세요.`);
              setIsCodeSent(false);
              setTimeLeft(null);
            } else {
              alert(`인증 실패: ${result.message}. 남은 시도 횟수: ${MAX_ATTEMPTS - newAttempts}`);
            }
          }
        },
        onError: (error) => {
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);
          if (newAttempts >= MAX_ATTEMPTS) {
            alert(`인증 실패: 최대 시도 횟수를 초과했습니다. 새로운 코드를 요청해주세요.`);
            setIsCodeSent(false);
            setTimeLeft(null);
          } else {
            alert(`인증 실패. 남은 시도 횟수: ${MAX_ATTEMPTS - newAttempts}`);
          }
        },
      },
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isEmailVerified) {
      alert('이메일 인증을 먼저 완료해주세요.');
      return;
    }
    signUp(formData, {
      onSuccess: () => {
        alert('회원가입이 완료되었습니다!');
        router.push('/log-in');
      },
      onError: (error) => {
        console.error('Sign-up error:', error);
      },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center justify-center">
        <div className="flex flex-col">
          <label htmlFor="email">이메일:</label>
          <div className="flex">
            <input
              type="email"
              id="email"
              name="email"
              className="border border-black"
              value={formData.email}
              onChange={handleChange}
              disabled={isEmailVerified}
              required
            />
            <button
              type="button"
              onClick={handleSendVerificationEmail}
              disabled={isSendingEmail || isEmailVerified || isCodeSent}
              className="border border-black px-2 py-1.5 ml-2"
            >
              {isSendingEmail ? '전송 중...' : isCodeSent ? '재전송' : '인증 코드 전송'}
            </button>
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="verificationCode">인증 코드:</label>
          <div className="flex">
            <input
              type="text"
              id="verificationCode"
              name="verificationCode"
              className="border border-black"
              value={formData.verificationCode}
              onChange={handleChange}
              disabled={isEmailVerified}
            />
            <button
              type="button"
              onClick={handleVerifyCode}
              disabled={isVerifyingCode || isEmailVerified || !timeLeft || attempts >= MAX_ATTEMPTS}
              className="border border-black px-2 py-1.5 ml-2"
            >
              {isVerifyingCode ? '인증 중...' : '인증하기'}
            </button>
          </div>
          {timeLeft !== null && (
            <span className="text-sm text-gray-500 mt-1">
              남은 시간: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="border border-black"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            className="border border-black"
            value={formData.nickname}
            onChange={handleChange}
            required
          />
        </div>
        {signUpError && <div className="text-red-500">{(signUpError as Error).message}</div>}
        <button
          type="submit"
          className="border border-black px-2 py-1.5"
          disabled={isSignUpPending || !isEmailVerified}
        >
          {isSignUpPending ? '처리 중...' : '회원가입'}
        </button>
        <div>
          <Link href="/log-in" className="border border-black px-2 py-1.5">
            로그인
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
