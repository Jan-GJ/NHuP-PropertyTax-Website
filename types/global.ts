export interface ZipApiResponse {
  state: string;
  city: string;
  zip: string;
}

export interface Input {
  title?: string | JSX.Element;
  placeholder?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
  pattern?: string;
  allowedCharsRegExp?: RegExp;
  allowedEndResults?: string | string[];
  suggestions?: string[];
  maxSuggestions?: number;
  maxLength?: number;
  loading?: boolean;
  isCorrectState: any;
  valueState: any;
  errorState: any;
  width?: string;
}

export const federalStates = [
  "Bayern",
  "Berlin",
  "Baden-Würtemberg",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Rheinland-Pfalz",
  "Nordrhein-Westfalen",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
  "Niedersachsen",
  "Thüringen",
];
