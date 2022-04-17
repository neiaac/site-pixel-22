import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../hooks/useAuth';
import SignForm from '../components/SignForm';

import styles from '../styles/register.module.css';

export default function ResetPassword() {
    const router = useRouter();
    const { user, loading, error, setError, setInfo, info, resetPassword } = useAuth();

    useEffect(() => {
        setError('');
        setInfo('');
        if (user?.emailVerified) router.push('/nominations');
    }, [user]);

    return (
        <main className={styles.main}>
            <SignForm handler={resetPassword} title="Repôr palavra-passe" reset={true} />
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
                    <span>Ainda não está registado?</span>
                    <Link href="/register">
                        <a>Registe-se aqui.</a>
                    </Link>
                </div>
            </div>
        </main>
    );
}