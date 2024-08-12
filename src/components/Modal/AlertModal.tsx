'use client';

import AlertSVG from '@/assets/modal/alert.svg';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useState } from 'react';
import Button from '../Button';
import AnimatedModalFrame from './AnimatedModalFrame';

interface ModalProps {
  onSuccess: () => void;
  contents: string[];
  id: string;
}

const AlertModal = ({ id, onSuccess, contents }: ModalProps) => {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(true);

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
    </AnimatedModalFrame>
  );
};

export default AlertModal;
