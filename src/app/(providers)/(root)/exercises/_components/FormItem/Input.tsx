interface InputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: number | null;
}

const Input = ({ value, name, onChange }: InputProps) => {
  return (
    <div className="relative">
      <div className="box-border absolute inset-0 rounded-xl border-2 border-white/10 -z-10"></div>
      <input
        onChange={onChange}
        className="flex justify-center items-center w-12 h-10 rounded-xl  exerciseInput input-bg text-center
      focus:outline-none focus:border-[#12F287] text-semibold text-white appearance-none"
        name={name}
        type="text"
        value={value ?? ''}
        placeholder="0"
      />
    </div>
  );
};

export default Input;
