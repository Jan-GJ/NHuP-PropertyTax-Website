export interface ZipApiResponse {
  state: string;
  city: string;
  zip: string;
}

export interface InputProps {
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
  nonEditable?: boolean;
}

export interface ButtonProps {
  name: string;
  onClick?: any;
  disabled?: boolean;
  loading?: boolean;
}

export interface CardProps {
  children: any;
  title: string;
  headerRight?: any;
}

export interface LogoBannerProps {
  url?: string;
  height: number;
  width: number;
  src: string;
}

export const preRegistrationWorkbooks = [
  { name: "Bundesmodell", url: "https://hilfe.grundsteuer-digital.de/wp-content/uploads/2022/05/Vorerfassungsbogen-Bundesmodell-2.5-1.xlsx" },
  { name: "Bayern", url: "https://hilfe.grundsteuer-digital.de/wp-content/uploads/2022/05/Vorerfassungsbogen-Bayern-2.5.xlsx" },
  { name: "Baden Württemberg", url: "https://hilfe.grundsteuer-digital.de/wp-content/uploads/2022/06/Vorerfassungsbogen-Baden-Wuerttemberg-2.5.xlsx" },
  { name: "Hamburg", url: "https://hilfe.grundsteuer-digital.de/wp-content/uploads/2022/05/Vorerfassungsbogen-Hamburg-2.5.xlsx" },
  { name: "Hessen", url: "https://hilfe.grundsteuer-digital.de/wp-content/uploads/2022/05/Vorerfassungsbogen-Hessen-2.5.xlsx" },
  { name: "Niedersachsen", url: "https://hilfe.grundsteuer-digital.de/wp-content/uploads/2022/05/Vorerfassungsbogen-Niedersachsen-2.5.xlsx" },
];
