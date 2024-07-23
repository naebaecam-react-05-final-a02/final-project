import { ComponentProps, PropsWithChildren } from 'react';

const TextInput = ({ children, ...props }: PropsWithChildren & ComponentProps<'input'>) => {
  return (
    <input className="bg-[#F6F6F6] border-b border-[#7B7B7B] outline-none p-2" {...props}>
      {children}
    </input>
  );
};

export default TextInput;
