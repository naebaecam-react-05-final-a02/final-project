import { IconProps } from '@/types/icon';
import MypageSVG from './check.svg';

const CheckIcon = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`${className}`} {...props} />;
};

export default CheckIcon;
