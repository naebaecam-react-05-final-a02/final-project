import { IconProps } from '@/types/icon';
import MypageSVG from './challenge.svg';

const ChallengeIcon = ({ className, ...props }: IconProps) => {
  return <MypageSVG className={className} {...props} />;
};

export default ChallengeIcon;
