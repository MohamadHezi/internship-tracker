import React from 'react';

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-center justify-between py-2.5 text-sm">
      <span className="font-medium text-neutral-400">{label}</span>
      <span className="font-medium text-neutral-900">{value}</span>
    </div>
  );
}

export default DetailRow;
