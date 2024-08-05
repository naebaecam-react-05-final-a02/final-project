import { IconProps } from '@/types/icon';
import MypageSVG from './memo.svg';

const Memo = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={`transition-colors duration-200 ${className}`} {...props} />;
};

export default Memo;
