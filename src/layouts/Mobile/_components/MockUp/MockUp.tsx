import { PropsWithChildren } from 'react';

const MockUp = ({ children }: PropsWithChildren) => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <article className="border-black border-4">
        <div className="w-[390px] h-[844px] overflow-hidden relative flex flex-col">{children}</div>
      </article>
    </main>
  );
};

export default MockUp;
