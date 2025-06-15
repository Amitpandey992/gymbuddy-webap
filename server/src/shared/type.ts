export type GenericResponse<T> = {
  success: boolean;
  data: T;
  message: string;
};

export type signupRequest = {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date;
  profilePicture: string | null;
  profession: string;
  city: string;
  state: string;
};

export type signupResponse = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date;
  profilePicture: string | null;
  profession: string;
  city: string;
  state: string;
  token: string;
};

export type loginResponse = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: Date;
  profilePicture: string | null;
  profession: string;
  city: string;
  state: string;
  token: string;
};

