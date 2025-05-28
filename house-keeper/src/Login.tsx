import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.css';

type FormData = {
  usuario: string;
  senha: string;
};

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);

    if (data.usuario === "Admin" && data.senha === "1234") {
      navigate('/main');
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image" />

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-title">House Keeper</h1>

        <label htmlFor="usuario">Usuário</label>
        <input
          id="usuario"
          type="text"
          placeholder="Digite seu usuário"
          {...register('usuario', { required: "Usuário é obrigatório" })}
        />
        {errors.usuario && (
          <span className="error">{errors.usuario.message}</span>
        )}

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          {...register('senha', { required: "Senha é obrigatória" })}
        />
        {errors.senha && (
          <span className="error">{errors.senha.message}</span>
        )}

        <button type="submit">Entrar</button>

        <div className="register-container">
          <button type="button" 
          className="register-button" 
          onClick={() => navigate('/register')}>
            Cadastre-se
            </button>
            <p className="register-link-text">
              Ou clique 
              <span onClick={() => navigate('/register')}
                >aqui</span> para se cadastrar
                </p>
              </div>
      </form>
    </div>
  );
}
