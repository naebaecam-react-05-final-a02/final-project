import { ComponentProps, PropsWithChildren } from 'react';

interface TextInputProps {
  unit?: string;
}

const TextInput = ({ unit, children, ...props }: PropsWithChildren<TextInputProps> & ComponentProps<'input'>) => {
  return (
    <div className="relative">
      {children}
      <input
        className={`rounded-lg w-full bg-transparent bg-gradient-to-b from-[#ffffff36] to-[#ffffff0f] outline-none p-3 text-white text-[15px] border border-transparent appearance-none  [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:border-[#3ecf8e99] ${
          children && 'pl-10'
        }`}
        {...props}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white opacity-50">{unit}</span>
    </div>
  );
};

export default TextInput;
