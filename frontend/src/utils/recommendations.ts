import { Hospital } from '../data/hospitals';

export async function getRecommendations(userInput: string): Promise<{
  department: string;
  departmentMapped: string;
  hospitals: Hospital[];
  sentence: string;
  aiConnected: boolean;
}> {
  try {
    const base = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    const response = await fetch(`${base}/api/triage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms: userInput }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    return {
      department: data.department,
      departmentMapped: data.departmentMapped,
      hospitals: data.recommendations,
      sentence: data.sentence,
      aiConnected: data.aiConnected,
    };
  } catch (error) {
    console.error("API call failed, falling back to local mapping:", error);

    // Fallback to a simplified local implementation if the API fails
    const { matchSymptomToDepartment } = await import('./symptomMapping');
    const department = matchSymptomToDepartment(userInput);

    const { hospitals } = await import('../data/hospitals');
    const queuePriority = { Low: 0, Medium: 1, High: 2 };

    const filteredHospitals = hospitals
      .filter(h => h.departments.includes(department))
      .sort((a, b) => {
        if (queuePriority[a.queue] !== queuePriority[b.queue]) {
          return queuePriority[a.queue] - queuePriority[b.queue];
        }
        return a.name.localeCompare(b.name);
      });

    return {
      department,
      departmentMapped: department,
      hospitals: filteredHospitals,
      sentence: "",
      aiConnected: false,
    };
  }
}
