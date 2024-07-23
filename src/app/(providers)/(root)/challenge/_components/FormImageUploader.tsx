'use client';

import Image from 'next/image';
import { ChangeEvent, forwardRef, Ref, useState } from 'react';

const FormImageUploader = forwardRef<HTMLInputElement, {}>((_, ref: Ref<HTMLInputElement>) => {
  const [imageURL, setImageURL] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageURL(URL.createObjectURL(file));
    }
  };

  return (
    <div className="w-full select-none">
      <div className="relative border-4 border-blue-400 border-dashed w-full aspect-video">
        {imageURL && <Image src={imageURL} alt="ChallengeImg" fill className="object-cover" />}
        <input
          ref={ref}
          id="file"
          type="file"
          className="hidden"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => handleFileChange(e)}
        />
      </div>
      <label className="w-full bg-blue-300 flex items-center justify-center  cursor-pointer" htmlFor="file">
        사진을 올려주세요.
      </label>
    </div>
  );
});

FormImageUploader.displayName = 'FormImageUploader';
export default FormImageUploader;
