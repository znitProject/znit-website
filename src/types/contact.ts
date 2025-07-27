// src/types/contact.ts
export interface FormData {
  projectType: string[];
  projectTitle: string;
  projectDescription: string;
  companyName: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  selectedFile: File | null;
}

export interface ProjectType {
  value: string;
  label: string;
}

/** API에서 사용하는 타입 */
export interface ContactFormData {
  timestamp: string;
  projectType: string[];
  projectTitle: string;
  projectDescription: string;
  companyName: string;
  name: string;
  position: string;
  email: string;
  phone: string;
  ip: string;
  userAgent: string;
}
