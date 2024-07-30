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

  return (
    <div className="flex flex-col gap-y-2 w-full select-none">
      <div className="text-xs flex justify-between">
        <label className="text-xs font-bold" htmlFor={name}>
          {label}
        </label>
        <p className="text-xs text-gray-300">
          <span>{`${textAreaLength}/${maxLength}`}</span>
        </p>
      </div>
      <textarea
        maxLength={maxLength}
        onChange={handleChangeTextArea}
        className="bg-[#f6f6f6] resize-none w-full p-[10px] placeholder:text-xs outline-none min-h-24
    focus:outline-none border-b-2 border-b-[#7b7b7b] text-xs"
        id={id}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ''}
      />
    </div>
  );
};

export default FormTextArea;
