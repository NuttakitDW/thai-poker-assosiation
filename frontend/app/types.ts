// Form data types
export interface RegistrationFormData {
  firstNameTH: string;
  lastNameTH: string;
  firstNameEN: string;
  lastNameEN: string;
  birthDate: string;
  nationality: string;
  idNumber: string;
  address: string;
  phone: string;
  email: string;
  lineId: string;
  telegram: string;
  facebook: string;
  emailVerified: boolean;
  idCardFile: File | null;
  registrationId: string;
}
