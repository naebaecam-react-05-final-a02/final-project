import Link from 'next/link';

const SignUpLink = () => (
  <div className="flex items-center gap-2 mb-10 sm:mb-[62px]">
    <p className="text-white/50">아직 회원이 아니신가요?</p>
    <Link href="/sign-up" className="text-primary-100 border-b-2 border-primary-100">
      회원가입
    </Link>
  </div>
);
export default SignUpLink;
