import React from 'react';

interface DetailRowProps {
  label: string;
  value: React.ReactNode;
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0 text-sm">
      <span className="font-medium text-gray-500">
        {label}
      </span>
      <span className="text-gray-900 font-medium">
        {value}
      </span>
    </div>
  );
}

export default DetailRow;