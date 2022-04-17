import { useForm } from 'react-hook-form';

export default function SignForm({ handler, title, reset }) {

    const { register, errors, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        handler(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <p>Email Institucional</p>
                <input
                    id="email"
                    type="email"
                    placeholder='Ex: uc2022123456@student.uc.pt'
                    {...register('email', {
                        required: 'Email Institucional',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Email inválido. Por favor, tente outra vez.'
                        }
                    })}
                />
                {errors && (<div>{errors?.email.message}</div>)}
            </div>
            {reset ? null :
                <div>
                    <p>Password</p>
                    <input
                        id="password"
                        type="password"
                        placeholder='Password'
                        {...register('password', {
                            required: 'Por favor insira uma password',
                        })}
                    />
                    {errors?.password !== undefined && (<div>{errors.password.message}</div>)}
                </div>
            }
            <button type="submit">{title}</button>
        </form>
    )
}
