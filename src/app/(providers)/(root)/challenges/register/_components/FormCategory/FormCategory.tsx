'use client';

import { useId } from 'react';

type FormCategoryType = {
  label: string;
  name: string;
  defaultValue?: string;
};

const categoryItems = [
  { label: 'All', value: 'all' },
  { label: 'Exercise', value: 'exercise' },
  { label: 'Diet', value: 'diet' },
  { label: 'Eco', value: 'eco' },
  { label: 'LifeStyle', value: 'lifestyle' },
  { label: 'Feeling', value: 'feeling' },
  { label: 'Habit', value: 'habit' },
];

const FormCategory = ({ label, name, defaultValue }: FormCategoryType) => {
  const id = useId();
  return (
    <div className="select-none flex flex-col gap-y-2 ">
      <label className="text-xs font-bold" htmlFor={name}>
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        className="bg-[#f6f6f6] px-[10px] font-bold
      outline-none focus:outline-none border-b-2 border-b-[#7b7b7b] h-8 text-xs"
        name={name}
        id={id}
      >
        {categoryItems.map((item) => (
          <option key={item.value} className="font-bold" value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormCategory;
