import { PropsWithChildren } from 'react';
import BackBoard from '../../BackBoard/BackBoard';
import FrameHeader from '../FrameHeader';

const MockUp = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <article className="border-black border-[10px] relative rounded-[40px] overflow-hidden">
        <div className="w-[390px] h-[844px] overflow-hidden relative flex flex-col justify-between">
          <div>
            <FrameHeader />
            {children}
          </div>
        </div>
        <BackBoard />
      </article>
    </main>
  );
};

export default MockUp;
