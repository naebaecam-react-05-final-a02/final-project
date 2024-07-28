import { ComponentProps } from 'react';
import PlusIcon from '/public/icons/plus.svg';

const AddButton = ({ onClick }: ComponentProps<'button'>) => {
  return (
    <button
      type="button"
      className="flex justify-center items-center w-12 h-12 rounded-full text-white  border border-dashed border-white border-opacity-50 hover:brightness-90"
      onClick={onClick}
    >
      <PlusIcon />
    </button>
  );
};

export default AddButton;
