'use client';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import Input from '@/components/Input';
import { useSignIn, useSocialSignIn } from '@/hooks/auth/useUsers';
import ChevronRight from '@/icons/ChevronRight';
import { Provider } from '@supabase/supabase-js';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaBeer, FaStarHalf } from 'react-icons/fa';
import { validatePassword } from '../../../_utils/validatePassword';

export interface LogInFormData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

interface FormErrors extends Partial<Record<keyof LogInFormData, string | null>> {
  form?: string | null;
}

const LogInForm = () => {
  const [formData, setFormData] = useState<LogInFormData>({
    email: '',
    password: '',
    keepLoggedIn: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const router = useRouter();

  const { mutate: signIn, isPending } = useSignIn();
  const { mutate: socialSignIn, isPending: isSocialSignInPending } = useSocialSignIn();

  const validateEmail = (email: string) => {
    return !email.includes('@') ? '유효한 이메일 주소를 입력해주세요.' : null;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    let error = null;
    if (name === 'email') {
      error = validateEmail(value);
    } else if (name === 'password') {
      error = validatePassword(value);
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    signIn(formData, {
      onSuccess: () => {
        alert('로그인 성공!');
        router.push('/');
      },
      onError: (error: any) => {
        console.error('Login error:', error);
        let errorMessage = '로그인 중 오류가 발생했습니다. 다시 시도해 주세요.';
        if (error.status === 400) {
          errorMessage = '이메일 주소와 비밀번호를 확인해 주세요.';
        }
        setErrors((prev) => ({ ...prev, form: errorMessage }));
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
    <div className="flex flex-col w-full items-center gap-4 max-w-[390px]">
      <Image src={'/OOSIE.png'} alt="OOSIE Logo" width={180} height={48} className=" mb-[50px]" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center w-full px-4">
        {/* <Input
          label="이메일"
          placeholder="이메일을 입력해 주세요."
          value={formData.email}
          onChange={handleChange}
          name="email"
          type="email"
          error={errors.email}
        />
        <Input
          label="비밀번호"
          placeholder="비밀번호를 입력해 주세요."
          value={formData.password}
          onChange={handleChange}
          name="password"
          type="password"
          error={errors.password}
        /> */}
        <Input icon={<FaBeer />} label="뭔데" />
        <Input
          label="드랍다운"
          icon={<FaStarHalf />}
          isDropdown
          dropdownOptions={[
            {
              value: '테스트 1',
              icon: <FaStarHalf />,
              onClick: () => console.log('테스트 1 clicked'),
            },
            {
              value: '테스트 2',
              icon: <FaStarHalf />,
              onClick: () => console.log('테스트 2 clicked'),
            },
            // ... 기타 옵션
          ]}
        />
        <div className="flex w-full justify-between gap-2 mt-4">
          <div>
            <Checkbox
              checked={formData.keepLoggedIn}
              label="로그인 유지"
              onChange={(e) => setFormData((prev) => ({ ...prev, keepLoggedIn: e.target.checked }))}
            />
          </div>
          <Link href={'/reset-password'} className="text-white/50 hover:text-white">
            <div className="flex">
              비밀번호 찾기
              <ChevronRight className="stroke-white/50 group-hover:stroke-white" />
            </div>
          </Link>
        </div>
        {errors.form && <div className="text-red-500">{errors.form}</div>}

        <Button className="mt-12 mb-[35px]" disabled={isPending}>
          {isPending ? '로그인 중...' : '로그인'}
        </Button>
      </form>
      <div className="flex flex-col gap-2 mb-10">
        <div className="text-white text-center text-[14px] leading-6">SNS로 간편 로그인하기</div>
        <div className="flex items-center justify-center gap-6">
          <button
            type="button"
            className="p-2 rounded-full "
            onClick={(e) => handleSocialSignIn(e, 'kakao')}
            aria-label="카카오 로그인"
          >
            <Image src="/kakao.png" alt="Kakao 로그인" width={48} height={48} />
          </button>
          <button
            type="button"
            className="p-2 rounded-full "
            onClick={(e) => handleSocialSignIn(e, 'google')}
            aria-label="구글 로그인"
          >
            <Image src="/google.png" alt="Google 로그인" width={48} height={48} />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-white/50">아직 회원이 아니신가요?</p>
        <Link href="/sign-up" className="text-[#12F287] border-b-2 border-[#12F287]">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default LogInForm;
