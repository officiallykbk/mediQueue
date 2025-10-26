export const symptomMap: Record<string, string> = {
  // Cardiology
  chest: "Cardiology",
  heart: "Cardiology",
  cardiac: "Cardiology",
  palpitation: "Cardiology",
  palpitations: "Cardiology",
  breathless: "Cardiology",
  hypertension: "Cardiology",
  pressure: "Cardiology",
  bp: "Cardiology",

  // Maternity
  pregnancy: "Maternity",
  pregnant: "Maternity",
  labor: "Maternity",
  labour: "Maternity",
  delivery: "Maternity",
  antenatal: "Maternity",

  // Emergency
  injury: "Emergency",
  accident: "Emergency",
  bleeding: "Emergency",
  fracture: "Emergency",
  emergency: "Emergency",
  burn: "Emergency",
  burns: "Emergency",
  poison: "Emergency",
  poisoning: "Emergency",
  stroke: "Emergency",
  unconscious: "Emergency",
  faint: "Emergency",

  // Surgery
  surgery: "Surgery",
  operation: "Surgery",
  appendicitis: "Surgery",
  appendix: "Surgery",
  hernia: "Surgery",
  wound: "Emergency",
  cut: "Emergency",

  // Pediatrics
  child: "Pediatrics",
  baby: "Pediatrics",
  infant: "Pediatrics",
  toddler: "Pediatrics",
  newborn: "Pediatrics",
  childfever: "Pediatrics",

  // Dermatology
  rash: "Dermatology",
  skin: "Dermatology",
  eczema: "Dermatology",
  acne: "Dermatology",
  hives: "Dermatology",
  allergic: "Dermatology",
  allergy: "Dermatology",

  // General
  fever: "General",
  cough: "General",
  cold: "General",
  flu: "General",
  headache: "General",
  migraine: "General",
  pain: "General",
  stomach: "General",
  stomachache: "General",
  vomit: "General",
  vomiting: "General",
  diarrhea: "General",
  diarrhoea: "General",
  malaria: "General",
};

export function matchSymptomToDepartment(userInput: string): string {
  const normalized = userInput.toLowerCase();

  for (const [keyword, department] of Object.entries(symptomMap)) {
    if (normalized.includes(keyword)) {
      return department;
    }
  }

  return "General";
}
