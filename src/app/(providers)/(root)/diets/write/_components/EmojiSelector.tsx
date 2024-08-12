import { foodTypes } from '@/data/foodTypes';
import Image from 'next/image';
import { useState } from 'react';

interface EmojiSelectorProps {
  foodType: string;
  handleEmojiChange: (foodType: string) => void;
}

const EmojiSelector = ({ foodType, handleEmojiChange }: EmojiSelectorProps) => {
  const [modal, setModal] = useState(false);

  return (
    <div className="h-full relative">
      <div
        className="h-full flex justify-center items-center rounded-lg bg-input-gradient border-gradient"
        onClick={() => setModal(!modal)}
      >
        <Image width={20} height={20} src={`/foods/${foodType}.png`} alt={foodType} />
      </div>
      <div
        className={`z-50 absolute top-full right-0 w-[calc(100vw-32px)] max-h-[40vh] overflow-y-scroll flex flex-wrap justify-center gap-3 bg-blackT-60 backdrop-blur-md p-3 rounded-xl ${
          modal ? 'block' : 'hidden'
        }`}
      >
        {foodTypes.map((foodType) => (
          <Image
            key={foodType}
            width={25}
            height={25}
            src={`/foods/${foodType}.png`}
            alt={foodType}
            onClick={() => {
              handleEmojiChange(foodType);
              setModal(false);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
