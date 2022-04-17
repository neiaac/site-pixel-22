import Link from 'next/link';

import SignForm from '../components/SignForm';
import styles from '../styles/register.module.css';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const { error, signUp } = useAuth();

  return (
    <main className={styles.main}>
      <SignForm handler={signUp} title="Registar" />
      {error && <span className="error">{error}</span>}
      <div className={styles.register}>
        <span>Já está registado?</span>
        <Link href="/">
          <a>Entre aqui.</a>
        </Link>
      </div>
    </main>
  );
}
