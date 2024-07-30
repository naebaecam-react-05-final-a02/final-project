import { ComponentProps, ReactNode, useId } from 'react';
import { FaChevronDown } from 'react-icons/fa';

type InputProps = {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string | null;
  icon?: ReactNode;
  isDropdown?: boolean;
  dropdownOptions?: string[];
  unit?: string;
} & Omit<ComponentProps<'input'>, 'value' | 'onChange'>;

function Input({
  label,
  id,
  value,
  onChange,
  error,
  icon,
  isDropdown,
  dropdownOptions = [],
  unit,
  ...props
}: InputProps) {
  const inputUid = useId();
  const inputId = id || inputUid;

  const sharedClasses = `
    w-full bg-transparent rounded-lg text-white placeholder-white/40 
    bg-input-gradient backdrop-blur-[10px] focus:outline-none transition 
    focus:border-b-[2px] ${error ? 'border-error-gradient' : 'focus:border-gradient'}
    ${icon ? 'pl-11' : 'pl-3'} 
    ${isDropdown || unit ? 'pr-10' : 'pr-3'} 
    py-3.5
  `;

  return (
    <div className="flex flex-col w-full gap-y-1.5 [&+&]:mt-4">
      {label && (
        <label htmlFor={inputId} className="text-white/70 pl-1 pb-1 text-[12px]">
          <span>{label}</span>
        </label>
      )}

      <div className="relative flex items-center">
        {icon && <div className="absolute left-3.5 z-10 text-white/40 text-xl">{icon}</div>}

        {isDropdown ? (
          <select
            id={inputId}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLSelectElement>) => void}
            className={`${sharedClasses} appearance-none text-right pr-9`}
            {...(props as ComponentProps<'select'>)}
          >
            {dropdownOptions.map((option, index) => (
              <option
                key={index}
                value={option}
                className="bg-black/40 !bg-input-gradient backdrop-blur-[10px] text-black "
              >
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input
            id={inputId}
            value={value}
            onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
            className={sharedClasses}
            {...props}
          />
        )}

        {isDropdown && <FaChevronDown className="absolute right-3 text-white/60 pointer-events-none" />}

        {unit && !isDropdown && <span className="absolute right-3 text-white/40 text-sm">{unit}</span>}
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
}

export default Input;
