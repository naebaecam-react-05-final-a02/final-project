interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: number;
}

const Input = ({ value, name, onChange }: InputProps) => {
  return (
    <input
      onChange={onChange}
      className="flex justify-center items-center w-12 h-10 rounded-xl border-2 border-[#504f55] exerciseInput input-bg
      focus:outline-none focus:border-[#12F287] text-semibold"
      name={name}
      type="number"
      value={value}
    />
  );
};

export default Input;
