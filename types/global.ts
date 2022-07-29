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
}

export interface LogoBannerProps {
  url?: string;
  height: number;
  width: number;
  src: string;
}
