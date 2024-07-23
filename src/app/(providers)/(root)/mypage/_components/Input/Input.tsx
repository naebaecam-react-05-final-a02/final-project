interface InputProps {
  type?: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  disabled?: boolean;
  value: string | number;
}

const Input = ({ value, type = 'text', name, onChange, disabled = false }: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{name}</label>
      <input value={value} id={name} name={name} onChange={onChange} type={type} disabled={disabled} />
    </div>
  );
};

export default Input;
