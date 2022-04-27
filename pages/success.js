import { Helmet } from 'react-helmet';

import Navbar from '../components/Navbar';

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
        <p>Já te encontras inscrito para a Gala Pixel d’Ouro.</p>
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
