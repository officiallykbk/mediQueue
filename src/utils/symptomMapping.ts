export const symptomMap: Record<string, string> = {
  fever: "General",
  cough: "General",
  cold: "General",
  flu: "General",
  headache: "General",
  pain: "General",
  stomach: "General",
  vomit: "General",
  diarrhea: "General",
  pregnancy: "Maternity",
  pregnant: "Maternity",
  labor: "Maternity",
  delivery: "Maternity",
  chest: "Cardiology",
  heart: "Cardiology",
  cardiac: "Cardiology",
  injury: "Emergency",
  accident: "Emergency",
  bleeding: "Emergency",
  fracture: "Emergency",
  emergency: "Emergency",
  surgery: "Surgery",
  operation: "Surgery",
  child: "Pediatrics",
  baby: "Pediatrics",
  infant: "Pediatrics"
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
