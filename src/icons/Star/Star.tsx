import { IconProps } from '@/types/icon';
import MypageSVG from './star.svg';

const Star = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default Star;
