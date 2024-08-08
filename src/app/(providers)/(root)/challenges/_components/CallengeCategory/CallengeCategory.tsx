'use client';
import { categoryItemsKORtoENG, categoryOptions } from '@/data/challenges';
import { useState } from 'react';

type CallengeCategoryProps = {
  error?: string;
  defaultValue?: string;
};

const CallengeCategory = ({ error, defaultValue }: CallengeCategoryProps) => {
  const [selected, setSelected] = useState<string>(defaultValue ?? 'exercise');

  const handleSelected = (str: string) => {
    setSelected(str);
  };

  return (
    <div className="flex flex-col gap-y-2 select-none">
      <h6 className="text-white/70 pl-1 text-[12px]">카테고리</h6>
      <ul className="flex gap-x-2">
        {categoryOptions.map(({ value }, idx) => (
          <li key={value}>
            <label
              className={`py-1 px-[10px] rounded-md border  text-sm cursor-pointer
                ${
                  categoryItemsKORtoENG[value] === selected
                    ? 'border-primary-100 text-primary-100'
                    : 'border-white/50 text-white/50'
                }`}
              htmlFor={`radio_${idx}`}
            >
              <input
                id={`radio_${idx}`}
                type="radio"
                className="hidden"
                name="category"
                onChange={() => handleSelected(categoryItemsKORtoENG[value])}
                value={categoryItemsKORtoENG[value]}
                checked={categoryItemsKORtoENG[value] === selected}
              />

              {value}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CallengeCategory;
