'use client';
import { useSignIn, useSocialSignIn } from '@/api/auth/useUsers';
import { Provider } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LogInFormData {
  email: string;
  password: string;
}

const LogInForm = () => {
  const [formData, setFormData] = useState<LogInFormData>({
    email: '',
    password: '',
  });
  const [socialProvider, setSocialProvider] = useState<Provider | null>(null);

  const router = useRouter();
  const { mutate: signIn, isPending, error } = useSignIn();
  const { mutate: socialSignIn, isPending: isSocialSignInPending } = useSocialSignIn(socialProvider as Provider);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSocialSignIn = (e: React.FormEvent<HTMLButtonElement>, provider: Provider) => {
    e.preventDefault();
    setSocialProvider(provider);
    socialSignIn(undefined, {
      onError: (error) => {
        console.error(`${provider} sign-in error:`, error);
      },
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center">
        <div className="flex ">
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
        <div>
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
        {error && <div className="text-red-500">{(error as Error).message}</div>}
        <button type="submit" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </button>
        <div>
          <Link href="/sign-up" className="border border-black px-4 py-2">
            회원가입
          </Link>
        </div>
      </form>
      <div>
        <button
          type="button"
          onClick={(e) => handleSocialSignIn(e, 'google')}
          disabled={isSocialSignInPending && socialProvider === 'google'}
        >
          {isSocialSignInPending && socialProvider === 'google' ? 'Google 로그인 중...' : 'Google로 로그인'}
        </button>
        <button
          type="button"
          onClick={(e) => handleSocialSignIn(e, 'kakao')}
          disabled={isSocialSignInPending && socialProvider === 'kakao'}
        >
          {isSocialSignInPending && socialProvider === 'kakao' ? 'Kakao 로그인 중...' : 'Kakao로 로그인'}
        </button>
      </div>
    </>
  );
};

export default LogInForm;
