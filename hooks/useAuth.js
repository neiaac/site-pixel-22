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
    setLoading(true);
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
              setLoading(false);
              setError('');
              setInfo(`Foi enviado um email de verifica????o para ${email}. Carrega no link contido nesse email para verificar a tua conta e poderes aceder ao site!`);
            });
          })
          .catch((e) => {
            setError('J?? existe uma conta com esse email! Podes rep??r a tua password no bot??o abaixo.');
          });
      else setError('A sua password precisa de ter mais de 8 caracteres.')
    } else setError('Email n??o pertence ?? comunidade do DEI ou n??o termina em @student.uc.pt. Tenta outra vez.');
  }

  async function signIn({ email, password }) {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        if (userCredential.user.emailVerified) {
          setUser(userCredential.user);
          setError('');
        } else {
          setUser(null);
          setError(
            `A tua conta ainda n??o est?? verificada. Podes faz??-lo atrav??s do email que te foi enviado para o endere??o ${email}!`
          );
        }
      })
      .catch((e) => {
        setLoading(false);
        setError('Credenciais inv??lidas. Tenta outra vez, ou cria uma conta.');
      });
  }

  async function resetPassword({ email }) {
    setLoading(true);
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        setError('');
        setInfo(`Envi??mos um email para ${email} com um link para rep??r a palavra-passe!`)
        setLoading(false);
      }).catch((e) => {
        setInfo('');
        setError('Email inv??lido. Registe-se, se ainda n??o o fez, ou tente com outro email.');
        setLoading(false);
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
