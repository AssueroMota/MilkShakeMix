import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./LoginPage.scss";
import logo from "../../assets/img/logo/milkshake.svg";

const LoginPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user === "admin" && pass === "admin") {
      navigate("/produtos");  // redireciona
    } else {
      alert("Usuário ou senha incorretos!");
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        {/* LOGO */}
        <img src={logo} alt="Milk Shake Mix" className="login-logo" />

        {/* TÍTULOS */}
        <h1 className="login-title">Milk Shake Mix</h1>
        <h2 className="login-subtitle">Acessar Sistema</h2>

        {/* CAMPOS */}
        <div className="login-field">
          <label className="login-label">Nome de Usuário</label>
          <input
            type="text"
            className="login-input"
            placeholder="Digite seu usuário"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>

        <div className="login-field">
          <label className="login-label">Senha</label>
          <input
            type="password"
            className="login-input"
            placeholder="Digite sua senha"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        {/* BOTÃO */}
        <button className="login-button" onClick={handleLogin}>
          Entrar
        </button>

        {/* LINK ESQUECI SENHA */}
        <button className="login-forgot" type="button">
          Esqueci minha senha
        </button>

        <div className="login-divider" />

        <p className="login-footer">
          Sabor e diversão em cada{" "}
          <span className="login-footer-highlight">Milk Shake Mix</span> clique!
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
