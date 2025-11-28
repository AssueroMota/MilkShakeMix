import React from "react";
import "./Header.scss";
import avatar from "../../assets/img/avatar/file.png";

const Header = ({ title, setSearchQuery }) => {
  return (
    <header className="admin-header">
      {/* <teste/> */}

      {/* BOTÃO HAMBÚRGUER (mobile/tablet) */}
      <button className="header-hamburger" />

      {/* LOGO + TITULO */}
      <div className="header-left">
        <h1 className="header-logo">Milk Shake Mix</h1>
        <span className="header-section">{title}</span>
      </div>

      {/* SEARCH */}
      <div className="header-search">
        <input
          type="text"
          placeholder="Buscar..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="search-icon"></span>
      </div>

      {/* USER */}
      <div className="header-user">
        <div className="user-avatar-wrapper">
          <img src={avatar} alt="User" className="user-avatar" />
        </div>

        <div className="user-info">
          <span className="user-name">George Silva</span>
          <span className="user-role">Administrador</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
