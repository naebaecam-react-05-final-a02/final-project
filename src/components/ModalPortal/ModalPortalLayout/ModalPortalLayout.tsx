import ModalPortal from '../ModalPortal';

type ModalPortalLayoutProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalPortalLayout = ({ children, onClose }: ModalPortalLayoutProps) => {
  return (
    <ModalPortal>
      <section
        className="fixed size-full z-40 bg-black bg-opacity-60"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {children}
      </section>
    </ModalPortal>
  );
};

export default ModalPortalLayout;
