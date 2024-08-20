'use client';

import Image from 'next/image';
import { ChangeEvent, Dispatch, forwardRef, Ref, SetStateAction, useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';
type FormImageUploaderType = {
  src?: string[];
  label?: string;
  maxImage?: number;
  error: string;
  errorHandler: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  setIsImageDel: Dispatch<boolean>;
};

const FormImageUploader = forwardRef<HTMLInputElement, FormImageUploaderType>(
  ({ src, label, maxImage = 1, error, errorHandler, setIsImageDel }, ref: Ref<HTMLInputElement>) => {
    const [filefile, setFilefile] = useState<File[]>([]);
    const [fileURLs, setFileURLs] = useState<string[]>(src ?? []);

    // const [isDrag, setIsDrag] = useState<boolean>(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
      errorHandler((prev) => ({ ...prev, image: `` }));
      setIsImageDel(false);
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

    const handleImageDel = (idx: number) => {
      // console.log('CLICK___', idx);
      setIsImageDel(true);
      setFileURLs((prev) => prev.filter((_, i) => i !== idx));
      setFilefile((prev) => prev.filter((_, i) => i !== idx));
    };

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
            <div
              className={`relative bg-custom-dashed-border border-white/50  w-full aspect-square  ${
                fileURLs.length >= maxImage ? 'opacity-10' : 'opacity-100 group'
              }`}
            >
              {/* {isDrag && <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />} */}
              <label
                // onDragEnter={handleDrag}
                // onDragLeave={handleDrag}
                // onDragOver={handleDragOver}
                // onDrop={handleDrop}
                className="size-full flex items-center justify-center  group-hover:cursor-pointer"
                htmlFor="file"
              >
                <div className="absolute text-5xl font-thin -top-[2px]">+</div>
                <div className="relative size-full"></div>
                <input
                  disabled={fileURLs.length >= maxImage}
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
              {fileURLs.length > 0 &&
                fileURLs.map((fileURL, idx) => (
                  <li className="relative size-14 rounded-lg group" key={fileURL}>
                    <div
                      onClick={() => handleImageDel(idx)}
                      className="text-white rounded-full absolute top-0 right-0 group-hover:opacity-100 opacity-0 transition cursor-pointer bg-black aspect-square z-10"
                    >
                      <MdOutlineCancel />
                    </div>
                    <Image src={fileURL} alt="T" fill className="object-cover rounded-lg" sizes="56" />
                  </li>
                ))}
            </ul>
          )}
        </div>
        {error && error.length > 0 && <div className="text-red-500 text-sm mt-1 ml-1">{error}</div>}
      </div>
    );
  },
);

FormImageUploader.displayName = 'FormImageUploader';
export default FormImageUploader;
