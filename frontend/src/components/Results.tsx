import { Hospital } from '../data/hospitals';
import { HospitalCard } from './HospitalCard';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useState, useMemo, useRef } from 'react';

interface ResultsProps {
  department: string;
  departmentMapped: string;
  hospitals: Hospital[];
  symptomInput: string;
  sentence?: string;
}

export function Results({ department, departmentMapped, hospitals: initialHospitals, symptomInput, sentence }: ResultsProps) {
  const [hospitals, setHospitals] = useState(initialHospitals);

  useEffect(() => {
    const interval = setInterval(() => {
      setHospitals(hs =>
        hs.map(h => ({
          ...h,
          queue: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)] as "Low" | "Medium" | "High"
        }))
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [visibleCount, setVisibleCount] = useState(3);

  const sortedHospitals = useMemo(() => {
    return [...hospitals].sort((a, b) => a.distance - b.distance);
  }, [hospitals]);

  const displayedHospitals = useMemo(() => {
    return sortedHospitals.slice(0, visibleCount);
  }, [sortedHospitals, visibleCount]);

  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < sortedHospitals.length) {
          setVisibleCount((prev) => prev + 3);
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, visibleCount, sortedHospitals.length]);

  if (!hospitals || hospitals.length === 0) {
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
          <h3 className="font-semibold text-teal-900 mb-1">Recommended Department: {departmentMapped}</h3>
          <p className="text-teal-700 text-sm">
            {sentence ? (
              <span>{sentence}</span>
            ) : (
              <span>
                Based on your symptoms, "<strong>{symptomInput}</strong>," we've sorted the hospitals by distance. The nearest options are shown first.
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid gap-5">
        {displayedHospitals.map((hospital, index) => (
          <HospitalCard
            key={hospital.name}
            hospital={hospital}
            index={index}
            isNearest={index === 0}
          />
        ))}
      </div>

      {visibleCount < sortedHospitals.length && (
        <div ref={loader} className="w-full h-10" />
      )}
    </div>
  );
}
