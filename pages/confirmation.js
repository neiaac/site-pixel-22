import { getCookies } from 'cookies-next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { enrollParticipant } from '../lib/records';
import { useAuth } from '../hooks/useAuth';


export default function Confirmation() {

    const [enr, setEnr] = useState();
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        router.push('/');
        /* if (!user) router.push('/');
        else {
            const cookie = JSON.parse(decodeURIComponent(getCookies('enrollment').enrollment));
            setEnr(cookie);
        } */
    }, [])

    function displayEnrollment() {
        if (enr !== undefined)
            return (
                <div>
                    <p>Nome: {enr['fullname']}</p>
                    <p>Número de telemóvel: {enr['phone']}</p>
                    <p>Estatuto académico: {enr['status']}</p>
                    <p>Transporte: {enr['transportation'] == true ? 'Sim' : 'Não'}</p>
                    <p>Pulseira para o NB: {enr['bracelet'] == true ? 'Sim' : 'Não'}</p>
                    <p>Acompanhante externo ao DEI: {
                        enr['plus_one'] == true ? <div>
                            <p>Sim</p>
                            <p>Nome do acompanhante: {enr['fullname_plusone']}</p>
                            <p>Número de telemóvel do acompanhante: {enr['phone_plusone']}</p>
                            {/* <p>Endereço de email do acompanhante: {enr['email_plusone']}</p> */}
                        </div> : 'Não'
                    }</p>
                </div>
            )
    }

    function submitEnrollment() {
        console.log(JSON.stringify(enr));
        enrollParticipant(user.email.replaceAll('.', ','), enr).then(() => router.push('/success'));
    }

    return (
        <>
            <button onClick={() => router.push('/enrollments')}>Voltar</button>
            <div>
                <h1>Confirmação da inscrição</h1>
                <p>A tua inscrição encontra-se descrita abaixo.</p>
                <p>Confere se está tudo conforme desejado.</p>
                {displayEnrollment()}
            </div>
            <button onClick={submitEnrollment}>Inscrever</button>
        </>
    )
}
