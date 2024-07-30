'use client';

import { useId } from 'react';

type FormCategoryType = {
  label: string;
  name: string;
  items: {
    label: string;
    value: string;
  }[];
};

const FormCategory = ({ label, name, items }: FormCategoryType) => {
  const id = useId();
  return (
    <div className="select-none flex flex-col gap-y-2 ">
      <label className="text-xs font-bold" htmlFor={name}>
        {label}
      </label>
      <select
        className="bg-[#f6f6f6] px-[10px] font-bold
      outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
        name={name}
        id={id}
      >
        {items.map((item) => (
          <option key={item.value} className="font-bold" value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormCategory;
