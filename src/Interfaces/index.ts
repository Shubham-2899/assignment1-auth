import { Auth, User, UserCredential } from "firebase/auth";
import { ReactNode } from "react";

export interface AuthProviderProps {
  children?: ReactNode;
}

export interface UserContextState {
  isAuthenticated: boolean;
  isLoading: boolean;
  id?: string;
}

export interface AuthContextModel {
  auth?: Auth;
  user: User | null;
  login: Boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
  logIn(email: string, password: string): Promise<void | UserCredential>;
  signUp(
    email: string,
    password: string,
    username: string
  ): Promise<UserCredential>;
  sendPasswordResetEmail?: (email: string) => Promise<void>;
  logOut(): Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
  resetPassword(email: string): Promise<void>;
}

export interface IUserData {
  username: string;
  email: string;
  password: string;
  contact_number: string;
}

export interface Errors {
  emailError: string;
  passwordError: string;
  confirmPassError: string;
  nameError: string;
  contactError: string;
}

export interface Rating {
  rate: number;
  count: number;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface ServerErrorResponse {
  code: number;
  message: string;
  errors: ServerError[];
}

export interface ServerError {
  message: string;
  domain: string;
  reason: string;
}

export interface IProducts {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IChartsData {
  category: string;
  stock: number;
}
