"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Music from "./components/Music";
import Join from "./components/Join";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export interface LanguageContextType {
  currentLanguage: "zh" | "en";
  toggleLanguage: () => void;
}

export const LanguageContext = React.createContext<LanguageContextType>({
  currentLanguage: "zh",
  toggleLanguage: () => {},
});

export default function HomePage() {
  const [currentLanguage, setCurrentLanguage] = useState<"zh" | "en">("zh");

  const toggleLanguage = () => {
    setCurrentLanguage((prev) => (prev === "zh" ? "en" : "zh"));
  };

  useEffect(() => {
    document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  }, [currentLanguage]);

  useEffect(() => {
    // Loading animation
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    const timer = setTimeout(() => {
      document.body.style.opacity = "1";
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage }}>
      <main>
        <Navbar />
        <Hero />
        <About />
        <Music />
        <Join />
        <Contact />
        <Footer />
      </main>
    </LanguageContext.Provider>
  );
}
