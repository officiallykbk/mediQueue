import { useState } from 'react';

// Local LogoIcon replacing lucide Activity for branding
export const LogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5 8.5L8.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.5 10.5V8.5H10.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.5 13.5V15.5H13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

import { SymptomInput } from './components/SymptomInput';
import { Results } from './components/Results';
import { getRecommendations } from './utils/recommendations';
import { Hospital } from './data/hospitals';
import { StatusIndicator } from './components/StatusIndicator';
import { LoadingIndicator } from './components/LoadingIndicator';

function App() {
  const [results, setResults] = useState<{
    department: string;
    hospitals: Hospital[];
    input: string;
    aiConnected: boolean;
    sentence?: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (input: string) => {
    setIsLoading(true);
    try {
      const recommendation = await getRecommendations(input);
      setResults({
        ...recommendation,
        input,
      });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      // Optionally, set an error state here to show a message to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.1),transparent_50%)]" />
      {results && (
        <div className="absolute top-4 right-4">
          <StatusIndicator isConnected={results.aiConnected} />
        </div>
      )}
      <div className="relative min-h-screen flex flex-col items-center px-4 py-12">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
              <LogoIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              MediQueue
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find the right hospital with the shortest wait time based on your symptoms
          </p>
        </div>

        {isLoading ? (
          <LoadingIndicator />
        ) : !results ? (
          <SymptomInput onSearch={handleSearch} />
        ) : (
          <>
            <button
              onClick={handleReset}
              className="mb-6 px-6 py-3 bg-white text-teal-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 font-semibold hover:-translate-y-0.5 active:scale-95"
            >
              New Search
            </button>
            <Results
              department={results.department}
              hospitals={results.hospitals}
              symptomInput={results.input}
              sentence={results.sentence}
            />
          </>
        )}

        <footer className="mt-auto pt-12 text-center text-gray-500 text-sm">
          <p>Made for Ghanaians • Helping you find care faster</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
