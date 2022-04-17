import Link from 'next/link';

import SignForm from '../components/SignForm';
import styles from '../styles/register.module.css';
import { useAuth } from '../hooks/useAuth';
import { useEffect } from 'react';

export default function Register() {
  const { info, error, signUp, setError, setInfo } = useAuth();

  useEffect(() => {
    setError('');
    setInfo('');
  }, [])

  return (
    <main className={styles.main}>
      <SignForm handler={signUp} title="Registar" reset={false} />
      {error && <span className={styles.error}>{error}</span>}
      {info && <span className={styles.info}>{info}</span>}
      <div className={styles.options}>
        <div className={styles.register}>
          <span>Já está registado?</span>
          <Link href="/">
            <a>Entre aqui.</a>
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
