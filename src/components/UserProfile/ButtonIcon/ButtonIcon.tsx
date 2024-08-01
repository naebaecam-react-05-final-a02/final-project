import { PropsWithChildren } from 'react';

interface IconButtonProps {
  onClick: () => void;
}

const IconButton = ({ children, onClick }: PropsWithChildren<IconButtonProps>) => {
  return (
    <div className="relative cursor-pointer" onClick={onClick}>
      <div className="border-2 border-black/10 absolute inset-0 rounded-xl box-border z-10"></div>
      <div className="w-10 h-10 flex justify-center items-center button-icon">{children}</div>
    </div>
  );
};

export default IconButton;
