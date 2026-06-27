import type { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`w-full rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-1 focus:ring-blue-400 ${className}`}
    />
  );
}

export default Input;
