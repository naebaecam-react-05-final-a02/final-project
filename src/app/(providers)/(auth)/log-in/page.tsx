import Image from 'next/image';
import LoginForm from './_components/LoginForm';
import SignUpLink from './_components/SignUpLink';
import SocialLogin from './_components/SocialLogin';

const LoginPage = () => {
  return (
    <div className="flex flex-col w-full h-full items-center max-w-[390px] ">
      <Image src={'/OOSIE.png'} alt="OOSIE Logo" width={180} height={48} className="mt-[110px] mb-[70px]" />
      <LoginForm />
      <SocialLogin />
      <SignUpLink />
    </div>
  );
};

export default LoginPage;
