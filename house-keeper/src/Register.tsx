import { useForm } from 'react-hook-form';
import './Register.css';

interface RegisterFormData {
  nome: string;
  sobrenome: string;
  telefone: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    if (data.senha !== data.confirmarSenha) {
      alert('As senhas não coincidem');
      return;
    }
    console.log('Dados de registro:', data);
  };

  return (
    <div className="register-container">
      <div className="register-left" />

      <div className="register-right">
        <h1>Crie uma conta</h1>
        <p>Pronto para adicionar um novo aliado à sua casa?</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Nome"
              {...register('nome', { required: 'Nome é obrigatório' })}
            />
            <input
              type="text"
              placeholder="Sobrenome"
              {...register('sobrenome', { required: 'Sobrenome é obrigatório' })}
            />
          </div>

          <input
            type="tel"
            placeholder="Telefone"
            {...register('telefone', { required: 'Telefone é obrigatório' })}
          />
          <input
            type="email"
            placeholder="Email"
            {...register('email', { required: 'Email é obrigatório' })}
          />
          <input
            type="password"
            placeholder="Senha"
            {...register('senha', { required: 'Senha é obrigatória' })}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            {...register('confirmarSenha', { required: 'Confirme sua senha' })}
          />

          <button type="submit" className="btn-register">Cadastrar</button>

          <div className="btn-socials">
            <button type="button">Google</button>
            <button type="button">Tuya</button>
          </div>

          <p className="login-link">Já tem uma conta? <a href="/login">Faça login</a>
          </p>
        </form>
      </div>
    </div>
  );
}
