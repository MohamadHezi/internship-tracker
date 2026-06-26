import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
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
    'rounded-lg px-4 py-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700',

    danger:
      'bg-red-500 text-white hover:bg-red-600',

    secondary:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
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