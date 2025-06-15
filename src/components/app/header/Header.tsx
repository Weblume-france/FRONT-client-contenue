import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "../login-button/LoginButton";
import LoginModal from "../login-modal/LoginModal";
import "./header.scss";

const isMobile = () => {
  return window.innerWidth <= 768;
};

const Header: React.FC = () => {
  const [mobileView, setMobileView] = useState(isMobile());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setMobileView(isMobile());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    handleRefresh();
    navigate("/");
  };

  const isLoggedIn = () => {
    return sessionStorage.getItem("token") !== null;
  };

  if (mobileView) {
    return null;
  }

  return (
    <div className="header">
      {isLoggedIn() ? (
        <nav className="navbar">
          <ul>
            <li>
              <a href="/dashboard">Accueil</a>
            </li>
            <li>
              <a href="/prestations">Prestations</a>
            </li>
            <li>
              <a href="/products">Produits</a>
            </li>
            <li>
              <a href="/event">Evenement</a>
            </li>
            <li>
              <a href="/promo">Promo</a>
            </li>
            <li>
              <a href="/articles">Articles</a>
            </li>
            <li>
              <a href="/mea">Mis en avant</a>
            </li>
            <li>
              <button className="Btn" onClick={handleLogOut}>
                <div className="sign">
                  <svg viewBox="0 0 512 512">
                    <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                  </svg>
                </div>
                <div className="text">Logout</div>
              </button>
            </li>
          </ul>
        </nav>
      ) : (
        <div className="connexion">
          <LoginButton onClick={openModal} />
        </div>
      )}

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Header;
