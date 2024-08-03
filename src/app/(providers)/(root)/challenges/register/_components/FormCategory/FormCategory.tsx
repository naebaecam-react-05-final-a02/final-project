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
      <label className="text-white/70 pl-1 text-[12px]" htmlFor={name}>
        {label}
      </label>
      <select
        defaultValue={defaultValue}
        className="bg-transparent rounded-lg bg-input-gradient text-white/40 border-r-8 border-transparent
        px-[10px]
      outline-none focus:outline-none  h-10 text-sm"
        name={name}
        id={id}
      >
        {categoryItems.map((item) => (
          <option key={item.value} className="font-bold bg-input-gradient text-black" value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormCategory;
