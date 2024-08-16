import { IconProps } from '@/types/icon';
import MypageSVG from './BigThumbUp.svg';

const BigThumbUp = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default BigThumbUp;
