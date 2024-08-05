import { IconProps } from '@/types/icon';
import MypageSVG from './dots-vertical.svg';

const DotsVertical = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default DotsVertical;
