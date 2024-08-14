import { PropsWithChildren } from 'react';
import reactDom from 'react-dom';

const ModalPortal = ({ children }: PropsWithChildren) => {
  if (typeof window === 'undefined') return null;

  const portal = document.getElementById('portal') as Element;
  return reactDom.createPortal(children, portal);
};

export default ModalPortal;
