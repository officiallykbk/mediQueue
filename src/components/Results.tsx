import { Hospital } from '../data/hospitals';
import { HospitalCard } from './HospitalCard';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface ResultsProps {
  department: string;
  hospitals: Hospital[];
  symptomInput: string;
  sentence?: string;
}

export function Results({ department, hospitals, symptomInput, sentence }: ResultsProps) {
  if (hospitals.length === 0) {
    return (
      <div className="w-full max-w-2xl mt-8 animate-fadeInUp">
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-lg flex items-start">
          <AlertCircle className="w-6 h-6 text-amber-600 mr-4 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-amber-900 mb-1">No hospitals found</h3>
            <p className="text-amber-700 text-sm">
              We couldn't find hospitals for the <strong>{department}</strong> department. Try describing your symptoms differently.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mt-8 space-y-6 animate-fadeInUp">
      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-l-4 border-teal-500 p-6 rounded-lg flex items-start">
        <CheckCircle2 className="w-6 h-6 text-teal-600 mr-4 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold text-teal-900 mb-1">Here's what we recommend</h3>
          <p className="text-teal-700 text-sm">
            {sentence ? (
              <span>{sentence}</span>
            ) : (
              <span>
                Based on your symptoms, "<strong>{symptomInput}</strong>," the <strong>{department}</strong> department seems like the best fit.
                To help you get care faster, we've sorted the hospitals below by the shortest wait times.
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {hospitals.map((hospital, index) => (
          <HospitalCard key={hospital.name} hospital={hospital} index={index} />
        ))}
      </div>
    </div>
  );
}
