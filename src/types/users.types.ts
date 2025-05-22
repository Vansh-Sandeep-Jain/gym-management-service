export type Role = "admin" | "user" | "client" | "coach";

export interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  preferableActivity?: string;
  target?: string;
  about?: string;
  imageUrl?: string;
  fileUrls?: string[];
  rating?: number;
  specializations?: string[];
}
