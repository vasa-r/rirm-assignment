import { ChangeEvent } from "react";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  name,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
}: InputProps) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-2 py-2 bg-transparent border-2 rounded-lg outline-none border-black/20"
      />
    </div>
  );
};

export default Input;
