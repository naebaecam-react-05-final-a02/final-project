import { ComponentProps, PropsWithChildren, useId } from 'react';

interface RadioGroupProps<T> {
  name: string;
  values: T[];
  selectedValue: T;
  handleChange: (value: T) => void;
}

const RadioGroup = <T extends string>({ name, values, selectedValue, handleChange }: RadioGroupProps<T>) => {
  return (
    <fieldset className="flex gap-2">
      {values.map((value) => (
        <Radio key={value} name={name} checked={selectedValue === value} onChange={() => handleChange(value)}>
          {value}
        </Radio>
      ))}
    </fieldset>
  );
};

interface RadioProps {
  name: string;
  checked: boolean;
}

const Radio = ({ name, checked, children, ...props }: PropsWithChildren<RadioProps> & ComponentProps<'input'>) => {
  const id = useId();
  return (
    <div>
      <input className="hidden" type="radio" id={id} name={name} checked={checked} {...props} />
      <label
        className={`border ${
          checked ? 'border-[#3ecf8e99]' : 'border-transparent'
        } inline-block rounded-lg w-full bg-transparent bg-gradient-to-b from-[#ffffff36] to-[#ffffff0f] outline-none p-3 text-white text-xs`}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
};

export default RadioGroup;
