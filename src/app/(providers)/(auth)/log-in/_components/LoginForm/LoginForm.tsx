'use client';
import Button from '@/components/Button';
import Loading from '@/components/Loading/Loading';
import { useSignIn } from '@/hooks/auth/useUsers';
import { useRouter } from 'next/navigation';
import EmailField from '../../../_components/EmailField';
import PasswordField from '../../../_components/PasswordField';
import useLoginForm from '../../_hooks/useLoginForm';
import LoginOptions from './LoginOptions';

export interface LogInFormData {
  email: string;
  password: string;
  keepLoggedIn: boolean;
}

const LogInForm = () => {
  const { formData, setFormData, errors, handleChange, setErrors } = useLoginForm();
  const { mutate: signIn, isPending } = useSignIn();
  const router = useRouter();

  const validateEmail = (email: string) => {
    return !email.includes('@') ? '유효한 이메일 주소를 입력해주세요.' : null;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);

    if (emailError) {
      setErrors({
        email: emailError,
      });
      return;
    }

    signIn(formData, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error: any) => {
        console.error('Login error:', error);
        let errorMessage = '로그인에 실패했습니다. 다시 시도해 주세요.';
        if (error.status === 400) {
          errorMessage = '이메일 주소와 비밀번호를 확인해 주세요.';
        }
        setErrors((prev) => ({ ...prev, form: errorMessage }));
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-center w-full">
      <EmailField value={formData.email} onChange={handleChange} error={errors.email} />
      <PasswordField value={formData.password} onChange={handleChange} error={errors.password} />
      <LoginOptions
        keepLoggedIn={formData.keepLoggedIn}
        onKeepLoggedInChange={(checked) => setFormData((prev) => ({ ...prev, keepLoggedIn: checked }))}
      />
      {errors.form && <div className="text-red-500">{errors.form}</div>}
      <Button className="mt-12 mb-[70px]" disabled={isPending}>
        {isPending ? '로그인 중...' : '로그인'}
      </Button>
      {isPending && <Loading />}
    </form>
  );
};

export default LogInForm;
