interface StatusIndicatorProps {
  isConnected: boolean;
}

export function StatusIndicator({ isConnected }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2 rounded-full px-4 py-2 shadow-md border border-gray-200 animate-fadeInUp">
      <div className="relative flex items-center">
        <div className={`w-2.5 h-2.5 rounded-full ${isConnected ? 'bg-emerald-500' : 'bg-gray-400'}`} />
        {isConnected && (
          <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping opacity-75" />
        )}
      </div>
      <span className={`text-sm font-medium ${isConnected ? 'text-emerald-700' : 'text-gray-600'}`}>
        {isConnected ? 'AI Connected' : 'Using Fallback'}
      </span>
    </div>
  );
}
