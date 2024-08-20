'use client';
import ConfirmSVG from '@/assets/modal/check.svg';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useState } from 'react';
import Button from '../Button';
import AnimatedModalFrame from './AnimatedModalFrame';

interface ConfirmModalProps {
  onSuccess: () => void;
  onCancel: () => void;
  contents: string[];
  id: string;
}

const ConfirmModal = ({ id, onSuccess, onCancel, contents }: ConfirmModalProps) => {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(true);
  const handleCloseModal = () => {
    onCancel();
    setIsVisible(false);
    setTimeout(() => {
      modal.close(id);
    }, 300);
  };
  const handleClickConfirm = () => {
    onSuccess();
    setIsVisible(false);
    setTimeout(() => {
      modal.close(id);
    }, 300);
  };

  return (
    <AnimatedModalFrame isVisible={isVisible}>
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
    </AnimatedModalFrame>
  );
};

export default ConfirmModal;
