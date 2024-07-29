import { IconProps } from '@/types/icon';
import MypageSVG from './chevron-right.svg';

const ChevronRight = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default ChevronRight;
