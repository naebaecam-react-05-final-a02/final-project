'use client';

import Input from '@/components/Input';
import { ChangeEvent, useState } from 'react';

type FormTextAreaType = {
  maxLength: number;
  label: string;
  name: string;
  placeholder: string;
  defaultValue?: string;
};

const ChallengeTextArea = ({ maxLength, label, name, placeholder, defaultValue }: FormTextAreaType) => {
  const [textAreaLength, setTextAreaLength] = useState<number>(0);

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > maxLength) {
      e.target.value = e.target.value.slice(0, maxLength);
    }
    setTextAreaLength(e.target.value.length);
  };

  return (
    <div className="relative w-full select-text">
      <div className="absolute top-0 right-0 text-xs flex justify-between text-white/70">
        <span>{`${textAreaLength}/${maxLength}`}</span>
      </div>
      <Input
        inputType="textarea"
        rows={10}
        label={label}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue ?? ''}
        onChange={handleChangeTextArea}
        maxLength={maxLength}
        // error={err['content']}
      />
    </div>
  );
};

export default ChallengeTextArea;
