"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const About: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  // Carousel slides data
  const slides = [
    {
      description: getText(
        "我们是哥伦比亚大学首屈一指的中文阿卡贝拉团体，致力于通过音乐这一通用语言连接不同文化。我们多元化的团队汇聚了来自不同背景的学生，共同创作中文和国际歌曲的和谐编曲。",
        "We are Columbia University's premier Chinese a cappella group, dedicated to bridging cultures through the universal language of music. Our diverse ensemble brings together students from various backgrounds to create harmonious arrangements of Chinese and international songs.",
      ),
      image: "/group-photo.jpg",
      alt: getText(
        "哥伦比亚大学中文阿卡贝拉团体照片",
        "Columbia University Chinese A Cappella group photo",
      ),
      stats: [
        { number: "15+", label: getText("成员", "Members") },
        { number: "50+", label: getText("歌曲", "Songs") },
        { number: "10+", label: getText("年", "Years") },
      ],
      hasButton: false,
    },
    {
      description: getText(
        '在联合国这一象征全球对话的舞台上，哥大中文阿卡贝拉用纯净人声唱响新春祝福。在"郎酒新春之夜"，我们以原创编曲的《如愿》，将海外学子的思念与文化的共鸣，传递给来自世界各地的听众。',
        "At the United Nations—an emblem of global dialogue—Columbia University Chinese A Cappella shared Chinese New Year wishes through the pure power of the human voice. At the Langjiu Chinese New Year Gala, our original a cappella rendition of As You Wish carried the emotions of students abroad and created a moment of cross-cultural resonance.",
      ),
      image: "/UN_cover.JPG",
      alt: getText(
        "联合国新春之夜演出",
        "Chinese New Year Gala performance at the United Nations",
      ),
      stats: null,
      hasButton: true,
      buttonText: getText("了解更多", "Read More"),
      buttonLink: "/un-performance",
    },
  ];

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2300); // Change slide every 2.3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animatedElements = entry.target.querySelectorAll(".stat");
          animatedElements.forEach((el) => {
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "translateY(0)";
          });
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);

      // Initialize animation styles
      const stats = sectionRef.current.querySelectorAll(".stat");
      stats.forEach((stat) => {
        (stat as HTMLElement).style.opacity = "0";
        (stat as HTMLElement).style.transform = "translateY(30px)";
        (stat as HTMLElement).style.transition =
          "opacity 0.6s ease, transform 0.6s ease";
      });
    }

    return () => observer.disconnect();
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{getText("关于我们", "About Us")}</h2>
        </div>
        <div className="carousel-container">
          <button
            className="carousel-button carousel-button-prev"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <div className="carousel-content">
            <div className="about-content">
              <div className="about-text">
                <p className="about-description">
                  {slides[currentSlide].description}
                </p>
                {slides[currentSlide].stats && (
                  <div className="stats">
                    {slides[currentSlide].stats.map((stat, index) => (
                      <div className="stat" key={index}>
                        <span className="stat-number">{stat.number}</span>
                        <span className="stat-label">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
                {slides[currentSlide].hasButton && (
                  <div className="about-button-container">
                    <a
                      href={slides[currentSlide].buttonLink}
                      className="about-read-more-button"
                    >
                      {slides[currentSlide].buttonText}
                    </a>
                  </div>
                )}
              </div>
              <div className="about-image">
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  className="about-image"
                />
              </div>
            </div>
          </div>
          <button
            className="carousel-button carousel-button-next"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            ›
          </button>
        </div>
        <div className="carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
