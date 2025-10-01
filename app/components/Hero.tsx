"use client";

import React, { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const Hero: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const heroImageRef = useRef<HTMLDivElement>(null);
  const curvedTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;

      // Parallax effect for hero image
      if (heroImageRef.current) {
        const speed = 0.1;
        const parallaxOffset = scrolled * speed;
        heroImageRef.current.style.transform = `translateX(-50%) translateY(${parallaxOffset}px)`;
      }

      // Curved text fade effect
      if (curvedTextRef.current) {
        const opacity = Math.max(0, 1 - scrolled * 0.001);
        curvedTextRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        {/* Curved Text */}
        <div className="curved-text" ref={curvedTextRef}>
          <svg viewBox="0 0 800 800">
            <defs>
              {/* 顶部弧形 */}
              <path
                id="curve"
                d="M 220,360 A 200,200 0 1,1 600,360"
                fill="none"
              />
              {/* 左边垂直边 */}
              <path id="left-vertical" d="M 191,360 L 191,650" fill="none" />
              {/* 右边垂直边 */}
              <path id="right-vertical" d="M 610,360 L 610,650" fill="none" />
              {/* 渐变定义 */}
              <linearGradient
                id="turquoisePinkGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  style={{ stopColor: "#40e0d0", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#ff69b4", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            {/* 主要文字沿着顶部弧形 */}
            <text>
              <textPath href="#curve" startOffset="50%" textAnchor="middle">
                <tspan>
                  {getText(
                    "哥伦比亚大学 · 中文阿卡贝拉",
                    "Columbia University Chinese A Cappella"
                  )}
                </tspan>
              </textPath>
            </text>
            {/* 左边垂直文字 */}
            <text>
              <textPath
                href="#left-vertical"
                startOffset="0%"
                textAnchor="middle"
              >
                <tspan>{getText("声音", "VOICES")}</tspan>
              </textPath>
            </text>
            {/* 右边垂直文字 */}
            <text>
              <textPath
                href="#right-vertical"
                startOffset="0%"
                textAnchor="middle"
              >
                <tspan>{getText("和谐", "HARMONY")}</tspan>
              </textPath>
            </text>
          </svg>
        </div>

        {/* Giant Image */}
        <div className="hero-visual">
          <div className="giant-image" ref={heroImageRef}>
            <img
              src="/hero_image.png"
              alt="Columbia University Chinese A Cappella"
              className="hero-main-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
