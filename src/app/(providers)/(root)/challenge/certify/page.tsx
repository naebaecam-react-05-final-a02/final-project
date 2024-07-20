'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

const ChallengeCertifyPage = () => {
  const [imageURL, setImageURL] = useState<string | null>(null);
  const id = useId();

  return (
    <main className="grid gap-y-6 w-full">
      {/* 챌린지 이름인가? */}
      <div className="w-full h-14 bg-[#5c5c5c] text-white text-sm flex items-center px-6 rounded-md">
        매일 유산소 챌린지
      </div>

      {/* 인증 사진 */}
      <div className="w-full select-none">
        <div className="border-2 border-dashed border-blue-400 w-full aspect-video relative">
          <input
            id={id}
            type="file"
            accept=".jpg, .jpeg, .png"
            className="hidden"
            onChange={(e) => setImageURL(URL.createObjectURL(e.target.files?.[0]!))}
          />
          {imageURL && <Image className="object-contain" src={imageURL} fill alt="이미지" />}
        </div>
        <label className="flex justify-center items-center w-full  bg-blue-200 cursor-pointer" htmlFor={id}>
          사진 업로드
        </label>
      </div>

      {/* 오늘의 소감 */}
      <div className="flex flex-col gap-y-2 w-full select-none">
        <label className="text-xs font-bold" htmlFor="title">
          한별님, 오늘 챌린지는 어떠셨나요?
        </label>
        <input
          className="bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
          id="title"
          name="title"
          type="text"
          placeholder="정말 조았습니다요"
        />
      </div>

      <button className="select-none w-full rounded-md bg-[#3ecf8e] font-bold py-2">제출하기</button>
    </main>
  );
};

export default ChallengeCertifyPage;
