import Image from 'next/image';
import AddButton from './AddButton';
import BackButton from './BackButton';

interface HeaderProps {
  title?: string;
  showLogo?: boolean;
  showBackButton?: boolean;
  showAddButton?: boolean;
  onAddClick?: () => void;
  className?: string;
}

const Header = ({
  title,
  showLogo = false,
  showBackButton = true,
  showAddButton = false,
  onAddClick,
  className = '',
}: HeaderProps) => {
  return (
    <header
      className={`flex w-full justify-between items-center px-4  header-gradient ${
        showLogo ? 'pt-[13px] pb-[15px]' : 'pt-[17px] pb-[18px]'
      }  ${className}`}
    >
      {showBackButton ? <BackButton /> : <span className="w-10"></span>}
      <div className="flex-grow flex justify-center items-center">
        {showLogo ? (
          <Image src="/OOSIE.png" alt="Logo" width={105} height={28} />
        ) : title ? (
          <h2 className="text-sm font-medium">{title}</h2>
        ) : null}
      </div>
      {showAddButton ? <AddButton onClick={onAddClick} /> : <span className="w-10"></span>}
    </header>
  );
};

export default Header;
