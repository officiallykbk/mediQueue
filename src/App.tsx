import { useState } from 'react';
import { Activity } from 'lucide-react';
import { SymptomInput } from './components/SymptomInput';
import { Results } from './components/Results';
import { getRecommendations } from './utils/recommendations';
import { Hospital } from './data/hospitals';

function App() {
  const [results, setResults] = useState<{
    department: string;
    hospitals: Hospital[];
    input: string;
  } | null>(null);

  const handleSearch = (input: string) => {
    const recommendation = getRecommendations(input);
    setResults({
      ...recommendation,
      input
    });
  };

  const handleReset = () => {
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(6,182,212,0.1),transparent_50%)]" />

      <div className="relative min-h-screen flex flex-col items-center px-4 py-12">
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl shadow-lg">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
              HealthSeek
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find the right hospital with the shortest wait time based on your symptoms
          </p>
        </div>

        {!results ? (
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
