import Image from 'next/image';
import { ReactNode } from 'react';
import BackButton from './BackButton';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Header = ({ title, showLogo = false, showBackButton = true, icon, onClick, className = '' }: HeaderProps) => {
  return (
    <header
      className={`flex w-full justify-between items-center px-4  header-gradient ${
        showLogo ? 'pt-[13px] pb-[15px]' : 'pt-[17px] pb-[18px]'
      }  ${className}`}
    >
      {showBackButton ? <BackButton /> : <span className="w-11"></span>}
      <div className="flex-grow flex justify-center items-center">
        {showLogo ? (
          <Image src="/OOSIE.png" alt="Logo" width={105} height={28} />
        ) : title ? (
          <h2 className="text-sm font-medium">{title}</h2>
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
