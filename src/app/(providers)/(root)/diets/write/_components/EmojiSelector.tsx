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
    <>
      <div className={'absolute top-1/2 -translate-y-1/2 left-3'}>
        <Image width={20} height={20} src={`/foods/${foodType}.png`} alt={foodType} onClick={() => setModal(!modal)} />
      </div>
      <div
        className={`z-50 absolute top-full left-0 w-full flex flex-wrap justify-center gap-3 bg-[#00000090] p-3 rounded-xl ${
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
    </>
  );
};

export default EmojiSelector;
