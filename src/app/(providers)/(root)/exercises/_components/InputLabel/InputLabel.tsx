import { PropsWithChildren } from 'react';

const InputLabel = ({ children }: PropsWithChildren) => {
  return <p className="w-full h-full flex justify-center items-center">{children}</p>;
};

export default InputLabel;
