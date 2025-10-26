import React from 'react';

export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-12 h-12 border-4 border-t-4 border-gray-200 border-t-teal-500 rounded-full animate-spin"></div>
      <p className="text-gray-600">Finding the best care for you...</p>
    </div>
  );
};
