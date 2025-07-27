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
