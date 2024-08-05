import React, { ReactElement, ReactNode } from 'react';

interface TitleProps {
  children: ReactNode;
}

const Title = ({ children }: TitleProps) => {
  return <h2 className="text-[14px] font-medium leading-5">{children}</h2>;
};

export default Title;
