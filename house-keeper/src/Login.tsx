import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'; // <-- IMPORTANTE!
import './Login.css';

type FormData = {
  usuario: string;
  senha: string;
};

export default function Login() {
  const navigate = useNavigate(); // <-- INICIALIZA O HOOK

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Dados enviados:", data);

    // Se quiser validar usuário/senha aqui, pode.
    // Exemplo simples:
    if (data.usuario === "admin" && data.senha === "1234") {
      navigate('/main'); // <-- REDIRECIONA
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
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
      </form>
    </div>
  );
}