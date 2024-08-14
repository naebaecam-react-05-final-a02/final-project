import { IconProps } from '@/types/icon';
import MypageSVG from './plus.svg';

const Puls = ({ className, ...props }: IconProps) => {
  return (
    <MypageSVG
      className={`transition-colors duration-200 ${className}`}
      {...props}
      style={{ ...props.style, stroke: 'currentColor' }}
    />
  );
};

export default Puls;
