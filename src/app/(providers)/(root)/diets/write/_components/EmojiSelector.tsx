import Image from 'next/image';
import { useState } from 'react';

interface EmojiSelectorProps {
  foodType: string;
  handleEmojiChange: (foodType: string) => void;
}

const EmojiSelector = ({ foodType, handleEmojiChange }: EmojiSelectorProps) => {
  const [modal, setModal] = useState(false);
  const foodTypes = ['curry', 'bread', 'chicken'];

  return (
    <>
      <div className={'absolute top-1/2 -translate-y-1/2 left-3'}>
        <Image width={20} height={20} src={`/foods/${foodType}.png`} alt={foodType} onClick={() => setModal(!modal)} />
      </div>
      <div
        className={`z-50 absolute top-full left-0 w-full flex flex-wrap justify-center gap-5 bg-[#00000090] p-3 rounded-xl ${
          modal ? 'block' : 'hidden'
        }`}
      >
        {foodTypes.map((foodType) => (
          <Image
            key={foodType}
            width={30}
            height={30}
            src={`/foods/${foodType}.png`}
            alt={foodType}
            onClick={() => handleEmojiChange(foodType)}
          />
        ))}
      </div>
    </>
  );
};

export default EmojiSelector;
