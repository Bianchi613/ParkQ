import { useNavigate } from 'react-router-dom';
import './Header.css'; // Importando o CSS para o estilo

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ação para deslogar o usuário, como limpar o token de autenticação
    localStorage.removeItem('token'); // Exemplo de remoção do token do localStorage
    navigate('/login'); // Redireciona para a página de login
  };

  const handleProfile = () => {
    navigate('/perfil'); // Redireciona para a página de perfil
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>ParkQ</h1>
        <div className="header-buttons">
          <button className="profile-button" onClick={handleProfile}>
            Perfil
          </button>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
