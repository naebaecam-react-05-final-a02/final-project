import Checkbox from '@/components/Checkbox';
import ChevronRight from '@/icons/ChevronRight';
import Link from 'next/link';

interface LoginOptionsProps {
  keepLoggedIn: boolean;
  onKeepLoggedInChange: (checked: boolean) => void;
}

const LoginOptions = ({ keepLoggedIn, onKeepLoggedInChange }: LoginOptionsProps) => {
  return (
    <div className="flex w-full justify-between gap-2 mt-4 items-center">
      <div>
        <Checkbox checked={keepLoggedIn} label="로그인 유지" onChange={(e) => onKeepLoggedInChange(e.target.checked)} />
      </div>
      <Link href={'/reset-password'} className="text-white/50 hover:text-white">
        <div className="flex">
          비밀번호 찾기
          <ChevronRight className="stroke-white/50 group-hover:stroke-white" />
        </div>
      </Link>
    </div>
  );
};

export default LoginOptions;
