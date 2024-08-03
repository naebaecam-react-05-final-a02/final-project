import { IconProps } from '@/types/icon';
import ArrowForwardSVG from './arrow_forward.svg';
import ArrowForwardActiveSVG from './arrow_forward_active.svg';

const ArrowDropDown = ({ className, isActive, ...props }: IconProps & { isActive?: boolean }) => {
  return (
    <div>
      {isActive ? <ArrowForwardActiveSVG className="fill-primary-10" {...props} /> : <ArrowForwardSVG {...props} />}
    </div>
  );
};

export default ArrowDropDown;
