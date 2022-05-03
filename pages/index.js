import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import SignForm from '../components/SignForm';
import { useAuth } from '../hooks/useAuth';

import { main, options } from '../styles/register.module.css';

export default function Login() {
  const router = useRouter();
  const { user, error, signIn, setError, setInfo } = useAuth();

  useEffect(() => {
    setError('');
    setInfo('');
    if (user?.emailVerified) router.push('/nominations');
  }, [user]);

  return (
    <main className={main}>
      <SignForm handler={signIn} title="Entrar" reset={false} />
      {error && <span className="error">{error}</span>}
      <div className={options}>
        <div>
          <span>Ainda não está registado?</span>
          <Link href="/register">
            <a>Registe-se aqui.</a>
          </Link>
        </div>
        <div>
          <span>Esqueceu-se da password?</span>
          <Link href="/password-reset">
            <a>Repôr palavra-passe</a>
          </Link>
        </div>
        <div>
          <span>É ex-aluno do DEI, investigador ou funcionário?</span>
          <Link href="/enrollments-extra">
            <a>Inscreva-se aqui!</a>
          </Link>
        </div>
      </div>
    </main>
  );
}
