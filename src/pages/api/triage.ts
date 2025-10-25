import { hospitals, Hospital } from '../../data/hospitals';

interface TriageRequest {
  symptoms: string;
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

const getDepartmentFromGemini = async (symptoms: string): Promise<string> => {
  const prompt = `
    You are a medical triage assistant for Ghana.
    Read the user's symptoms and return ONLY the hospital department that should handle it.
    Possible departments: General, Emergency, Cardiology, Maternity, Pediatrics, Dermatology.
    Respond with ONE WORD ONLY — the department.

    Symptoms: ${symptoms}
  `;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GOOGLE_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: prompt,
        }],
      }],
    }),
  });

  if (!response.ok) {
    throw new Error('Gemini API request failed');
  }

  const data: GeminiResponse = await response.json();
  return data.candidates[0].content.parts[0].text.trim();
};

const getFallbackDepartment = (symptoms: string): string => {
  const fallbackMap: { [key:string]: string } = {
    fever: "General",
    cough: "General",
    pregnancy: "Maternity",
    chest: "Cardiology",
    injury: "Emergency",
    baby: "Pediatrics",
    rash: "Dermatology"
  };

  const lowerCaseSymptoms = symptoms.toLowerCase();
  for (const keyword in fallbackMap) {
    if (lowerCaseSymptoms.includes(keyword)) {
      return fallbackMap[keyword];
    }
  }
  return 'General';
};

const sortHospitals = (hospitals: Hospital[]): Hospital[] => {
  const priority = { "Low": 0, "Medium": 1, "High": 2 };
  return [...hospitals].sort((a, b) => priority[a.queue] - priority[b.queue]);
};

export default async function handler(req: { body: TriageRequest }, res: { status: (arg0: number) => { json: (arg0: { department?: string; recommendations?: Hospital[]; error?: string; aiConnected?: boolean; }) => void; }; }) {
  if (!req.body.symptoms) {
    res.status(400).json({ error: "Missing symptoms in request body" });
    return;
  }

  const { symptoms } = req.body;
  let department: string;
  let aiConnected = false;
  try {
    department = await getDepartmentFromGemini(symptoms);
    aiConnected = true;
  } catch (err) {
    console.error(err);
    department = getFallbackDepartment(symptoms);
  }

  const recommendations = sortHospitals(hospitals.filter(h => h.departments.includes(department))).slice(0, 3);

  res.status(200).json({ department, recommendations, aiConnected });
}
