export interface Hospital {
  name: string;
  departments: string[];
  queue: "Low" | "Medium" | "High";
  location: string;
  waitTime: string;
  latitude?: number;
  longitude?: number;
  distance: number;
}

export const hospitals: Hospital[] = [
  { name: "Korle-Bu Teaching Hospital", departments: ["General", "Surgery", "Emergency"], queue: "High", location: "Korle-Bu, Accra", waitTime: "2-3 hours", distance: 5 },
  { name: "Ridge Hospital", departments: ["General", "Maternity", "Pediatrics"], queue: "Medium", location: "Ridge, Accra", waitTime: "45-90 mins", latitude: 5.5625, longitude: -0.1977, distance: 2 },
  { name: "Nyaho Clinic", departments: ["General", "Cardiology"], queue: "Low", location: "Airport Residential, Accra", waitTime: "15-30 mins", distance: 8 },
  { name: "37 Military Hospital", departments: ["Emergency", "Cardiology", "Surgery"], queue: "High", location: "37 Station, Accra", waitTime: "1-2 hours", distance: 4 },
  { name: "LEKMA Hospital", departments: ["General", "Maternity", "Emergency"], queue: "Low", location: "Teshie, Accra", waitTime: "20-40 mins", distance: 12 },
  { name: "Tema General Hospital", departments: ["General", "Pediatrics"], queue: "Medium", location: "Tema, Greater Accra", waitTime: "30-60 mins", distance: 25 },
  { name: "La General Hospital", departments: ["General", "Dermatology"], queue: "Low", location: "La, Accra", waitTime: "15-30 mins", distance: 10 },
  { name: "Police Hospital", departments: ["Emergency", "Cardiology"], queue: "Medium", location: "Accra Central, Accra", waitTime: "40-80 mins", distance: 6 },
  { name: "Accra Psychiatric Hospital", departments: ["General"], queue: "Low", location: "Pantang, Accra", waitTime: "20-40 mins", distance: 15 },
  { name: "Koforidua Regional Hospital", departments: ["General", "Maternity"], queue: "Medium", location: "Koforidua, Eastern Region", waitTime: "30-60 mins", distance: 80 },
  { name: "Sunyani Municipal Hospital", departments: ["General", "Pediatrics"], queue: "Low", location: "Sunyani, Bono Region", waitTime: "20-40 mins", distance: 300 },
  { name: "Komfo Anokye Teaching Hospital", departments: ["General", "Emergency", "Cardiology"], queue: "High", location: "Kumasi, Ashanti Region", waitTime: "1-2 hours", distance: 250 },
  { name: "Cape Coast Teaching Hospital", departments: ["General", "Maternity", "Pediatrics"], queue: "Medium", location: "Cape Coast, Central Region", waitTime: "45-90 mins", distance: 150 },
  { name: "Ho Municipal Hospital", departments: ["General"], queue: "Low", location: "Ho, Volta Region", waitTime: "20-40 mins", distance: 180 },
  { name: "Tamale Teaching Hospital", departments: ["General", "Cardiology"], queue: "Medium", location: "Tamale, Northern Region", waitTime: "40-70 mins", distance: 600 },
  { name: "Sunyani West Hospital", departments: ["Maternity", "Pediatrics"], queue: "Low", location: "Sunyani, Bono Region", waitTime: "20-40 mins", distance: 310 },
  { name: "Techiman Holy Family Hospital", departments: ["General", "Emergency"], queue: "Medium", location: "Techiman, Bono East", waitTime: "30-60 mins", distance: 400 },
  { name: "Wenchi District Hospital", departments: ["General", "Dermatology"], queue: "Low", location: "Wenchi, Bono Region", waitTime: "20-40 mins", distance: 350 },
  { name: "Agogo Presbyterian Hospital", departments: ["General", "Maternity"], queue: "Medium", location: "Agogo, Ashanti Region", waitTime: "30-60 mins", distance: 280 },
  { name: "St. Joseph Hospital", departments: ["General", "Emergency"], queue: "High", location: "Koforidua, Eastern Region", waitTime: "1-2 hours", distance: 85 }
];
