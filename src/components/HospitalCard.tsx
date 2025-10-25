import { MapPin, Clock, Activity } from 'lucide-react';
import { Hospital } from '../data/hospitals';

interface HospitalCardProps {
  hospital: Hospital;
  index: number;
}

export function HospitalCard({ hospital, index }: HospitalCardProps) {
  const queueColors = {
    Low: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    High: 'bg-rose-100 text-rose-700 border-rose-200'
  };

  const queueDotColors = {
    Low: 'bg-emerald-500',
    Medium: 'bg-amber-500',
    High: 'bg-rose-500'
  };

  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 opacity-0 animate-fadeInUp"
      style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-1">{hospital.name}</h3>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            {hospital.location}
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full border text-sm font-semibold flex items-center gap-2 ${queueColors[hospital.queue]}`}>
          <div className={`w-2 h-2 rounded-full ${queueDotColors[hospital.queue]} animate-pulse`} />
          {hospital.queue}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-700">
          <Clock className="w-5 h-5 mr-3 text-teal-600" />
          <span className="text-sm">Wait time: <span className="font-semibold">{hospital.waitTime}</span></span>
        </div>

        <div className="flex items-start text-gray-700">
          <Activity className="w-5 h-5 mr-3 text-teal-600 mt-0.5" />
          <div className="flex flex-wrap gap-2">
            {hospital.departments.map((dept) => (
              <span
                key={dept}
                className="text-xs px-2 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-200"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
