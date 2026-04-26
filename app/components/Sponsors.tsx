"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const Sponsors: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const getText = (zh: string, en: string) =>
    currentLanguage === "zh" ? zh : en;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sponsors--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="sponsors" ref={sectionRef}>
      <div className="sponsors-inner">
        <p className="sponsors-eyebrow">
          {getText("赞助商", "Sponsored by")}
        </p>
        <p className="sponsors-name">Bijala Cultural Foundation</p>
        <p className="sponsors-thanks">
          {getText(
            "感谢北加拉文化基金会对中文音乐与文化传播的慷慨支持。",
            "We are deeply grateful for the generous support of the Bijala Cultural Foundation in advancing Chinese music and culture."
          )}
        </p>
      </div>
    </section>
  );
};

export default Sponsors;
