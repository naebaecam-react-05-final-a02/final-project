'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';

const MAX_LENGTH = 300;

const ChallengeForm = () => {
  const [textAreaLength, setTextAreaLength] = useState<number>(0);

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_LENGTH) {
      e.target.value = e.target.value.slice(0, MAX_LENGTH);
    }
    setTextAreaLength(e.target.value.length);
  };

  return (
    <>
      {/* 사진 */}
      <div className="bg-gray-300 border border-gray-400 w-full aspect-video">사진</div>

      {/* 챌린지 정보 */}
      <div className="flex flex-col gap-y-4 w-full">
        {/* 챌린지 이름 */}
        <div className="flex flex-col gap-y-2 w-full select-none">
          <label className="text-xs font-bold" htmlFor="title">
            챌린지 이름
          </label>
          <input
            className="bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
            id="title"
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
            placeholder="에어컨 틀고 이불덮고 누워서 티비보기"
          />
        </div>

        {/* 챌린지 기간 */}
        <div className="flex flex-col gap-y-2 w-full select-none">
          <label className="text-xs font-bold" htmlFor="start">
            챌린지 기간
          </label>
          <div className="flex gap-x-1">
            <input
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
              className="flex-1 bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
              id="start"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
            />
            <span>~</span>
            <input
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => e.preventDefault()}
              className="flex-1 bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
              id="end"
              type="date"
            />
          </div>
        </div>

        {/* 인증 방법 */}
        <div className="flex flex-col gap-y-2 w-full select-none">
          <label className="text-xs font-bold" htmlFor="howTo">
            인증 방법
          </label>
          <input
            className="bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
            id="howTo"
            type="text"
            placeholder="누워서 셀카를 올려주세용"
          />
        </div>

        <button className="select-none w-full rounded-md bg-[#3ecf8e] font-bold py-2">입력 안해?</button>
      </div>
    </>
  );
};

export default ChallengeForm;
