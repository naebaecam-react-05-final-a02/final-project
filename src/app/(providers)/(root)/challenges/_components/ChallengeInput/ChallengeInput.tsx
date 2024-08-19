'use client';

import Input from '@/components/Input';
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState } from 'react';

type FormInputType = {
  label: string;
  name: string;
  placeholder: string;

  error: string | undefined;
  errorHandler: Dispatch<
    SetStateAction<{
      [key: string]: string;
    }>
  >;
  maxLength?: number;
  defaultValue?: string;
  rows?: number;
};

const MAX_LENGTH = 12;

const ChallengeInput = ({
  label,
  name,
  placeholder,
  error,
  errorHandler,
  maxLength = MAX_LENGTH,
  defaultValue,
  rows = 1,
}: FormInputType) => {
  const [textAreaLength, setTextAreaLength] = useState<number>(0);

  const handleChangeInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    errorHandler((prev) => ({ ...prev, [name]: `` }));
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setTextAreaLength(e.target.value.length);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && rows === 1) {
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full ">
      <div className="absolute top-0 right-0 text-xs flex justify-between text-white/70 select-none">
        <span>{`${textAreaLength}/${maxLength}`}</span>
      </div>
      <Input
        inputType="textarea"
        label={label}
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ''}
        onChange={handleChangeInput}
        onKeyDown={handleKeyDown}
        error={error}
      />
    </div>
  );
};

export default ChallengeInput;
