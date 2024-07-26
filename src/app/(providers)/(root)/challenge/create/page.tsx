'use client';

import Mobile from '@/layouts/Mobile';
import Image from 'next/image';
import { useState } from 'react';
import TextInput from './_components/Input/Input';
import useInputs from './_hooks/useInputs';

const ChallengeCreatePage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [inputs, onChange, reset, setInputs] = useInputs({ title: '', content: '', startDate: '', endDate: '' });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  console.log(inputs);

  return (
    <Mobile>
      <div>
        <label htmlFor="image">
          <div className="w-full relative aspect-[4/2.5]">
            {image && imageUrl ? (
              <Image src={imageUrl} alt={'이미지'} fill style={{ objectFit: 'cover' }} />
            ) : (
              <div className=" w-full h-full bg-gray-400"></div>
            )}
          </div>
        </label>
        <input onChange={handleImageChange} id="image" name="image" type="file" accept="image/*" hidden />
        <TextInput onChange={onChange} label="챌린지 이름" name="title" value={inputs.title} />
        <TextInput onChange={onChange} label="챌린지 내용" name="content" value={inputs.content} type="textarea" />
        <h3 className="text-lg font-bold">챌린지 기간</h3>
        <div className="flex">
          <TextInput onChange={onChange} label="" name="startDate" value={inputs.startDate} type="date" />
          <p>~</p>
          <TextInput onChange={onChange} label="" name="endDate" value={inputs.endDate} type="date" />
        </div>
      </div>
    </Mobile>
  );
};

export default ChallengeCreatePage;
