'use client';

import Image from 'next/image';
import { ChangeEvent, forwardRef, Ref, useEffect, useState } from 'react';

type FormImageUploaderType = {
  src?: string;
  label?: string;
  maxImage?: number;
};

const FormImageUploader = forwardRef<HTMLInputElement, FormImageUploaderType>(
  ({ src, label, maxImage = 1 }, ref: Ref<HTMLInputElement>) => {
    const [filefile, setFilefile] = useState<File[]>([]);
    const [fileURLs, setFileURLs] = useState<string[]>([]);

    // const [isDrag, setIsDrag] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files;
      let tmpFileURLs = [...fileURLs];

      if (file) {
        // console.log('HANDLE FILE CHANGE FILE___', file);
        const url = URL.createObjectURL(file[0]);
        tmpFileURLs.push(url);
        setFileURLs(tmpFileURLs);
        setFilefile((prev) => [...prev, e.target.files![0]]);
      }
    };

    useEffect(() => {
      if (ref && typeof ref !== 'function' && ref.current) {
        if (fileURLs.length > maxImage) {
          setFileURLs((prev) => prev.slice(-maxImage));
          setFilefile((prev) => prev.slice(-maxImage));
        }
        const dttt = new DataTransfer();
        // console.log('USE EFFECT FILEFILE___', filefile);
        filefile.forEach((f) => dttt.items.add(f));
        // console.log('USE EFFECT DTTTT___', dttt);
        ref.current.files = dttt.files;
        // console.log('USE EFFECT REF CURRENT FILES___', ref.current.files);
      }
    }, [filefile, ref, fileURLs, maxImage]);

    // 드래그앤 드롭
    // {
    //   const handleDrag = (e: React.DragEvent<HTMLLabelElement>) => {
    //     e.preventDefault();
    //     if (e.type === 'dragenter') setIsDrag(true);
    //     else setIsDrag(false);
    //   };

    //   const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    //     e.preventDefault();
    //   };
    //   const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    //     e.preventDefault();
    //     const files = e.dataTransfer?.files;
    //     if (files && files[0]) {
    //       setFile(files[0]);

    //       if (ref && typeof ref !== 'function' && ref.current) {
    //         const dataTransfer = new DataTransfer();
    //         dataTransfer.items.add(files[0]);
    //         ref.current.files = dataTransfer.files;
    //       }
    //     }
    //     setIsDrag(false);
    //   };

    // }
    return (
      <div className="flex flex-col gap-y-2 select-none">
        <p className="text-white/70 text-sm">{label}</p>
        <div className="flex gap-x-2 w-fit">
          {/* {(file || src) && (
            <div className="relative size-14 rounded-lg">
              {file ? (
                <Image src={URL.createObjectURL(file)} alt="ChallengeImg" fill className="object-cover rounded-lg" />
              ) : (
                src && <Image src={src} alt="ChallengeImg" fill className="object-cover rounded-lg" />
              )}
            </div>
          )} */}

          <div className="size-14 select-none text-white">
            <div className="relative border-2 border-white/50 border-dashed w-full aspect-square rounded-lg">
              {/* {isDrag && <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />} */}
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
                  multiple
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

          {(filefile || src) && (
            <ul className="relative size-14 rounded-lg flex flex-1 gap-x-2 w-fit">
              {fileURLs.map((fileURL) => (
                <li className="relative size-14 rounded-lg" key={fileURL}>
                  <Image src={fileURL} alt="T" fill className="object-cover rounded-lg" />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
);

FormImageUploader.displayName = 'FormImageUploader';
export default FormImageUploader;
