'use client';

import Image from 'next/image';
import { ChangeEvent, forwardRef, Ref, useState } from 'react';

type FormImageUploaderType = {
  src?: string;
};

//TODO Drag and Drop 시 gif파일 안되게 수정해야함
const FormImageUploader = forwardRef<HTMLInputElement, FormImageUploaderType>(({ src }, ref: Ref<HTMLInputElement>) => {
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
    <div className="flex flex-col gap-y-2 select-none">
      <p className="text-white/70 text-sm">이미지 추가하기</p>
      <div className="flex gap-x-2">
        {(file || src) && (
          <div className="relative size-14 rounded-lg">
            {file ? (
              <Image src={URL.createObjectURL(file)} alt="ChallengeImg" fill className="object-cover rounded-lg" />
            ) : (
              src && <Image src={src} alt="ChallengeImg" fill className="object-cover rounded-lg" />
            )}
          </div>
        )}

        <div className="size-14 select-none text-white">
          <div className="relative border-2 border-white/50 border-dashed w-full aspect-square rounded-lg">
            {isDrag && <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />}
            <label
              // onDragEnter={handleDrag}
              // onDragLeave={handleDrag}
              // onDragOver={handleDragOver}
              // onDrop={handleDrop}
              className="size-full flex items-center justify-center  cursor-pointer"
              htmlFor="file"
            >
              <div className="absolute text-5xl font-thin -top-[2px]">+</div>
              <div className="relative size-full"></div>
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
      </div>
    </div>
  );
});

FormImageUploader.displayName = 'FormImageUploader';
export default FormImageUploader;
