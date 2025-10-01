"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const Music: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animatedElements = entry.target.querySelectorAll(".music-item");
          animatedElements.forEach((el) => {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "translateY(0)";
          });
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);

      // Initialize animation styles and hover effects
      const musicItems = sectionRef.current.querySelectorAll(".music-item");
      musicItems.forEach((item) => {
        const element = item as HTMLElement;
        element.style.opacity = "0";
        element.style.transform = "translateY(30px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

        // Add hover effects
        element.addEventListener("mouseenter", () => {
          element.style.transform = "translateY(-15px) scale(1.02)";
        });

        element.addEventListener("mouseleave", () => {
          element.style.transform = "translateY(0) scale(1)";
        });
      });
    }

    return () => observer.disconnect();
  }, []);

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  const musicData = [
    {
      image: "/spring-concert.jpg",
      alt: "2024春季音乐会演出照片",
      title: { zh: "2024春季音乐会", en: "Spring Concert 2024" },
      description: {
        zh: "中西方经典歌曲的庆典",
        en: "A celebration of Chinese and international classics",
      },
    },
    {
      image: "/cultural-festival.jpg",
      alt: "文化节演出照片",
      title: { zh: "文化节", en: "Cultural Festival" },
      description: {
        zh: "重新演绎的中国传统旋律",
        en: "Traditional Chinese melodies reimagined",
      },
    },
    {
      image: "/holiday-special.jpg",
      alt: "节日特辑演出照片",
      title: { zh: "节日特辑", en: "Holiday Special" },
      description: {
        zh: "来自世界各地的节日歌曲",
        en: "Festive songs from around the world",
      },
    },
  ];

  return (
    <section id="music" className="music" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{getText("音乐作品", "Our Music")}</h2>
          <p className="section-subtitle">
            {getText(
              "探索我们最新的演出和录音",
              "Discover our latest performances and recordings"
            )}
          </p>
        </div>
        <div className="music-grid">
          {musicData.map((item, index) => (
            <div key={index} className="music-item">
              <div className="music-image">
                <img src={item.image} alt={item.alt} className="music-image" />
              </div>
              <div className="music-info">
                <h3>{getText(item.title.zh, item.title.en)}</h3>
                <p>{getText(item.description.zh, item.description.en)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Music;
