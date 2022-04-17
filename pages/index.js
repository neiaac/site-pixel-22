import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';
import SignForm from '../components/SignForm';

import styles from '../styles/register.module.css';

export default function Login() {
  const router = useRouter();
  const { user, loading, error, signIn, setError, setInfo } = useAuth();

  useEffect(() => {
    setError('');
    setInfo('');
    if (user?.emailVerified) router.push('/nominations');
  }, [user]);

  return (
    <main className={styles.main}>
      <SignForm handler={signIn} title="Entrar" reset={false} />
      {error && <span className={styles.error}>{error}</span>}
      <div className={styles.options}>
        <div className={styles.register}>
          <span>Ainda não está registado?</span>
          <Link href="/register">
            <a>Registe-se aqui.</a>
          </Link>
        </div>
        <div className={styles.register}>
          <span>Esqueceu-se da password?</span>
          <Link href="/password-reset">
            <a>Repôr palavra-passe</a>
          </Link>
        </div>
      </div>
    </main>
  );
}
