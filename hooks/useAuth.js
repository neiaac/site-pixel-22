import { useState, useEffect } from 'react';
import { auth, db } from '../lib/db';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { readParticipants, updateParticipantData } from '../lib/records';
import { createContext, useContext } from 'react';

const authUserContext = createContext({
  user: {},
  loading: {},
  signUp: async () => { },
  signIn: async () => { },
  userSignOut: async () => { },
  resetPassword: async () => { },
  setError: () => { },
  error: '',
  setInfo: () => { },
  info: '',
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
  const [info, setInfo] = useState('');
  const [participantList, setParticipantList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setError('');
    setInfo('');
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
    setError('');
    setInfo('');
    const realEmail = email.replaceAll('.', ',');
    const searchResult = Object.keys(participantList).find(
      (elem) => elem == realEmail
    );
    if (searchResult !== undefined) {
      if (password.length > 8)
        return createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            console.log('Signed up ', userCredential.user, '!');
            const u = auth.currentUser;
            setUser(null);
            sendEmailVerification(u).then(() => {
              console.log('Sent verification email!');
              setError('');
              setInfo(`Foi enviado um email de verificação para ${email}. Carrega no link contido nesse email para verificar a tua conta e poderes aceder ao site!`);
            });
          })
          .catch((e) => {
            setError('Já existe uma conta com esse email! Podes repôr a tua password no botão abaixo.');
          });
      else setError('A sua password precisa de ter mais de 8 caracteres.')
    } else setError('Email não pertence à comunidade do DEI ou não termina em @student.uc.pt. Tenta outra vez.');
  }

  async function signIn({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user.emailVerified);
        console.log(userCredential.user);
        if (userCredential.user.emailVerified) {
          setUser(userCredential.user);
          setError('');
        } else {
          setUser(null);
          setError(
            `A tua conta ainda não está verificada. Podes fazê-lo através do email que te foi enviado para o endereço ${email}!`
          );
        }
      })
      .catch((e) => {
        setError('Credenciais inválidas. Tenta outra vez, ou cria uma conta.');
      });
  }

  async function resetPassword({ email }) {
    return sendPasswordResetEmail(auth, email)
      .then(
        setInfo(`Enviámos um email para ${email} com um link para repôr a palavra-passe!`)
      ).catch((e) => {
        setError(e);
      })
  }

  const clear = () => {
    setUser(null);
    setLoading(false);
    setError('');
    setInfo('');
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
    resetPassword,
    error,
    setError,
    setInfo,
    info,
  };
}

export const useAuth = () => useContext(authUserContext);
