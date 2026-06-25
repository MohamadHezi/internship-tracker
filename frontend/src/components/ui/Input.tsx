import type { InputHTMLAttributes } from 'react';

type InputProps =
  InputHTMLAttributes<HTMLInputElement>;

function Input({
  className = '',
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 ${className}`}
    />
  );
}

export default Input;