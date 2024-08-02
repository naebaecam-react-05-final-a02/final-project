'use client';

import { ChangeEvent, useId, useState } from 'react';

type FormTextAreaType = {
  maxLength: number;
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
};

const FormTextArea = ({ maxLength, label, name, placeholder, defaultValue }: FormTextAreaType) => {
  const id = useId();
  const [textAreaLength, setTextAreaLength] = useState<number>(0);

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setTextAreaLength(e.target.value.length);
  };

  //TODO 스크롤바 개몬생김
  return (
    <div className="flex flex-col gap-y-2 w-full select-none">
      <div className="text-xs flex justify-between text-white/70">
        <label className="pl-1" htmlFor={name}>
          {label}
        </label>
        <p>
          <span>{`${textAreaLength}/${maxLength}`}</span>
        </p>
      </div>
      <textarea
        maxLength={maxLength}
        onChange={handleChangeTextArea}
        className="bg-transparent rounded-lg text-white placeholder-white/40 
        resize-none w-full p-3 placeholder:text-sm outline-none min-h-32
        bg-input-gradient backdrop-blur-[10px] transition
        focus:border-b-[2px] focus:border-gradient
    focus:outline-none text-sm "
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ''}
      />
    </div>
  );
};

export default FormTextArea;
