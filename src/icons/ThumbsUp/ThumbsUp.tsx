import { IconProps } from '@/types/icon';
import MypageSVG from './thumbs-up.svg';

const ThumbsUp = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default ThumbsUp;
