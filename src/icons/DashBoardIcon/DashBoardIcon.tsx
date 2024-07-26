import { IconProps } from '@/types/icon';
import MypageSVG from './dashboard.svg';

const DashBoardIcon = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={className} {...props} />;
};

export default DashBoardIcon;
