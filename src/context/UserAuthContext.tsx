import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
  setPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import React from "react";
import {
  AuthContextModel,
  AuthProviderProps,
  UserContextState,
} from "../Interfaces";

export const UserStateContext = createContext<UserContextState>(
  {} as UserContextState
);

const userAuthContext = React.createContext<AuthContextModel>(
  {} as AuthContextModel
);

export function useAuth(): AuthContextModel {
  return useContext(userAuthContext);
}

export function UserAuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [login, setLogin] = useState(false);

  async function logIn(email: string, password: string) {
    //   const persistence = false  //remember me functionality
    //  ? auth.Persistence.LOCAL
    //  : auth.Auth.Persistence.SESSION;
    await setPersistence(auth, browserSessionPersistence);
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email: string, password: string, username: string) {
    setLogin(false);
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const values = {
    user,
    logIn,
    signUp,
    logOut,
    googleSignIn,
    login,
    setLogin,
    resetPassword,
  };

  return (
    <userAuthContext.Provider value={values}>
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
