import { cva, type VariantProps } from 'class-variance-authority';

const textInputVariants = cva('h-10 pl-4 text-sm ', {
  variants: {
    intent: {
      enabled: 'bg-gray-100 text-gray-600 border-gray-500 border-b-[1px]',
      disabled: 'bg-white text-gray-900',
    },
  },
  defaultVariants: {
    intent: 'enabled',
  },
});

interface InputProps extends VariantProps<typeof textInputVariants> {
  type?: string;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  value: string | number;
}

const TextInput = ({ label, value, type = 'text', name, onChange, disabled = false }: InputProps) => {
  const intent = disabled ? 'disabled' : 'enabled';

  return (
    <div className="flex flex-col gap-2">
      <label className="text-lg font-bold" htmlFor={name}>
        {label}
      </label>
      <input
        className={textInputVariants({ intent })}
        value={value}
        id={name}
        name={name}
        onChange={onChange}
        type={type}
        disabled={disabled}
      />
    </div>
  );
};
export default TextInput;
