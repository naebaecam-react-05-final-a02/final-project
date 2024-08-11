'use client';
import ConfirmSVG from '@/assets/modal/check.svg';
import { useModal } from '@/contexts/modal.context/modal.context';
import Button from '../Button';
import ModalBody from './ModalBody';

const ConfirmModal = ({ onNextEvent, contents }: { contents: string[]; onNextEvent: () => void }) => {
  const modal = useModal();
  const handleCloseModal = () => {
    modal.close();
  };
  const handleClickConfirm = () => {
    modal.close();
    onNextEvent();
  };

  return (
    <ModalBody>
      <div className="w-full h-full flex flex-col gap-6 justify-between">
        <div className="w-full flex justify-center items-center">
          <ConfirmSVG />
        </div>
        <div className="w-full">
          {contents.map((content, index) => (
            <p key={index} className="w-full flex justify-center items-center text-white">
              {content}
            </p>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            className={
              'w-full h-[50px] flex py-[13px] rounded-lg justify-center items-center text-white border-primary-100 border'
            }
            onClick={handleCloseModal}
          >
            취소
          </button>
          <Button className={'w-full h-16'} onClick={handleClickConfirm}>
            확인
          </Button>
        </div>
      </div>
    </ModalBody>
  );
};

export default ConfirmModal;
