import { ReactNode } from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '', ...props }: CardProps) => {
  return (
    <div
      className={`rounded-[20px] border-[1px] border-white/20 bg-white/[0.05] flex p-4 flex-col items-start gap-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
