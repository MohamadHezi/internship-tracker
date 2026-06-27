import type { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
}

function Section({ title, children }: SectionProps) {
  return (
    <section className="rounded-xl border border-neutral-100 bg-white">
      <div className="border-b border-neutral-50 px-5 py-4">
        <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

export default Section;
