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
        className={`inline-block p-3 border border-black rounded cursor-pointer hover:brightness-90 ${
          checked ? 'bg-[#3ECF8E]' : 'bg-white'
        }`}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
};

export default RadioGroup;
