import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet';
import { useAuth } from '../hooks/useAuth';
import { readParticipants } from '../lib/records';
import CsvDownload from 'react-json-to-csv';

import Navbar from '../components/Navbar';

import partner from '../images/partners.png';
import styles from '../styles/nominations.module.css';
import { criterias, info } from '../utils/constants';

export default function Nominations() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [participantData, setParticipantData] = useState();

  useEffect(() => {
    if (!user) router.push('/');
    else if (user.email == 'manuelfideles77@gmail.com') {
      readParticipants().then(res => setParticipantData(res))
    }
  }, [user]);

  if (loading) return <span>A carregar...</span>;

  if (user?.email == 'manuelfideles77@gmail.com' && participantData !== undefined) {
    let partArray = []
    for (const [k, v] of Object.entries(participantData)) {
      if (v != []) {
        const v_new = Object.entries(v);
        for (let i = 0; i < v_new.length; i++) {
          if (v_new[i][0] == 'bracelet') v_new[i] = ['nb', v_new[i][1]];
          if (v_new[i][0] == 'email') v_new.splice(i, 1);
        }
        let v_new_2 = v_new.sort((a, b) => a[0].localeCompare(b[0]))
        if (v_new_2)
          partArray.push([k, v_new_2])
      }
      else partArray.push([k, v]);
    }

    return (
      <>
        <Helmet>
          <title>Pixel d'Ouro 2022</title>
        </Helmet>
        <Navbar isHome />
        <CsvDownload
          data={partArray}
          filename="participants.csv"
        />
      </>
    )
  }

  else {
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
          <h2>Nomeações já fecharam!</h2>
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
}
