import { PropsWithChildren } from 'react';

const ModalBody = ({ children }: PropsWithChildren) => {
  return (
    <div className="p-4 mx-[35px] w-full border-primary-100 border-2 bg-white/5 rounded-3xl modal-shadow">
      {children}
    </div>
  );
};

export default ModalBody;
