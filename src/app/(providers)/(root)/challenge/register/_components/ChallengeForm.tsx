'use client';

import { useGetUser } from '@/hooks/auth/useUsers';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import { ChangeEvent, FormEvent, KeyboardEvent, useRef, useState } from 'react';

const MAX_LENGTH = 300;

const ChallengeForm = () => {
  const supabase = createClient();
  const { data: user } = useGetUser();
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [textAreaLength, setTextAreaLength] = useState<number>(0);

  const today = new Date(new Date().getTime() + 1000 * 60 * 60 * 9).toISOString().slice(0, 10);

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setTextAreaLength(e.target.value.length);
  };

  //TODO 유효성 검사
  //TODO hooks로 로직 따로 빼야함
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentTarget = e.currentTarget;
    const file = inputRef?.current?.files?.[0] || null;

    if (!file) return;

    const extension = file.name.split('.').slice(-1);
    const filename = `_${Math.random().toString(36).slice(2, 16)}.${extension}`;
    const res = await supabase.storage.from('challengeRegister').upload(`/${filename}`, file);

    if (!res.data) {
      console.log('FILE UPLOAD FAILED___', res);
      return;
    }

    const imageURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${res.data.fullPath}`;

    const formData = new FormData(currentTarget);

    /**
     * id,
     * title,
     * content,
     * startDate.
     * endDate,
     * isProgress,
     * createdBy -> userId
     * rating?,
     * tags?,
     * imageURL,
     * desc,
     */
    const data = {
      title: formData.get('title'),
      content: formData.get('content'),
      startDate: formData.get('startDate'),
      endDate: formData.get('endDate'),
      isProgress: true,
      createdBy: user?.id,
      imageURL,
      desc: formData.get('desc'),
    };

    const response = await supabase.from('challenges').insert(data);

    console.log('RESPONSE___', response);
  };

  const handleFileChange = async (file: File | null) => {
    if (!file) return;
    setImageURL(URL.createObjectURL(file));
  };

  console.log();

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-y-4 w-full">
      {/* 사진 */}
      <div className="w-full select-none">
        <div className="relative border-4 border-blue-400 border-dashed w-full aspect-video">
          {imageURL && <Image src={imageURL} alt="ChallengeImg" fill className="object-cover" />}
          <input
            ref={inputRef}
            id="file"
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
          />
        </div>

        <label className="w-full bg-blue-300 flex items-center justify-center  cursor-pointer" htmlFor="file">
          사진을 올려주세요.
        </label>
      </div>
      {/* 챌린지 이름 */}
      <div className="flex flex-col gap-y-2 w-full select-none">
        <label className="text-xs font-bold" htmlFor="title">
          챌린지 이름
        </label>
        <input
          className="bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
          id="title"
          name="title"
          type="text"
          placeholder="누워서 숨쉬기?"
        />
      </div>

      {/* 챌린지 내용 */}
      <div className="flex flex-col gap-y-2 w-full select-none">
        <div className="text-xs flex justify-between">
          <label className="text-xs font-bold" htmlFor="content">
            챌린지 내용
          </label>
          <p className="text-xs text-gray-300">
            <span>{`${textAreaLength}/${MAX_LENGTH}`}</span>
          </p>
        </div>
        <textarea
          maxLength={MAX_LENGTH}
          onChange={handleChangeTextArea}
          className="bg-[#f6f6f6] resize-none w-full p-[10px] placeholder:text-xs outline-none min-h-24
        focus:outline-none border-b-2 border-b-[#7b7b7b] text-xs"
          id="content"
          name="content"
          placeholder="에어컨 틀고 이불덮고 누워서 티비보기"
        />
      </div>

      {/* 챌린지 기간 */}
      <div className="flex flex-col gap-y-2 w-full select-none">
        <label className="text-xs font-bold" htmlFor="startDate">
          챌린지 기간
        </label>
        <div className="flex gap-x-1">
          <input
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
            className="flex-1 bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
            id="startDate"
            name="startDate"
            type="date"
            min={today}
            defaultValue={today}
          />
          <span>~</span>
          <input
            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
            className="flex-1 bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
            name="endDate"
            type="date"
            min={today}
          />
        </div>
      </div>

      {/* 인증 방법 */}
      <div className="flex flex-col gap-y-2 w-full select-none">
        <label className="text-xs font-bold" htmlFor="desc">
          인증 방법
        </label>
        <input
          className="bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
          id="desc"
          name="desc"
          type="text"
          placeholder="누워서 셀카를 올려주세용"
        />
      </div>

      <button type="submit" className="select-none w-full rounded-md bg-[#3ecf8e] font-bold py-2">
        입력 안해?
      </button>
    </form>
  );
};

export default ChallengeForm;
