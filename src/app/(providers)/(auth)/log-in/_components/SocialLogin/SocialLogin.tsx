'use client';

import Loading from '@/components/Loading/Loading';
import { useSocialSignIn } from '@/hooks/auth/useUsers';
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import SocialLoginButtons from './SocialLoginButtons';

const SocialLogin = () => {
  const { mutate: socialSignIn, isPending } = useSocialSignIn();
  const router = useRouter();

  const handleSocialSignIn = (provider: Provider) => {
    socialSignIn(provider, {
      onSuccess: () => {
        router.push('/');
      },
      onError: (error) => {
        console.error(`${provider} sign-in error:`, error);
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 mb-16">
      <div className="text-white text-center text-[14px]">SNS로 간편 로그인하기</div>
      <SocialLoginButtons onSocialSignIn={handleSocialSignIn} />
      {isPending && <Loading />}
    </div>
  );
};

export default SocialLogin;
