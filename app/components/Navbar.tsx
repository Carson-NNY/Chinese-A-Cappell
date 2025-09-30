import React, { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const Navbar: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navBackground, setNavBackground] = useState("rgba(0, 0, 0, 0.9)");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBackground("rgba(0, 0, 0, 0.98)");
      } else {
        setNavBackground("rgba(0, 0, 0, 0.9)");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  return (
    <nav className="navbar" style={{ background: navBackground }}>
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">
            Columbia University Chinese A Cappella
          </span>
        </div>
        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <a
            href="#home"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#home");
            }}
          >
            {getText("沉浸体验", "Immerse Yourself")}
          </a>
          <a
            href="#about"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#about");
            }}
          >
            {getText("历程", "Process")}
          </a>
          <a
            href="#music"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#music");
            }}
          >
            {getText("参与", "Get Involved")}
          </a>
          <a
            href="#join"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#join");
            }}
          >
            {getText("创作者", "Creators")}
          </a>
          <button className="language-toggle" onClick={toggleLanguage}>
            <span className="lang-text">{getText("EN", "中文")}</span>
          </button>
        </div>
        <div
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
