interface StatusIndicatorProps {
  isConnected: boolean;
}

export function StatusIndicator({ isConnected }: StatusIndicatorProps) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-gray-400'}`} />
      <span className="text-sm text-gray-600">
        {isConnected ? 'AI Connected' : 'AI Disconnected'}
      </span>
    </div>
  );
}
