import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { setCookies } from 'cookies-next';
import { useRouter } from 'next/router';
import { useAuth } from '../hooks/useAuth';

export default function Enrollments() {

    const { user } = useAuth();
    const router = useRouter();
    const { register, errors, handleSubmit } = useForm();
    const [enrollment, setEnrollment] = useState(
        { status: '', transportation: false, bracelet: false, plus_one: false }
    )

    useEffect(() => {
        /* if (!user)  router.push('/'); */
    }, [])


    function handleRadioChange(e) {
        setEnrollment((prevEnrollment) => {
            let enr = { ...prevEnrollment };
            if (e.target.checked) {
                if (e.target.previousSibling.innerHTML == 'Sim') {
                    enr[e.target.name] = true;
                }
                else if (e.target.previousSibling.innerHTML == 'Não') {
                    enr[e.target.name] = false;
                }
                else enr[e.target.name] = e.target.previousSibling.innerHTML;
            }
            else enr[e.target.name] = '';
            console.log(enr);
            return enr;
        });
    }

    const onSubmit = (data) => {
        const enr = { ...enrollment, ...data };
        setCookies('enrollment', JSON.stringify(enr));
        router.push('/confirmation');
    }

    return (
        <>
            <h1>Inscrições</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="fullname">Nome Completo</label>
                    <br />
                    <input
                        id="fullname"
                        type='fullname'
                        {...register('fullname', {
                            required: 'Por favor, insira o seu nome completo',
                        })}
                    />
                    {errors?.fullname && (<div>{errors?.fullname.message}</div>)}
                </div>
                <div>
                    <label htmlFor="phone">Número de telemóvel</label>
                    <br />
                    <div>
                        <input
                            id="phone"
                            type="tel"
                            {...register('phone', {
                                required: 'Por favor, insira seu número de telemóvel',
                            })}
                        />
                        {errors?.phone !== undefined && (<div>{errors.phone.message}</div>)}
                    </div>
                </div>
                <div>
                    <label htmlFor='status'>Aluno</label>
                    <input type='radio' name='status' id='status' onChange={handleRadioChange} />
                    <label htmlFor='status'>Ex-Aluno</label>
                    <input type='radio' name='status' id='status' onChange={handleRadioChange} />
                    <label htmlFor='status'>Docente</label>
                    <input type='radio' name='status' id='status' onChange={handleRadioChange} />
                    <label htmlFor='status'>Investigador</label>
                    <input type='radio' name='status' id='status' onChange={handleRadioChange} />
                    <label htmlFor='status'>Funcionário</label>
                    <input type='radio' name='status' id='status' onChange={handleRadioChange} />
                </div>
                <div>
                    <p>Precisas de transporte até à Gala?</p>
                    <label htmlFor='transportation'>Sim</label>
                    <input type='radio' name='transportation' id='transportation' onChange={handleRadioChange} />
                    <label htmlFor='transportation'>Não</label>
                    <input type='radio' name='transportation' id='transportation' onChange={handleRadioChange} />
                </div>
                <div>
                    <p>Queres pulseira para o NB?</p>
                    <label htmlFor='bracelet'>Sim</label>
                    <input type='radio' name='bracelet' id='bracelet' onChange={handleRadioChange} />
                    <label htmlFor='bracelet'>Não</label>
                    <input type='radio' name='bracelet' id='bracelet' onChange={handleRadioChange} />
                </div>
                <div>
                    <p>Levas um acompanhante externo ao DEI?</p>
                    <label htmlFor='plus_one'>Sim</label>
                    <input type='radio' name='plus_one' id='plus_one' onChange={handleRadioChange} />
                    <label htmlFor='plus_one'>Não</label>
                    <input type='radio' name='plus_one' id='plus_one' onChange={handleRadioChange} />
                </div>
                {enrollment.plus_one ? <div>
                    <div>
                        <label htmlFor="fullname_plusone">Nome Completo</label>
                        <br />
                        <input
                            id="fullname_plusone"
                            type='fullname_plusone'
                            {...register('fullname_plusone', {
                                required: 'Por favor, insira o seu nome completo',
                            })}
                        />
                        {errors?.fullname_plusone && (<div>{errors?.fullname_plusone.message}</div>)}
                    </div>
                    <div>
                        <label htmlFor="phone_plusone">Número de telemóvel</label>
                        <br />
                        <div>
                            <input
                                id="phone_plusone"
                                type="tel"
                                {...register('phone_plusone', {
                                    required: 'Por favor, insira seu número de telemóvel',
                                })}
                            />
                            {errors?.phone_plusone !== undefined && (<div>{errors.phone_plusone.message}</div>)}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email_plusone">Email do acompanhante</label>
                        <br />
                        <input
                            id="email_plusone"
                            type="email_plusone"
                            {...register('email_plusone', {
                                required: 'Email do acompanhante',
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: 'Email inválido. Por favor, tente outra vez.'
                                }
                            })}
                        />
                        {errors && (<div>{errors?.email_plusone.message}</div>)}
                    </div>
                </div> : null}
                <div>
                    <button type="submit">Seguinte</button>
                </div>
            </form>
        </>
    )
}
