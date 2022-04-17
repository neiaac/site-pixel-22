import { useForm } from 'react-hook-form';

export default function SignForm({ handler, title }) {

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        handler(data);
    }

    return (
        
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email"></label>
                    <input
                        id="email"
                        type='email'
                        placeholder='Email Institucional'
                        {...register('email', {
                            required: 'Email Institucional',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Email inválido. Por favor, tente outra vez.'
                            }
                        })}
                    />
                    {errors?.email && (<div>{errors?.email.message}</div>)}
                </div>
                <div>
                    <input
                        id="password"
                        type="password"
                        placeholder='Password'
                        {...register('password', {
                            required: 'Por favor insira uma password',
                            minLength: {
                                value: 8,
                                message: 'A password tem que ter pelo menos 8 caracteres',
                            },
                        })}
                    />
                    {errors?.password !== undefined && (<div>{errors.password.message}</div>)}
                </div>
                <button type="submit">{title}</button>
            </form>
    
    )
}
