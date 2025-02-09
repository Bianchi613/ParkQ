import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });

  const [error, setError] = useState(""); // Adicionando um estado de erro para mensagens

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetando o erro antes de enviar

    try {
      // Enviando a requisição para a API de login
      const response = await axios.post('http://localhost:3000/auth/login', {
        email: formData.email,
        senha: formData.senha,
      });

      // Verificando se o login foi bem-sucedido
      if (response.status === 200) {
        const token = response.data.access_token;
        const role = response.data.role;

        // Armazenar o token JWT no localStorage
        localStorage.setItem('token', token);

        // Redireciona conforme o perfil do usuário
        if (role === 'ADMIN') {
          navigate('/admin-dashboard');
        } else if (role === 'CLIENT') {
          navigate('/client-dashboard');
        } else {
          setError('Perfil inválido');
        }
      } else {
        setError('Erro ao fazer login');
      }
    } catch (error) {
      if (error.response) {
        // Exibe o erro específico da API, como "Usuário não encontrado"
        setError(error.response.data.message || 'Credenciais inválidas.');
      } else {
        // Exibe erro genérico caso a requisição falhe
        setError('Erro ao fazer login.');
      }
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="login-container">
      <h1>Park Q</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Senha</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required
        />

        {error && <div className="error-message">{error}</div>} {/* Exibe erro, se houver */}

        <button type="submit" className="btn">Entrar</button>

        <a href="/forgot-password" className="forgot-password">Esqueceu a senha?</a>
      </form>
    </div>
  );
}

export default Login;
