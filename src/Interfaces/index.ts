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
  errors: Error[];
}

export interface ServerError {
  message: string;
  domain: string;
  reason: string;
}
