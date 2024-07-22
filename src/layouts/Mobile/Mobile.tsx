import { PropsWithChildren } from 'react';

const Mobile = ({ children }: PropsWithChildren) => {
  return <div className="max-w-[390px]">{children}</div>;
};

export default Mobile;
