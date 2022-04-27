import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';

export default function SignForm({ handler, title, reset }) {
  const { register, errors, handleSubmit } = useForm();
  const { loading } = useAuth();

  const onSubmit = (data) => {
    handler(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          id="email"
          type="email"
          placeholder="Email institucional"
          {...register('email', {
            required: 'Email Institucional',
            pattern: {
              value: /^\S+@\S+$/i,
              message: 'Email inválido. Por favor, tente outra vez.',
            },
          })}
        />
        {errors && <p>{errors?.email.message}</p>}
      </div>
      {reset ? null : (
        <div>
          <input
            id="password"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Por favor insira uma password',
            })}
          />
          {errors?.password && <p>{errors.password.message}</p>}
        </div>
      )}
      <button disabled={loading} type="submit">
        {loading ? 'A carregar...' : title}
      </button>
    </form>
  );
}
