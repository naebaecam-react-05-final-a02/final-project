import { IconProps } from '@/types/icon';
import MypageSVG from './community.svg';

const CommunityIcon = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={className} {...props} />;
};

export default CommunityIcon;
