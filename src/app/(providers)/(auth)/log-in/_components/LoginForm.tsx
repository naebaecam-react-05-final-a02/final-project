'use client';
import { useSignIn, useSocialSignIn } from '@/hooks/auth/useUsers';
import { Provider } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export interface LogInFormData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

const LogInForm = () => {
  const [formData, setFormData] = useState<LogInFormData>({
    email: '',
    password: '',
    keepLoggedIn: false,
  });

  const router = useRouter();
  const { mutate: signIn, isPending, error } = useSignIn();
  const { mutate: socialSignIn, isPending: isSocialSignInPending } = useSocialSignIn();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signIn(formData, {
      onSuccess: () => {
        alert('로그인 성공!');
        router.push('/');
      },
      onError: (error) => {
        console.error('Login error:', error);
      },
    });
  };

  const handleSocialSignIn = (e: React.MouseEvent<HTMLButtonElement>, provider: Provider) => {
    e.preventDefault();
    socialSignIn(provider, {
      onError: (error) => {
        console.error(`${provider} sign-in error:`, error);
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <div className="flex flex-col">
          <label htmlFor="email">이메일:</label>
          <input
            className="border border-black mb-2"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">비밀번호:</label>
          <input
            className="border border-black mb-2"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="keepLoggedIn"
            name="keepLoggedIn"
            checked={formData.keepLoggedIn}
            onChange={(e) => setFormData((prev) => ({ ...prev, keepLoggedIn: e.target.checked }))}
          />
          <label htmlFor="keepLoggedIn">로그인 상태 유지</label>
        </div>
        {error && <div className="text-red-500">{(error as Error).message}</div>}
        <button type="submit" className="border border-black px-2 py-1.5" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </button>
      </form>
      <div>
        <Link href="/sign-up" className="border border-black px-4 py-2">
          회원가입
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <button
          type="button"
          className="border border-black px-2 py-1.5"
          onClick={(e) => handleSocialSignIn(e, 'google')}
        >
          구글 로그인
        </button>
        <button
          type="button"
          className="border border-black px-2 py-1.5"
          onClick={(e) => handleSocialSignIn(e, 'kakao')}
        >
          카카오 로그인
        </button>
      </div>
      <div>
        비밀번호가 기억나지 않으신가요?{' '}
        <Link href={'/reset-password'} className="">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
