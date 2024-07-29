import { IconProps } from '@/types/icon';
import MypageSVG from './mypage.svg';

const MyPageIcon = ({ className, active, color, ...props }: IconProps) => {
  return (
    <MypageSVG
      className={className}
      style={{
        fill: active ? '#12F287' : 'none',
        stroke: active ? '#12F287' : 'white',
        strokeWidth: 1.5,
        opacity: active ? 1 : 0.3,
      }}
      {...props}
    />
  );
};

export default MyPageIcon;
