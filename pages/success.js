import { Helmet } from 'react-helmet';

import Navbar from '../components/Navbar';

import Link from 'next/link';

import { main, info } from '../styles/success.module.css';

export default function Success() {
  return (
    <main className={main}>
      <Helmet>
        <title>Pixel d'Ouro 2022</title>
      </Helmet>
      <Navbar />
      <div className={info}>
        <h1>Obrigada pela tua inscrição!</h1>
        <p>Se já te inscreveste, paga presencialmente na sala do NEI (C4.3) ou paga online através do link abaixo:</p>
        <Link href="https://forms.gle/DFAw53RN9F92oJWF7">
          <a>Pagar online.</a>
        </Link>
        <div>
          <p>Qualquer dúvida por favor dirige-te à sala do NEI,</p>
          <p>ou entra em contacto connosco.</p>
        </div>
        <div>
          <p>neiaac@student.dei.uc.pt</p>
          <p>Morada NEI/DEI</p>
        </div>
      </div>
    </main>
  );
}
