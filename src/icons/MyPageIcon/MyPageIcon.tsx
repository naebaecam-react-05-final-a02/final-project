import { IconProps } from '@/types/icon';
import MypageSVG from './mypage.svg';

const MyPageIcon = ({ className, color = 'rgba(255, 255, 255, 0.3)', ...props }: IconProps) => {
  return <MypageSVG className={className} style={{ stroke: color }} {...props} />;
};

export default MyPageIcon;
