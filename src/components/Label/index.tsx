import React from 'react';

export const Label = ({ children }: { children: React.ReactNode }) => {
  return (
    <label className="block text-sm">
      {children}
    </label>
  );
};
