import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";

import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, db } from "@/firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

interface IAuth {
  user: User | null;
  signUpUser: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logInUser: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  error: string | null;
  loading: boolean;
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUpUser: async () => {},
  logInUser: async () => {},
  signOutUser: async () => {},
  error: null,
  loading: false,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const router = useRouter();

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Logged In
          setUser(user);
          setLoading(false);
        } else {
          // Not logged in
          setUser(null);
          setLoading(true);
          router.push("/login");
        }

        setInitialLoading(false);
      }),
    [auth]
  );

  const signUpUser = async (email: string, password: string, firstName: string, lastName: string) => {
    setLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        // setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));

    // Create 'users' collection in Firestore and upload user data
    const currentAuth = getAuth();
    const user = currentAuth.currentUser;
    const userDocRef = doc(db, "users", user!.uid);

    await setDoc(userDocRef, {
      firstName: firstName,
      lastName: lastName,
      email: email
    })

  };

  const logInUser = async (email: string, password: string) => {
    setLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        router.push("/");
        // setLoading(false);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const signOutUser = async () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => alert(error.message))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      signUpUser,
      logInUser,
      signOutUser,
      loading,
      error,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
