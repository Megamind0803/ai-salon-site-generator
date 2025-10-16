
export interface SalonData {
  name: string;
  about: string;
  services: string;
  contact: string;
  theme: string;
}

export interface Service {
  name: string;
  description: string;
}

export interface GeneratedContent {
  heroHeadline: string;
  heroTagline: string;
  aboutUs: string;
  services: Service[];
}

export interface ColorTheme {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
  background: string;
}
