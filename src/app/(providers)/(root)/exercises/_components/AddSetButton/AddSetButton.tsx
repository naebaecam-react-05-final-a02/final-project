import { PropsWithChildren } from 'react';

interface AddSetButtonProps {
  onClick: () => void;
}

const AddSetButton = ({ children, onClick }: PropsWithChildren<AddSetButtonProps>) => {
  return (
    <button
      className="w-full h-10 text-sm border border-white/20 text-white/70 rounded-xl"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default AddSetButton;
