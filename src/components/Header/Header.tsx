import Image from 'next/image';
import { ReactNode } from 'react';
import BackButton from './BackButton';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  icon?: ReactNode;
  titleIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Header = ({
  title,
  showLogo = false,
  showBackButton = true,
  icon,
  titleIcon,
  onClick,
  className = '',
}: HeaderProps) => {
  return (
    <header className={`flex w-full justify-between items-center  header-gradient  ${className}`}>
      {showBackButton ? <BackButton /> : <span className="w-11"></span>}
      <div className="flex-grow flex justify-center items-center py-[18px]">
        {showLogo ? (
          <Image src="/OOSIE.png" alt="Logo" width={105} height={28} />
        ) : title ? (
          <div className="flex items-center">
            <h2 className="text-sm font-medium">{title}</h2>
            {titleIcon && <button className="ml-1">{titleIcon}</button>}
          </div>
        ) : null}
      </div>
      {icon ? (
        <button
          onClick={onClick}
          className={`rounded-xl border-2 border-black/10 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25),-2px_-2px_4px_0px_rgba(255,255,255,0.10)] backdrop-blur-[5px] p-2 ${className}`}
        >
          {icon}
        </button>
      ) : (
        <span className="w-11"></span>
      )}
    </header>
  );
};

export default Header;
