import { useEffect, useState } from 'react';

interface StatusIndicatorProps {
  isConnected: boolean;
}

export function StatusIndicator({ isConnected }: StatusIndicatorProps) {
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    setShowText(true);
    const t = setTimeout(() => setShowText(false), 3000);
    return () => clearTimeout(t);
  }, [isConnected]);

  return (
    <div className="flex items-center rounded-full px-3 py-2 shadow-md border border-gray-200 animate-fadeInUp">
      <div className="relative flex items-center">
        <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-gray-400'}`} />
        {isConnected && (
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
        )}
      </div>

      <div
        className={
          `overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out ` +
          (showText ? 'max-w-[200px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0')
        }
        aria-hidden={!showText}
      >
        <span className={`text-sm font-medium ${isConnected ? 'text-emerald-700' : 'text-gray-600'}`}>
          {isConnected ? 'AI Connected' : 'Using Fallback'}
        </span>
      </div>
    </div>
  );
}
