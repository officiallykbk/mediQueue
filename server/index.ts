import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { hospitals, Hospital } from '../src/data/hospitals';

interface TriageRequest {
  symptoms: string;
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
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

  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("Missing GOOGLE_API_KEY");

  const model = "gemini-2.5-flash"; 
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API request failed: ${response.status} - ${errorText}`);
  }

  const data: GeminiResponse = await response.json();
  const department = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!department) throw new Error("No valid response from Gemini API");
  return department;
};


const getFallbackDepartment = (symptoms: string): string => {
  const fallbackMap: { [key: string]: string } = {
    fever: 'General',
    dizziness: 'General',
    stomach: 'Gastroenterology',
    pregnancy: 'Maternity',
    baby: 'Pediatrics',
    rash: 'Dermatology',
    bleeding: 'Emergency',
    fracture: 'Orthopedics',
    heart: 'Cardiology',
    tooth: 'Dentistry',
    eye: 'Ophthalmology',
    throat: 'ENT',
    coughblood: 'Pulmonology',
    kidney: 'Urology',
    back: 'Physiotherapy',
    anxiety: 'Psychiatry',
  };

  const lower = symptoms.toLowerCase();
  for (const k in fallbackMap) {
    if (lower.includes(k)) return fallbackMap[k];
  }
  return 'General';
};

const sortHospitals = (input: Hospital[]): Hospital[] => {
  const priority = { Low: 0, Medium: 1, High: 2 };
  return [...input].sort((a, b) => priority[a.queue] - priority[b.queue]);
};

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/triage', async (req, res) => {
  const body = req.body as TriageRequest;
  if (!body?.symptoms) return res.status(400).json({ error: 'Missing symptoms in request body' });

  let department: string;
  let aiConnected = false;

  try {
    department = await getDepartmentFromGemini(body.symptoms);
    aiConnected = true;
  } catch (err) {
    console.error('[triage] Gemini failed, using fallback:', err);
    department = getFallbackDepartment(body.symptoms);
  }

  const recommendations = sortHospitals(hospitals.filter(h => h.departments.includes(department))).slice(0, 3);
  return res.status(200).json({ department, recommendations, aiConnected });
});

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});