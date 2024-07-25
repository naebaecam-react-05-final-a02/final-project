'use client';

import { useId } from 'react';

type FormInputType = {
  label: string;
  name: string;
  placeholder: string;
};

const FormInput = ({ label, name, placeholder }: FormInputType) => {
  const id = useId();
  return (
    <div className="flex flex-col gap-y-2 w-full select-none">
      <label className="text-xs font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        className="bg-[#f6f6f6] p-[10px] placeholder:text-xs outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
        id={id}
        name={name}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
