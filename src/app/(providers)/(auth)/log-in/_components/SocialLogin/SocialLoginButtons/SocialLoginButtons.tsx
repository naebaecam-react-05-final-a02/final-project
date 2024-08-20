import { Provider } from '@supabase/supabase-js';
import Image from 'next/image';

interface SocialLoginButtonsProps {
  onSocialSignIn: (provider: Provider) => void;
}

const SocialLoginButtons = ({ onSocialSignIn }: SocialLoginButtonsProps) => (
  <div className="flex items-center justify-center gap-6">
    <button
      type="button"
      className="p-2 rounded-full"
      onClick={() => onSocialSignIn('kakao')}
      aria-label="카카오 로그인"
    >
      <Image src="/auth/kakao.png" alt="Kakao 로그인" width={48} height={48} />
    </button>
    <button
      type="button"
      className="p-2 rounded-full"
      onClick={() => onSocialSignIn('google')}
      aria-label="구글 로그인"
    >
      <Image src="/auth/google.png" alt="Google 로그인" width={48} height={48} />
    </button>
  </div>
);

export default SocialLoginButtons;
