import { IconProps } from '@/types/icon';
import ArrowForwardSVG from './calendar.svg';

const Calendar = ({ className, isActive, ...props }: IconProps & { isActive?: boolean }) => {
  return <ArrowForwardSVG {...props} />;
};

export default Calendar;
