import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  className?: string;
}

const Button = ({ children, className = '', ...props }: ButtonProps) => {
  return (
    <button
      className={`
        w-full h-[48px] flex py-[13px] rounded-lg justify-center items-center 
        relative overflow-hidden transition-colors duration-200 ease-in-out
        bg-button-gradient hover:bg-button-hover-gradient
        shadow-[0_1px_3px_rgba(0,0,0,0.1)]
        ${className}
      `}
      {...props}
    >
      <div className="absolute inset-0  bg-gradient-to-b from-blackT-30 to-transparent"></div>
      <div className="text-white text-15 font-semibold font-sans relative">{children}</div>
    </button>
  );
};

export default Button;
