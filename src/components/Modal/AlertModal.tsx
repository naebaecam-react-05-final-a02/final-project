'use client';

import AlertSVG from '@/assets/modal/alert.svg';
import { useModal } from '@/contexts/modal.context/modal.context';
import Button from '../Button';
import ModalBody from './ModalBody';

interface AlertModalProps {
  onSuccess: () => void;
  contents: string[];
}

const AlertModal = ({ onSuccess, contents }: AlertModalProps) => {
  const modal = useModal();

  const handleClickConfirm = () => {
    modal.close();
    onSuccess();
  };

  return (
    <ModalBody onCancel={handleClickConfirm}>
      <div className="w-full h-full flex flex-col gap-6 justify-between">
        <div className="w-full flex justify-center items-center">
          <AlertSVG />
        </div>
        <div className="w-full">
          {contents.map((content, index) => (
            <p key={index} className="w-full flex justify-center items-center text-white">
              {content}
            </p>
          ))}
        </div>
        <Button className={' w-full h-16'} onClick={handleClickConfirm}>
          닫기
        </Button>
      </div>
    </ModalBody>
  );
};

export default AlertModal;
