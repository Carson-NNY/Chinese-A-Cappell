"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Language = "zh" | "en";
type LanguageContextType = {
  currentLanguage: Language;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("zh");
  const toggleLanguage = () =>
    setCurrentLanguage((p) => (p === "zh" ? "en" : "zh"));

  useEffect(() => {
    document.documentElement.lang = currentLanguage === "zh" ? "zh-CN" : "en";
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider value={{ currentLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx)
    throw new Error("useLanguage must be used within <LanguageProvider>");
  return ctx;
}
