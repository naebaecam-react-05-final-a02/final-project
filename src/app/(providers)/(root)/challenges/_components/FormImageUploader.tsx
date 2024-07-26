'use client';

import Image from 'next/image';
import { ChangeEvent, forwardRef, Ref, useState } from 'react';

const FormImageUploader = forwardRef<HTMLInputElement, {}>((_, ref: Ref<HTMLInputElement>) => {
  const [file, setFile] = useState<File>();
  const [isDrag, setIsDrag] = useState<boolean>(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFile(file);
    }
  };
  const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.type === 'dragenter') setIsDrag(true);
    else setIsDrag(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);

      if (ref && typeof ref !== 'function' && ref.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(files[0]);
        ref.current.files = dataTransfer.files;
      }
    }
    setIsDrag(false);
  };
  return (
    <div className="w-full select-none">
      <div className="relative border-4 border-blue-400 border-dashed w-full aspect-video">
        {isDrag && <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />}
        <label
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="size-full flex items-center justify-center  cursor-pointer"
          htmlFor="file"
        >
          {!file && (
            <div className="absolute flex flex-col items-center gap-y-4">
              <div className="relative size-20">
                <Image src={'/drag.png'} fill className="object-cover" alt="test" />
              </div>
              <p className="text-sm font-bold text-gray-300">클릭 혹은 파일을 드래그 해주세요!!</p>
            </div>
          )}
          <div className="relative size-full">
            {file && <Image src={URL.createObjectURL(file)} alt="ChallengeImg" fill className="object-cover" />}
          </div>
          <input
            ref={ref}
            id="file"
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleFileChange(e)}
          />
        </label>
      </div>
    </div>
  );
});

FormImageUploader.displayName = 'FormImageUploader';
export default FormImageUploader;
