import { PropsWithChildren } from 'react';
import { useSwiper } from 'swiper/react';

const PrevButton = ({ children }: PropsWithChildren) => {
  const swiper = useSwiper();
  return <button onClick={() => swiper.slideNext()}>{children}</button>;
};

export default PrevButton;
