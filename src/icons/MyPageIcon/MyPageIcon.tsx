import { ComponentProps } from 'react';
import MypageSVG from './mypage.svg';

type MyPageIconProps = ComponentProps<typeof MypageSVG> & {
  className?: string;
};

const MyPageIcon = ({ className, ...props }: MyPageIconProps) => {
  return <MypageSVG className={className} {...props} />;
};

export default MyPageIcon;
