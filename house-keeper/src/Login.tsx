import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Login.css";

type LoginData = {
  usuario: string;
  senha: string;
};

export function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const navigate = useNavigate();

  const onSubmit = (data: LoginData) => {
    console.log("Login realizado:", data);
    navigate("/home");
  };

  return (
    <div className="login-container">
      <h1 className="login-title">House Keeper</h1>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="usuario">Usuário</label>
        <input
          id="usuario"
          type="text"
          {...register("usuario", { required: "Usuário é obrigatório" })}
          placeholder="Digite seu usuário"
        />
        {errors.usuario && <span className="error">{errors.usuario.message}</span>}

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          {...register("senha", { required: "Senha é obrigatória" })}
          placeholder="Digite sua senha"
        />
        {errors.senha && <span className="error">{errors.senha.message}</span>}

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}