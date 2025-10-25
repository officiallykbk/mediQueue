export interface Hospital {
  name: string;
  departments: string[];
  queue: "Low" | "Medium" | "High";
  location: string;
  waitTime: string;
}

export const hospitals: Hospital[] = [
  { name: "Korle-Bu Teaching Hospital", departments: ["General", "Surgery", "Emergency"], queue: "High", location: "Korle-Bu, Accra", waitTime: "2-3 hours" },
  { name: "Ridge Hospital", departments: ["General", "Maternity", "Pediatrics"], queue: "Medium", location: "Ridge, Accra", waitTime: "45-90 mins" },
  { name: "Nyaho Clinic", departments: ["General", "Cardiology"], queue: "Low", location: "Airport Residential, Accra", waitTime: "15-30 mins" },
  { name: "37 Military Hospital", departments: ["Emergency", "Cardiology", "Surgery"], queue: "High", location: "37 Station, Accra", waitTime: "1-2 hours" },
  { name: "LEKMA Hospital", departments: ["General", "Maternity", "Emergency"], queue: "Low", location: "Teshie, Accra", waitTime: "20-40 mins" },
  { name: "Tema General Hospital", departments: ["General", "Pediatrics"], queue: "Medium", location: "Tema, Greater Accra", waitTime: "30-60 mins" },
  { name: "La General Hospital", departments: ["General", "Dermatology"], queue: "Low", location: "La, Accra", waitTime: "15-30 mins" },
  { name: "Police Hospital", departments: ["Emergency", "Cardiology"], queue: "Medium", location: "Accra Central, Accra", waitTime: "40-80 mins" },
  { name: "Accra Psychiatric Hospital", departments: ["General"], queue: "Low", location: "Pantang, Accra", waitTime: "20-40 mins" },
  { name: "Koforidua Regional Hospital", departments: ["General", "Maternity"], queue: "Medium", location: "Koforidua, Eastern Region", waitTime: "30-60 mins" },
  { name: "Sunyani Municipal Hospital", departments: ["General", "Pediatrics"], queue: "Low", location: "Sunyani, Bono Region", waitTime: "20-40 mins" },
  { name: "Komfo Anokye Teaching Hospital", departments: ["General", "Emergency", "Cardiology"], queue: "High", location: "Kumasi, Ashanti Region", waitTime: "1-2 hours" },
  { name: "Cape Coast Teaching Hospital", departments: ["General", "Maternity", "Pediatrics"], queue: "Medium", location: "Cape Coast, Central Region", waitTime: "45-90 mins" },
  { name: "Ho Municipal Hospital", departments: ["General"], queue: "Low", location: "Ho, Volta Region", waitTime: "20-40 mins" },
  { name: "Tamale Teaching Hospital", departments: ["General", "Cardiology"], queue: "Medium", location: "Tamale, Northern Region", waitTime: "40-70 mins" },
  { name: "Sunyani West Hospital", departments: ["Maternity", "Pediatrics"], queue: "Low", location: "Sunyani, Bono Region", waitTime: "20-40 mins" },
  { name: "Techiman Holy Family Hospital", departments: ["General", "Emergency"], queue: "Medium", location: "Techiman, Bono East", waitTime: "30-60 mins" },
  { name: "Wenchi District Hospital", departments: ["General", "Dermatology"], queue: "Low", location: "Wenchi, Bono Region", waitTime: "20-40 mins" },
  { name: "Agogo Presbyterian Hospital", departments: ["General", "Maternity"], queue: "Medium", location: "Agogo, Ashanti Region", waitTime: "30-60 mins" },
  { name: "St. Joseph Hospital", departments: ["General", "Emergency"], queue: "High", location: "Koforidua, Eastern Region", waitTime: "1-2 hours" }
];
