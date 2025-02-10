import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login'; // Adicionando a importação do Login
import ForgotPassword from './components/ForgotPassword/ForgotPassword'; // Importando o componente ForgotPassword
import ClientDashboard from './components/ClientDashboard/ClientDashboard'; // Importando o ClientDashboard
import ProfileSettings from './components/ProfileSettings/ProfileSettings'; // Importando o ProfileSettings
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> {/* Rota para a página de login */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Rota para Esqueci a Senha */}
        <Route path="/client-dashboard" element={<ClientDashboard />} /> {/* Rota para o ClientDashboard */}
        <Route path="/perfil/:id" element={<ProfileSettings />} /> {/* Rota para as configurações de perfil com ID */}
      </Routes>
    </Router>
  );
}

export default App;
