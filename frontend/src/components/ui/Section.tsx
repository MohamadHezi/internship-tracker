import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-xs border border-gray-100">
      <h2 className="mb-4 text-lg font-bold text-gray-900 tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default Section;