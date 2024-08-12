import { PropsWithChildren } from 'react';

const DDayLabel = ({ children }: PropsWithChildren) => {
  return <p className="bg-white/10 rounded-md text-sm px-[6px] py-[2px] text-primary-100">{children}</p>;
};

export default DDayLabel;
