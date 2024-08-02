import { PropsWithChildren } from 'react';

const GlassButton = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-10 h-10 prev-button flex justify-center items-center">
      <div className="w-6 h-6">{children}</div>
    </div>
  );
};

export default GlassButton;
