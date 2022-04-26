

import styles from '../styles/success.module.css';


export default function Success() {
    return (
        
        <main className={styles.main}>
            <form>
                <div className={styles.title}>
                    <p>Obrigada pela tua inscrição!</p>
                </div>
                <div>
                    <p>Já te encontras inscrito para a Gala Pixel d’Ouro.</p>
                </div>

                <div>
                    <p>Qualquer dúvida por favor dirige-te à sala do NEI, ou entra em contacto connosco.</p>
                </div>
                <div className={styles.end}>
                    <p>neiaac@student.dei.uc.pt</p>
                    <p>Morada NEI/DEI</p>
                </div>
            
            </form>
        </main>

       
        
    )
}
