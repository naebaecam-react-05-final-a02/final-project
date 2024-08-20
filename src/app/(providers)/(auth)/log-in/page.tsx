import Image from 'next/image';
import LoginForm from './_components/LoginForm';
import SignUpLink from './_components/SignUpLink';
import SocialLogin from './_components/SocialLogin';

const LoginPage = () => {
  return (
    <div
      className="flex flex-col w-full h-full items-center px-4
    sm:max-w-[660px] sm:max-h-[820px] sm:mx-auto sm:mt-12 sm:px-[120px] sm:pt-[80px] 
    sm:border-[2px] sm:border-whiteT-10
    sm:rounded-[20px] sm:bg-blackT-5
    sm:shadow-[-4px_-4px_8px_0px_rgba(255,255,255,0.1),4px_4px_8px_0px_rgba(0,0,0,0.3)]
    sm:backdrop-blur-[8px]"
    >
      <Image src={'/OOSIE.png'} alt="OOSIE Logo" width={180} height={48} className="mt-[110px] mb-[70px] sm:mt-0" />
      <LoginForm />
      <SocialLogin />
      <SignUpLink />
    </div>
  );
};

export default LoginPage;
