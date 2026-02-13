"use client";

import React, { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { usePathname, useRouter } from "next/navigation";

const Navbar: React.FC = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navBackground, setNavBackground] = useState("rgba(0, 0, 0, 0.9)");
  const pathname = usePathname();
  const router = useRouter();

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
    
    // If we're not on the homepage, navigate to homepage first
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    
    // Otherwise, scroll to the section on the current page
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
          <a
            href="/"
            className="logo-text"
            onClick={(e) => {
              e.preventDefault();
              router.push("/");
            }}
          >
            Columbia University Chinese A Cappella
          </a>
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
            {getText("关于我们", "About Us")}
          </a>
          <a
            href="#music"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#music");
            }}
          >
            {getText("演出回顾", "Past Performances")}
          </a>
          <a
            href="#join"
            className="nav-link"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("#join");
            }}
          >
            {getText("加入我们", "Join Us")}
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
