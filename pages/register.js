import { useEffect } from 'react';
import Link from 'next/link';

import SignForm from '../components/SignForm';
import { useAuth } from '../hooks/useAuth';

import { main, options } from '../styles/register.module.css';

export default function Register() {
  const { info, error, signUp, setError, setInfo } = useAuth();

  useEffect(() => {
    setError('');
    setInfo('');
  }, []);

  return (
    <main className={main}>
      <SignForm handler={signUp} title="Registar" reset={false} />
      {error && <span className="error">{error}</span>}
      {info && <span className="info">{info}</span>}
      <div className={options}>
        <div>
          <span>Já está registado?</span>
          <Link href="/">
            <a>Entre aqui.</a>
          </Link>
        </div>
        <div>
          <span>Esqueceu-se da password?</span>
          <Link href="/password-reset">
            <a>Repôr palavra-passe</a>
          </Link>
        </div>
      </div>
    </main>
  );
}
