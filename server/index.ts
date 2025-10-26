import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { hospitals, Hospital } from './src/data/hospitals';
import { departments } from './src/data/departments';

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

const getDepartmentFromGemini = async (symptoms: string): Promise<{ department: string, sentence: string, departmentMapped: string }> => {
const prompt = `
You are a medical triage assistant for Ghana.
Read the user's symptoms and suggest the most appropriate medical department or specialist based on context.

Return a JSON object with two keys:
- "department": the recommended department, clinic, or specialist (e.g., General Medicine, Dermatology, ENT, etc.).
- "departmentMapped": the department mapped to the department in the array ${departments}.
- "sentence": a short, conversational summary of your recommendation.

Keep the response culturally appropriate for Ghanaian healthcare and concise.

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
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  if (!rawText) throw new Error("No valid response from Gemini API");

  // Clean the response to ensure it's valid JSON
  const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
  const result = JSON.parse(jsonText);

  if (!result.department || !result.departmentMapped || !result.sentence) throw new Error("Invalid JSON response from Gemini API");
  return result;
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

// Build set of departments present in hospital data and provide aliases to normalize AI outputs
const hospitalDeptSet = new Set<string>(hospitals.flatMap(h => h.departments));

const aliasMap: Record<string, string> = {
  // General
  'general': 'General',
  'general medicine': 'General',
  'internal medicine': 'General',
  'family medicine': 'General',
  'primary care': 'General',
  'gp': 'General',

  // Emergency
  'emergency': 'Emergency',
  'emergency medicine': 'Emergency',
  'er': 'Emergency',
  'a&e': 'Emergency',
  'accident and emergency': 'Emergency',
  'trauma': 'Emergency',

  // Cardiology
  'cardiology': 'Cardiology',
  'cardio': 'Cardiology',
  'heart': 'Cardiology',

  // Maternity / Obstetrics & Gynecology map to Maternity in dataset
  'maternity': 'Maternity',
  'obgyn': 'Maternity',
  'ob/gyn': 'Maternity',
  'obstetrics': 'Maternity',
  'gynecology': 'Maternity',
  'gynaecology': 'Maternity',

  // Pediatrics
  'pediatrics': 'Pediatrics',
  'paediatrics': 'Pediatrics',
  'peds': 'Pediatrics',

  // Dermatology
  'dermatology': 'Dermatology',
  'derm': 'Dermatology',
  'skin': 'Dermatology',

  // Surgery
  'surgery': 'Surgery',
  'orthopedics': 'Surgery',
  'orthopaedics': 'Surgery'
};

function mapToKnownDepartment(input: string | undefined): string {
  const s = (input || '').toLowerCase().trim();
  if (!s) return 'General';

  // Exact alias match
  if (aliasMap[s]) return aliasMap[s];

  // Exact match against known hospital departments
  for (const d of hospitalDeptSet) {
    if (d.toLowerCase() === s) return d;
  }

  // Contains-based alias match
  for (const [k, v] of Object.entries(aliasMap)) {
    if (s.includes(k)) return v;
  }

  // Contains-based match against known departments
  for (const d of hospitalDeptSet) {
    if (s.includes(d.toLowerCase())) return d;
  }

  return 'General';
}

const sortHospitals = (input: Hospital[]): Hospital[] => {
  const priority = { Low: 0, Medium: 1, High: 2 };
  return [...input].sort((a, b) => priority[a.queue] - priority[b.queue]);
};

const app = express();
const allowedOrigins = ['http://localhost:5173', 'http://localhost:4173',];
if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`);
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());

app.post('/api/triage', async (req, res) => {
  const body = req.body as TriageRequest;
  if (!body?.symptoms) return res.status(400).json({ error: 'Missing symptoms in request body' });

  let department: string;
  let sentence: string | undefined;
  let departmentMapped: string | undefined;
  let aiConnected = false;

  try {
    const result = await getDepartmentFromGemini(body.symptoms);
    department = result.department;
    sentence = result.sentence;
    departmentMapped = result.departmentMapped;
    aiConnected = true;
  } catch (err) {
    console.error('[triage] Gemini failed, using fallback:', err);
    department = getFallbackDepartment(body.symptoms);
    departmentMapped = getFallbackDepartment(body.symptoms);
  }

  const effectiveDept = mapToKnownDepartment(departmentMapped || department);
  const recommendations = sortHospitals(
    hospitals.filter(h => h.departments.some(d => d.toLowerCase() === effectiveDept.toLowerCase()))
  ).slice(0, 3);
  return res.status(200).json({ department, recommendations, aiConnected, sentence, departmentMapped: effectiveDept });
});

// if (process.env.NODE_ENV === 'production') {
//   const buildPath = path.resolve(__dirname, '../dist');
//   app.use(express.static(buildPath));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(buildPath, 'index.html'));
//   });
// }

const PORT = Number(process.env.PORT || 3001);
app.listen(PORT, () => {
  console.log(`API server listening on http://localhost:${PORT}`);
});