import type { ReactNode } from 'react';

interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-sm rounded-2xl border border-neutral-100 bg-white p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500 text-[11px] font-bold text-white">
        IT
      </div>
      <h1 className="mt-4 text-xl font-bold tracking-tight text-neutral-900">{title}</h1>
      <p className="mt-1.5 text-sm text-neutral-500">{subtitle}</p>
      <div className="mt-7">{children}</div>
    </div>
  );
}

export default AuthCard;
