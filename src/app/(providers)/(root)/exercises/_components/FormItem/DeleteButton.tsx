import DELETE from '@/assets/exercises/delete.svg';
interface DeleteButtonProps {
  onClick: () => void;
}

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button type="button" className="flex justify-center items-center w-12 h-10" onClick={onClick}>
      <DELETE />
    </button>
  );
};

export default DeleteButton;
