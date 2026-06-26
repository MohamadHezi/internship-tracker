import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

function AuthCard({
  title,
  subtitle,
  children,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900">
        {title}
      </h1>

      <p className="mt-2 text-gray-500">
        {subtitle}
      </p>

      <div className="mt-8">
        {children}
      </div>
    </div>
  );
}

export default AuthCard;