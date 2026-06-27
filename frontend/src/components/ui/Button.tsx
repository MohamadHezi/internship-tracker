import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'danger' | 'secondary';
  isLoading?: boolean;
}

function Button({
  children,
  variant = 'primary',
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-lg px-3.5 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    secondary: 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50',
  };

  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

export default Button;
