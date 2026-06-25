interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'danger' | 'secondary';
}

function Button({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
}: ButtonProps) {
  const base =
    'rounded-lg px-4 py-2 font-medium transition';

  const variants = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700',

    danger:
      'bg-red-500 text-white hover:bg-red-600',

    secondary:
      'bg-gray-200 hover:bg-gray-300',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}

export default Button;