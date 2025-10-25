import { Hospital, hospitals } from '../data/hospitals';
import { matchSymptomToDepartment } from './symptomMapping';

const queuePriority = { Low: 1, Medium: 2, High: 3 };

export function getRecommendations(userInput: string): {
  department: string;
  hospitals: Hospital[];
} {
  const department = matchSymptomToDepartment(userInput);

  const filteredHospitals = hospitals
    .filter(h => h.departments.includes(department))
    .sort((a, b) => queuePriority[a.queue] - queuePriority[b.queue]);

  return {
    department,
    hospitals: filteredHospitals
  };
}
