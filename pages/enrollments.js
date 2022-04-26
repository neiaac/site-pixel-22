import { useForm} from 'react-hook-form';
import { useEffect, useState } from 'react';
import { setCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import styles from '../styles/enrollments.module.css';

export default function Enrollments() {
    const[plusone, setPlusone] = useState();
    const router = useRouter();
    const { register, errors, handleSubmit} = useForm();
    
    const onSubmit = (data) => {
        setCookies('enrollment', JSON.stringify(data));
        router.push('/confirmation');
    }
    return (
        <main className={styles.main}>
            <h1>Inscrições</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.reg}>
                    <input id="fullname" type='text' placeholder="Nome Completo"
                        {...register('fullname', {
                            required: 'Por favor, insira o seu nome completo',
                        })} />
                    {errors?.fullname && (<div>{errors?.fullname.message}</div>)}
                    <input id="phone" type="tel" placeholder="Número de Telemóvel" {...register('phone', {
                        required: 'Por favor, insira seu número de telemóvel',
                    })} />
                    {errors?.phone !== undefined && (<div>{errors.phone.message}</div>)}
                </div>

                <div className={styles.persontype}>
                    <div>
                        <div>
                            <input type="radio" id="student" name="radio-group" value="Estudante" {...register('status')} />
                            <label htmlFor="student">Aluno</label>
                        </div>
                        <div>
                            <input type="radio" id="exstudent" name="radio-group" value="Ex-Aluno" {...register('status')} />
                            <label htmlFor="exstudent">Ex-Aluno</label>
                        </div>
                        <div>
                            <input type="radio" id="teacher" name="radio-group" value="Docente" {...register('status')} />
                            <label htmlFor="teacher">Docente</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input type="radio" id="researcher" name="radio-group" value="Investigador"{...register('status')} />
                            <label htmlFor="researcher">Investigador</label>
                        </div>
                        <div>
                            <input type="radio" id="staff" name="radio-group" value="Funcionário" {...register('status')} />
                            <label htmlFor="staff">Funcionário</label>
                        </div>
                    </div>
                </div>

                <div className={styles.bustype}>
                    <p>Precisas de transporte até à Gala?</p>
                    <div>
                        <div>
                            <input type="radio" id="yesBus" name="bus-group" value="Sim" {...register('transportation')} />
                            <label htmlFor="yesBus">Sim</label>
                        </div>
                        <div>
                            <input type="radio" id="noBus" name="bus-group" value="Não" {...register('transportation')} />
                            <label htmlFor="noBus">Não</label>
                        </div>
                    </div>
                </div>
                <div className={styles.nb}>
                    <p>Queres pulseira para o NB?</p>
                    <div>
                        <div>
                            <input type="radio" id="yesNB" name="after-group" value="Sim" {...register('nb')} />
                            <label htmlFor="yesNB">Sim</label>
                        </div>
                        <div>
                            <input type="radio" id="noNB" name="after-group" value="Não" {...register('nb')} />
                            <label htmlFor="noNB">Não</label>
                        </div>
                    </div>
                </div>
                <div className={styles.external}>
                    <p>Acompanhante externo ao DEI?</p>
                    <div>
                        <div>
                            <input type="radio" id="yesExt" name="external-comp" value="Sim" onChange={e => setPlusone(e.currentTarget.value)} {...register('plusone')} />
                            <label htmlFor="yesExt">Sim</label>
                        </div>
                        <div>
                            <input type="radio" id="noExt" name="external-comp" value="Não" onChange={e => setPlusone(e.currentTarget.value)} {...register('plusone')} />
                            <label htmlFor="noExt">Não</label>
                        </div>
                    </div>
                </div>
                {plusone==="Sim" ? (
                    <div className={styles.reg}>
                        <input id="fullname_plusone" type='text' placeholder="Nome Completo"  {...register('fullname_plusone', {
                            required: 'Por favor, insira o seu nome completo',
                        })} />
                        {errors?.fullname_plusone && (<div>{errors?.fullname_plusone.message}</div>)}
                        <input id="phone_plusone" type="tel" placeholder="Número de Telemóvel" {...register('phone_plusone', {
                            required: 'Por favor, insira seu número de telemóvel',
                        })} />
                        {errors?.phone_plusone && (<div>{errors.phone_plusone.message}</div>)}
                        <input id="email_plusone" type="email" {...register('email_plusone', {
                            required: 'Email do acompanhante',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Email inválido. Por favor, tente outra vez.'
                            }
                        })}
                        />
                        {errors?.email_plusone.message && (<div>{errors?.email_plusone.message}</div>)}
                    </div>
                ) : null}
                <div className={styles.price}>
                    <p>
                        O preço da Gala Pixel D’Ouro será de 27€ para estudantes do DEI, 30€ para Ex-estudantes e 32€ para acompanhantes.
                    </p>
                    <p>
                        Este preço inclui aperitivos, transporte, jantar, after e pulseira para NB.
                    </p>
                </div>
                <button type="submit">Seguinte</button>
            </form>
        </main>
    )
}






