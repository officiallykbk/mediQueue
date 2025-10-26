export const symptomMap: Record<string, string> = {
  chest: "Cardiology",
  heart: "Cardiology",
  cardiac: "Cardiology",
  pregnancy: "Maternity",
  pregnant: "Maternity",
  labor: "Maternity",
  delivery: "Maternity",
  injury: "Emergency",
  accident: "Emergency",
  bleeding: "Emergency",
  fracture: "Emergency",
  emergency: "Emergency",
  surgery: "Surgery",
  operation: "Surgery",
  child: "Pediatrics",
  baby: "Pediatrics",
  infant: "Pediatrics",
  fever: "General",
  cough: "General",
  cold: "General",
  flu: "General",
  headache: "General",
  pain: "General",
  stomach: "General",
  vomit: "General",
  diarrhea: "General",
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
