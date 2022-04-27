import { useState, useEffect } from 'react';
import { getCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';

import { enrollParticipant } from '../lib/records';
import Navbar from '../components/Navbar';

import { main, info, buttons } from '../styles/confirmation.module.css';

export default function Confirmation() {
  const [enr, setEnr] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const cookie = JSON.parse(
      decodeURIComponent(getCookies('enrollment').enrollment)
    );
    cookie ? setEnr(cookie) : router.push('/enrollments-extra');
  }, []);

  const submitEnrollment = () => {
    enrollParticipant(enr['email'].replaceAll('.', ','), enr).then(() =>
      router.push('/success')
    );
  };

  if (!enr) return null;

  return (
    <main className={main}>
      <Helmet>
        <title>Pixel d'Ouro 2022</title>
      </Helmet>
      <Navbar />
      <div className={info}>
        <h1>Confirmação do Registo</h1>
        <div>
          <h2>Email</h2>
          <span>{enr['email']}</span>
        </div>
        <div>
          <h2>Nome</h2>
          <span>{enr['fullname']}</span>
        </div>
        <div>
          <h2>Número de telemóvel</h2>
          <span>{enr['phone']}</span>
        </div>
        <div>
          <h2>Estatuto académico</h2>
          <span>{enr['status']}</span>
        </div>
        <div>
          <h2>Transporte</h2>
          <span>{enr['transportation']}</span>
        </div>
        <div>
          <h2>Pulseira NB</h2>
          <span>{enr['nb']}</span>
        </div>
        {enr['plusone'] === 'Sim' && (
          <div>
            <h2>Acompanhante</h2>
            <p>{enr['fullname_plusone']}</p>
            <p>{enr['phone_plusone']}</p>
            <p>{enr['email_plusone']}</p>
          </div>
        )}
        <div className={buttons}>
          <button onClick={() => router.push('/enrollments-extra')}>Voltar</button>
          <button onClick={submitEnrollment}>Confirmar</button>
        </div>
      </div>
    </main>
  );
}
