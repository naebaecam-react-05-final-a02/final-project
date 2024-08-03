import { PropsWithChildren } from 'react';
import PrevButton from '../ButtonIcon/PrevButton/PrevButton';

interface PrevButtonAndTitleHeaderProps {
  leftButton?: React.ReactNode | null;
  rightButton?: React.ReactNode | null;
}

const TitleHeader = ({
  children,
  rightButton = null,
  leftButton = <PrevButton />,
}: PropsWithChildren<PrevButtonAndTitleHeaderProps>) => {
  return (
    <div className="w-full h-full relative flex justify-center items-center text-sm header-gradient">
      {children}
      <div className="absolute left-0">{leftButton}</div>
      <div className="absolute right-0">{rightButton}</div>
    </div>
  );
};

export default TitleHeader;
