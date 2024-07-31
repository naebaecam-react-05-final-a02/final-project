'use client';

import CheckIcon from '@/icons/CheckIcon';
import { useId } from 'react';

interface CheckboxProps {
  checked: boolean;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ checked, onChange, label }: CheckboxProps) => {
  const id = useId();
  return (
    <label htmlFor={id} className="inline-flex items-center cursor-pointer">
      <input id={id} type="checkbox" className="hidden" checked={checked} onChange={onChange} />
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-lg border-2 border-[#12f287]/20 bg-white/10
        `}
      >
        <div className={`w-5 h-5 rounded-md border border-[#12f287] bg-transparent flex items-center justify-center`}>
          <CheckIcon
            className={`transition-all duration-300 ease-in-out ${
              checked ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          />
        </div>
      </div>
      <span className="ml-1 text-white/50 hover:text-white">{label}</span>
    </label>
  );
};

export default Checkbox;
