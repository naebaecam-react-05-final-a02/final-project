import { IconProps } from '@/types/icon';
import MypageSVG from './chevron-left.svg';

const ChevronLeft = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default ChevronLeft;
