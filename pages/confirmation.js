import { getCookies } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { enrollParticipant } from '../lib/records';
import { useAuth } from '../hooks/useAuth';

import styles from '../styles/confirmation.module.css';


export default function Confirmation() {

    const [enr, setEnr] = useState();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const cookie = JSON.parse(decodeURIComponent(getCookies('enrollment').enrollment));
        setEnr(cookie);
    }, [])

    function displayEnrollment() {
        if (enr !== undefined)
            return (
                <main className={styles.formul}>
                    <div>
                        <p>Nome: {enr['fullname']}</p>
                        <p>Número de telemóvel: {enr['phone']}</p>
                        <p>Estatuto académico: {enr['status']}</p>
                        <p>Transporte: {enr['transportation']}</p>
                        <p>Pulseira NB: {enr['nb']}</p>
                        <p>Acompanhante: {enr['plusone']}</p>
                    </div>
                </main>
                
            )
    }

    function submitEnrollment() {
        console.log(JSON.stringify(enr));
        enrollParticipant(user.email.replaceAll('.', ','), enr).then(() => router.push('/success'));
    }

    return (
        <>
            <button onClick={() => router.push('/enrollments')}>Voltar </button>
            <div>
                <h1>Confirmação do Registo</h1>
                <p>A tua inscrição encontra-se descrita abaixo.</p>
                <p>Confere se está tudo conforme desejado.</p>
                {displayEnrollment()}
            </div>
            <button onClick={submitEnrollment}>Confirmar</button>
        </>
    )
}
