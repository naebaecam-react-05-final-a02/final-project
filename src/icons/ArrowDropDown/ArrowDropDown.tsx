import { IconProps } from '@/types/icon';
import MypageSVG from './arrow_forward.svg';

const ArrowDropDown = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default ArrowDropDown;
