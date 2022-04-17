import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';
import SignForm from '../components/SignForm';
import Loading from '../components/Loading';

import styles from '../styles/register.module.css';

export default function Login() {
  const router = useRouter();
  const { user, loading, error, signIn } = useAuth();

  useEffect(() => {
    if (user?.emailVerified) router.push('/nominations');
  }, [user]);

  if (loading) return <Loading />;

  return (
    <main className={styles.main}>
      <SignForm handler={signIn} title="Entrar" />
      {error && <span className="error">{error}</span>}
      <div className={styles.register}>
        <span>Ainda não está registado?</span>
        <Link href="/register">
          <a>Regista-te aqui.</a>
        </Link>
      </div>
    </main>
  );
}
