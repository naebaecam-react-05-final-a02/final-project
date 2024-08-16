'use client';

import AlertSVG from '@/assets/modal/alert.svg';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useState } from 'react';
import Button from '../Button';
import AnimatedModalFrame from './AnimatedModalFrame';

interface ModalProps {
  onSuccess: () => void;
  title?: string;
  contents: string[];
  id: string;
}

const AlertModal = ({ id, onSuccess, title, contents }: ModalProps) => {
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
      <div className="w-full h-full flex flex-col gap-4 justify-between">
        <div className="w-full flex flex-col justify-center items-center gap-2">
          <AlertSVG />
          {title && <h3 className="text-18 font-semibold flex justify-center items-center text-white">{title}</h3>}
        </div>
        <div className="w-full">
          {contents.map((content, index) => (
            <p key={index} className="w-full flex justify-center items-center text-white text-sm">
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
