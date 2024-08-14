import { foodEmojis, foodTypes } from '@/data/foodTypes';
import { useState } from 'react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface EmojiSelectorProps {
  foodType: string;
  handleEmojiChange: (foodType: string) => void;
}

const EmojiSelector = ({ foodType, handleEmojiChange }: EmojiSelectorProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTypeIndex, setSelectedTypeIndex] = useState<number>(0);

  const handleFoodTypeClicked = (idx: number) => setSelectedTypeIndex(idx);

  return (
    <div className={`w-12 h-12 relative cursor-pointer`}>
      <div
        className={`relative h-full flex justify-center items-center rounded-lg bg-input-gradient ${
          isOpen ? 'border-gradient z-20' : 'border-gradient-light'
        } text-2xl`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {foodType}
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/70 bg-opacity-50 z-10" onClick={() => setIsOpen(false)} />
          <div
            className={`z-50 absolute top-full right-0 w-[calc(100vw-32px)] bg-blackT-50 border-2 border-primary-50 backdrop-blur-md mt-2 px-3 py-2 rounded-xl`}
          >
            <div className="flex flex-wrap gap-1 overflow-hidden mb-3">
              <Swiper
                slidesPerView={'auto'}
                spaceBetween={10}
                freeMode={true}
                mousewheel={true}
                modules={[FreeMode, Mousewheel]}
                className="!flex !justify-start !mx-0 !w-full py-2"
              >
                {foodTypes.map((foodType, idx) => (
                  <SwiperSlide key={foodType} className="!w-auto my-1 cursor-pointer">
                    <span
                      className={`text-xs px-2.5 py-1 border ${
                        selectedTypeIndex === idx
                          ? 'text-primary-100 border-primary-100'
                          : 'text-whiteT-50 border-whiteT-50'
                      } rounded-lg`}
                      onClick={() => handleFoodTypeClicked(idx)}
                    >
                      {foodType}
                    </span>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <ul className="flex flex-wrap gap-2 overflow-y-auto">
              {Object.values(foodEmojis)[selectedTypeIndex].map((foodType) => (
                <li
                  key={foodType}
                  className="text-3xl"
                  onClick={() => {
                    handleEmojiChange(foodType);
                    setIsOpen(false);
                  }}
                >
                  {foodType}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default EmojiSelector;
