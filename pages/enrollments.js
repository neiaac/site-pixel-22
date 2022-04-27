import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useRouter } from 'next/router';
import { setCookies } from 'cookies-next';
import { Helmet } from 'react-helmet';

import Navbar from '../components/Navbar';

import { main, radios } from '../styles/enrollments.module.css';

export default function Enrollments() {
    const router = useRouter();
    const { register, errors, handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        setCookies('enrollment', JSON.stringify(data));
        router.push('/confirmation');
    };

    const plusone = useWatch({
        control,
        name: 'plusone',
    });

    return (
        <main className={main}>
            <Helmet>
                <title>Pixel d'Ouro 2022</title>
            </Helmet>
            <Navbar />
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    id="fullname"
                    type="text"
                    placeholder="Nome Completo"
                    {...register('fullname', {
                        required: 'Por favor, insira o seu nome completo',
                    })}
                />
                {errors?.fullname && <div>{errors?.fullname.message}</div>}
                <input
                    id="phone"
                    type="tel"
                    placeholder="Número de Telemóvel"
                    {...register('phone', {
                        required: 'Por favor, insira seu número de telemóvel',
                    })}
                />
                {errors?.phone !== undefined && <div>{errors.phone.message}</div>}

                <div className={radios}>
                    <div>
                        <div>
                            <input
                                type="radio"
                                value="Estudante"
                                id="student_status"
                                {...register('status')}
                            />
                            <label htmlFor="student_status">Aluno</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="Ex-Aluno"
                                id="exstudent_status"
                                {...register('status')}
                            />
                            <label htmlFor="exstudent_status">Ex-Aluno</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="Docente"
                                id="teacher_status"
                                {...register('status')}
                            />
                            <label htmlFor="teacher_status">Docente</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <input
                                type="radio"
                                value="Investigador"
                                id="researcher_status"
                                {...register('status')}
                            />
                            <label htmlFor="researcher_status">Investigador</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="Funcionário"
                                id="staff_status"
                                {...register('status')}
                            />
                            <label htmlFor="staff_status">Funcionário</label>
                        </div>
                    </div>
                </div>

                <div className={radios}>
                    <p>Precisas de transporte até à Gala?</p>
                    <div>
                        <div>
                            <input
                                type="radio"
                                value="Sim"
                                id="yes_transportation"
                                {...register('transportation')}
                            />
                            <label htmlFor="yes_transportation">Sim</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="Não"
                                id="no_transportation"
                                {...register('transportation')}
                            />
                            <label htmlFor="no_transportation">Não</label>
                        </div>
                    </div>
                </div>
                <div className={radios}>
                    <p>Queres pulseira para o NB?</p>
                    <div>
                        <div>
                            <input type="radio" value="Sim" id="yes_nb" {...register('nb')} />
                            <label htmlFor="yes_nb">Sim</label>
                        </div>
                        <div>
                            <input type="radio" value="Não" id="no_nb" {...register('nb')} />
                            <label htmlFor="no_nb">Não</label>
                        </div>
                    </div>
                </div>
                <div className={radios}>
                    <p>Acompanhante externo ao DEI?</p>
                    <div>
                        <div>
                            <input
                                type="radio"
                                value="Sim"
                                id="yes_plusone"
                                {...register('plusone')}
                            />
                            <label htmlFor="yes_plusone">Sim</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                value="Não"
                                id="no_plusone"
                                {...register('plusone')}
                            />
                            <label htmlFor="no_plusone">Não</label>
                        </div>
                    </div>
                </div>
                {plusone === 'Sim' && (
                    <>
                        <input
                            id="fullname_plusone"
                            type="text"
                            placeholder="Nome Completo"
                            {...register('fullname_plusone', {
                                required: 'Por favor, insira o seu nome completo',
                            })}
                        />
                        {errors?.fullname_plusone && (
                            <span>{errors?.fullname_plusone.message}</span>
                        )}
                        <input
                            id="phone_plusone"
                            type="tel"
                            placeholder="Número de Telemóvel"
                            {...register('phone_plusone', {
                                required: 'Por favor, insira seu número de telemóvel',
                            })}
                        />
                        {errors?.phone_plusone && (
                            <span>{errors.phone_plusone.message}</span>
                        )}
                        <input
                            id="email_plusone"
                            type="email"
                            placeholder="Email"
                            {...register('email_plusone', {
                                required: 'Email do acompanhante',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Email inválido. Por favor, tente outra vez.',
                                },
                            })}
                        />
                        {errors?.email_plusone.message && (
                            <span>{errors?.email_plusone.message}</span>
                        )}
                    </>
                )}
                <div>
                    <p>
                        O preço da Gala Pixel D’Ouro será de 27€ para estudantes do DEI, 30€
                        para Ex-estudantes e 32€ para acompanhantes.
                    </p>
                    <p>
                        Este preço inclui aperitivos, transporte, jantar, after e pulseira
                        para NB.
                    </p>
                </div>
                <button type="submit">Seguinte</button>
            </form>
        </main>
    );
}
