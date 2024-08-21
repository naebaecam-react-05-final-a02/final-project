import Header from '@/components/Header';
import { PropsWithChildren } from 'react';

const ChallengeRegisterLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="max-w-[800px] mx-auto flex flex-col h-full gap-y-4">
      <div className="h-14">
        <Header title="챌린지 등록" />
      </div>
      <div className="fixed inset-0 bg-[#0E0C15] -z-30 overflow-hidden ">
        <div className="w-[140px] h-[300px] absolute top-[70px] left-[48px] blur-[90px] rounded-full bg-[#52467B]"></div>
        <div className="w-[340px] h-[105px] absolute bottom-[110px] right-[-24px] blur-[90px] bg-white/40 rounded-full"></div>
      </div>
      <div className="flex-1 text-white  pb-20">{children}</div>
    </div>
  );
};

export default ChallengeRegisterLayout;
