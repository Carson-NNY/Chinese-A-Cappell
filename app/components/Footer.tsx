import React from "react";
import { useLanguage } from "@/hooks/useLanguage";

const Footer: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  const handleLinkClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="footer-bottom">
      <p>
        &copy; 2025 Columbia University Chinese A Cappella.{" "}
        <span>{getText("保留所有权利。", "All rights reserved.")}</span>
      </p>
    </div>
  );
};

export default Footer;
