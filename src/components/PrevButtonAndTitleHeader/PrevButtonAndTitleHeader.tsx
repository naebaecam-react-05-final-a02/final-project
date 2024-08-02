import { PropsWithChildren } from 'react';
import PrevButton from '../PrevButton/PrevButton';

interface PrevButtonAndTitleHeaderProps {
  rightButton?: React.ReactNode | null;
}

const PrevButtonAndTitleHeader = ({
  children,
  rightButton = null,
}: PropsWithChildren<PrevButtonAndTitleHeaderProps>) => {
  return (
    <div className="w-full h-full relative flex justify-center items-center text-sm">
      {children}
      <div className="absolute left-0">
        <PrevButton />
      </div>
      <div className="absolute right-0">{rightButton}</div>
    </div>
  );
};

export default PrevButtonAndTitleHeader;
