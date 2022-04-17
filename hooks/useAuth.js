import { useState, useEffect } from 'react';
import { auth, db } from '../lib/db';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { readParticipants, updateParticipantData } from '../lib/records';
import { createContext, useContext } from 'react';

const authUserContext = createContext({
  user: {},
  loading: {},
  signUp: async () => {},
  signIn: async () => {},
  userSignOut: async () => {},
  error: '',
});

export function AuthContext({ children }) {
  const auth = useAuthProvider();
  return (
    <authUserContext.Provider value={auth}>{children}</authUserContext.Provider>
  );
}

function useAuthProvider() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [participantList, setParticipantList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readParticipants().then((res) => {
      setParticipantList(res);
    });
  }, []);

  const authStateChanged = (authState) => {
    if (!authState) {
      setLoading(false);
      return;
    }
    setLoading(true);
    setUser(auth.currentUser);
    setLoading(false);
  };

  async function signUp({ email, password }) {
    const realEmail = email.replaceAll('.', ',');
    const searchResult = Object.keys(participantList).find(
      (elem) => elem == realEmail
    );
    if (searchResult !== undefined) {
      return createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('Signed up ', userCredential.user, '!');
          const u = auth.currentUser;
          setUser(null);
          sendEmailVerification(u).then(() => {
            console.log('Sent verification email!');
            setError('Foi enviado um email de verificação para a tua conta');
          });
        })
        .catch((e) => {
          setError('Credenciais inválidas. Tenta outra vez.');
        });
    } else setError('Email não pertence à comunidade do DEI.');
  }

  async function signIn({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.emailVerified);
        if (userCredential.user.emailVerified) {
          setUser(userCredential.user);
          setError('');
        } else {
          setUser(null);
          setError(
            'A tua conta ainda não está verificada. Podes fazê-lo através do email que te foi enviado!'
          );
        }
      })
      .catch((e) => {
        setError('Credenciais inválidas. Tenta outra vez, ou cria uma conta.');
      });
  }

  const clear = () => {
    setUser(null);
    setLoading(false);
    setError('');
  };

  async function userSignOut() {
    signOut(auth).then(clear);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    signUp,
    signIn,
    userSignOut,
    error,
  };
}

export const useAuth = () => useContext(authUserContext);
