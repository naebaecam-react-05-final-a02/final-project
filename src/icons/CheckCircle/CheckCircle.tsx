import { IconProps } from '@/types/icon';
import MypageSVG from './check-circle.svg';

const CheckCircle = ({ className, isActive, ...props }: IconProps & { isActive?: boolean }) => {
  return <MypageSVG {...props} />;
};

export default CheckCircle;
