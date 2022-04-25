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
        { status: '', transportation: false }
    )

    useEffect(() => {
        if (!user) router.push('/');
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
                    <button type="submit">Seguinte</button>
                </div>
            </form>
        </>
    )
}
