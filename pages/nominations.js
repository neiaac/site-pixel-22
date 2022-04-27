import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { useAuth } from '../hooks/useAuth';

import Navbar from '../components/Navbar';

import partner from '../images/partners.png';
import styles from '../styles/nominations.module.css';
import { criterias, info } from '../utils/constants';

export default function Nominations() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user) router.push('/');
  }, [user]);

  if (loading) return <span>A carregar...</span>;

  return (
    <main className={styles.main}>
      <Helmet>
        <title>Pixel d'Ouro 2022</title>
      </Helmet>
      <Navbar isHome />
      <div className={styles.hero}>
        <div className={styles.info}>
          {info.map((text, index) => (
            <p key={index}>{text}</p>
          ))}
        </div>
      </div>
      <section className={styles.nominate}>
        <h2>Nomeações já estão abertas.</h2>
        <Link href="https://forms.gle/oKEizirKLyNSKFwf7">
          <a target="_blank">Acede aqui.</a>
        </Link>
      </section>
      <section className={styles.criteria}>
        <h2>Critérios</h2>
        <div className={styles.categories}>
          {criterias.map(({ title, description }, index) => (
            <div key={index}>
              <h4>{title}</h4>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className={styles.partners}>
        <h2>Parceiros</h2>
        <img src={partner.src} alt="partners" className={styles.center} />
      </section>
      <a
        href=""
        target="_blank"
        rel="noreferrer"
        className={styles.regulations}
        onClick={() => window.open('/documents/regulamento2022.pdf', '_blank')}
      >
        Ver o Regulamento da Gala.
      </a>
    </main>
  );
}
