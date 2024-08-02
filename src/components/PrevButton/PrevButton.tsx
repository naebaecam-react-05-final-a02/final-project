import PrevSVG from '@/assets/prev.svg';

const PrevButton = () => {
  return (
    <button className="w-10 h-10 prev-button flex justify-center items-center">
      <div className="w-6 h-6">
        <PrevSVG />
      </div>
    </button>
  );
};

export default PrevButton;
