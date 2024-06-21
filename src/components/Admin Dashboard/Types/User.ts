// src/types/User.ts
export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  mobile: number;
  user_types: string[];
  language: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  code_timestamps: string;
  user_tours: string[];
}
