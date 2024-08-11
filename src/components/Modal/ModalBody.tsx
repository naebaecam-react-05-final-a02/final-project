import { PropsWithChildren } from 'react';
import Backdrop from './BackDrop';

interface ModalBodyProps {
  onCancel: () => void;
}

const ModalBody = ({ children, onCancel }: PropsWithChildren<ModalBodyProps>) => {
  return (
    <>
      <Backdrop onCancel={onCancel}>
        <div className="p-4 mx-[35px] w-full border-primary-100 border-2 bg-white/5 rounded-3xl modal-shadow">
          {children}
        </div>
      </Backdrop>
    </>
  );
};

export default ModalBody;
