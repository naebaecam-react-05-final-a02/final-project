import { PropsWithChildren } from 'react';
import BackBoard from '../../BackBoard/BackBoard';
import FrameFooter from '../FrameFooter';
import FrameHeader from '../FrameHeader';

const MockUp = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full h-screen flex justify-center items-center gap-4">
      <article className="w-[400px]">
        <h1 className="text-2xl font-bold">MOCK UP</h1>
      </article>
      <article className="border-black border-[10px] relative rounded-[40px] overflow-hidden">
        <div className="w-[390px] h-[844px] overflow-hidden relative flex flex-col">
          <FrameHeader />
          {children}
          <FrameFooter />
        </div>
        <BackBoard />
      </article>
    </main>
  );
};

export default MockUp;
