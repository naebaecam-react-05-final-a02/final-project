import { ComponentProps, useId } from 'react';

type InputProps = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | null;
} & Omit<ComponentProps<'input'>, 'value' | 'onChange'>;

function Input({ label, id, value, onChange, error, ...props }: InputProps) {
  const inputUid = useId();
  const inputId = id || inputUid;
  return (
    <div className="flex flex-col w-full gap-y-1.5 [&+&]:mt-4">
      {label && (
        <label htmlFor={inputId} className="text-white/70 pl-1 pb-1 text-[12px]">
          <span>{label}</span>
        </label>
      )}

      <input
        id={inputId}
        value={value}
        onChange={onChange}
        {...props}
        className={`w-full bg-transparent rounded-lg px-3 py-3.5 text-white placeholder-white/40 bg-input-gradient backdrop-blur-[10px] focus:outline-none transition focus:border-b-[2px] ${
          error ? 'border-error-gradient' : 'focus:border-gradient'
        }`}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

export default Input;
