import CheckSVG from '@/assets/check.svg';
import GlassButton from '../GlassButton';

const CheckButton = ({ ...props }) => {
  return (
    <button {...props}>
      <GlassButton>
        <CheckSVG />
      </GlassButton>
    </button>
  );
};

export default CheckButton;
