import { Search } from 'lucide-react';
import { useState } from 'react';

interface SymptomInputProps {
  onSearch: (input: string) => void;
}

export function SymptomInput({ onSearch }: SymptomInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-2xl">
          <div className="flex items-center p-6">
            <Search className="w-6 h-6 text-teal-600 mr-4 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your symptoms... (e.g., fever and cough)"
              className="flex-1 text-lg outline-none text-gray-800 placeholder-gray-400"
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 font-semibold transition-all duration-300 hover:from-teal-600 hover:to-cyan-600 active:scale-[0.99]"
          >
            Find Hospital
          </button>
        </div>
      </div>
    </form>
  );
}
