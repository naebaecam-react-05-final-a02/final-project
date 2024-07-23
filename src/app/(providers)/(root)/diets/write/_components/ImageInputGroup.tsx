'use client';
import Image from 'next/image';
import { ChangeEvent, RefObject, useId, useState } from 'react';

interface ImageInputGroupProps {
  max: number;
  imageFilesRef: RefObject<File[]>;
}

interface ImageType {
  name: string;
  src: string;
}

const ImageInputGroup = ({ max, imageFilesRef }: ImageInputGroupProps) => {
  const [images, setImages] = useState<ImageType[]>([]);
  const id = useId();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    imageFilesRef?.current?.push(file);
    const fileName = file.name;
    const objectURL = URL.createObjectURL(file);
    setImages([...images, { name: fileName, src: objectURL }]);
  };

  return (
    <div className="flex gap-2">
      {images.length < max && (
        <div>
          <label
            className="flex justify-center items-center w-20 h-20 bg-gray-300 cursor-pointer hover:brightness-90"
            htmlFor={id}
          >
            {images.length}/{max}
          </label>
          <input id={id} type="file" accept="image/*" className="hidden" onChange={handleInputChange} />
        </div>
      )}
      {images.map((image) => (
        <div key={image.name} className="relative w-20 h-20">
          <Image className="object-cover" src={image.src} fill alt="이미지" />
        </div>
      ))}
    </div>
  );
};

export default ImageInputGroup;
