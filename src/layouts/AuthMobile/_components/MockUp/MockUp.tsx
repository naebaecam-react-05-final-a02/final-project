import Frame from '@/assets/mockup/frame.svg';
import Introduction from '@/layouts/Mobile/_components/Introduction';
import GlobalBackBoard from '@/layouts/Mobile/GlobalBackBoard';
import { PropsWithChildren } from 'react';
import BackBoard from '../../BackBoard/BackBoard';
import FrameHeader from '../FrameHeader';

const MockUp = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full h-full min-h-screen flex justify-evenly items-center">
      <Introduction />
      <div className="relative flex justify-center items-center">
        <article className="border-black relative rounded-[60px] overflow-hidden">
          <div className="w-[390px] h-[844px] overflow-hidden relative flex flex-col justify-between">
            <div>
              <FrameHeader />
              {children}
            </div>
          </div>
          <BackBoard />
        </article>
        <div className="absolute top -z-40">
          <Frame width={410} height={864} />
        </div>
      </div>
      <GlobalBackBoard />
    </main>
  );
};

export default MockUp;
