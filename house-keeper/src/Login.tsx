import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';

type FormData = {
  usuario: string;
  senha: string;
};
const API_LOGIN_URL = 'http://localhost:8080/login';

export default function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setLoginError(null);
    
    const loginRequest = {
        userName: data.usuario,
        password: data.senha
    };

    try {
        const response = await fetch(API_LOGIN_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginRequest)
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || "Usuário ou senha inválidos");
        }
        
        localStorage.setItem('jwt_token', responseData.acess_token);
        
        navigate('/home');

    } catch (error: any) {
        setLoginError(error.message);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image" />

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="login-title">House Keeper</h1>

        <label htmlFor="usuario">Usuário (Email)</label>
        <input
          id="usuario"
          type="text"
          placeholder="Digite seu usuário ou email"
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
        
        {loginError && (
          <span className="error">{loginError}</span>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>

        <div className="signup-section">
          <button 
            type="button" 
            className="signup-button" 
            onClick={() => navigate('/register')}
          >
            Cadastre-se
          </button>
          <p className="signup-text">
            Ou clique 
            <span 
              className="signup-link"
              onClick={() => navigate('/register')}
            >
              aqui
            </span> para se cadastrar
          </p>
        </div>
      </form>
    </div>
  );
}