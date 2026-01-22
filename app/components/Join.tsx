"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

const Join: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const carouselImages = [
    "/sliding_window1.jpg",
    "/sliding_window2.jpg",
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const animatedElements = entry.target.querySelectorAll(".feature");
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
      const features = sectionRef.current.querySelectorAll(".feature");
      features.forEach((feature) => {
        (feature as HTMLElement).style.opacity = "0";
        (feature as HTMLElement).style.transform = "translateY(30px)";
        (feature as HTMLElement).style.transition =
          "opacity 0.6s ease, transform 0.6s ease";
      });
    }

    return () => observer.disconnect();
  }, []);

  // Carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % carouselImages.length
      );
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const handleCTAClick = () => {
    const message = getText(
      "感谢您的兴趣！请发送邮件至 cca@columbia.edu 了解更多试镜信息。",
      "Thank you for your interest! Please email cca@columbia.edu for audition information."
    );
    alert(message);
  };

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      (prevIndex + 1) % carouselImages.length
    );
  };

  const features = [
    {
      icon: "fas fa-microphone",
      text: { zh: "无需经验", en: "No experience required" },
    },
    {
      icon: "fas fa-globe",
      text: { zh: "多元文化环境", en: "Multicultural environment" },
    },
    {
      icon: "fas fa-heart",
      text: { zh: "对音乐的热爱", en: "Passion for music" },
    },
  ];

  return (
    <section id="join" className="join" ref={sectionRef}>
      <div className="container">
        <div className="join-content">
          <div className="join-text">
            <h2 className="section-title">
              {getText("加入我们的合唱团", "Join Our Group")}
            </h2>
            <p className="join-description">
              {getText(
                "无论你是经验丰富的歌手还是只是热爱歌唱，我们都欢迎所有声音。试镜在每个学期开始时举行。",
                "Whether you're a seasoned vocalist or just love to sing, we welcome all voices. Auditions are held at the beginning of each semester."
              )}
            </p>
            <div className="join-features">
              {features.map((feature, index) => (
                <div key={index} className="feature">
                  <i className={feature.icon}></i>
                  <span>{getText(feature.text.zh, feature.text.en)}</span>
                </div>
              ))}
            </div>
            <button className="cta-button" onClick={handleCTAClick}>
              {getText("立即试镜", "Audition Now")}
            </button>
            <div className="email-info">
              <p className="email-text">
                {getText("联系邮箱：", "Contact: ")}
                <a href="mailto:chineseacappella@columbia.edu" className="email-link">
                  chineseacappella@columbia.edu
                </a>
              </p>
            </div>
          </div>
          <div className="join-image-carousel">
            <button 
              className="carousel-arrow carousel-arrow-left" 
              onClick={goToPrevious}
              aria-label="Previous image"
            >
              ‹
            </button>
            <div className="carousel-container">
              {carouselImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${getText("加入哥伦比亚大学中文阿卡贝拉", "Join Columbia University Chinese A Cappella")} - ${index + 1}`}
                  className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
            <button 
              className="carousel-arrow carousel-arrow-right" 
              onClick={goToNext}
              aria-label="Next image"
            >
              ›
            </button>
            <div className="carousel-dots">
              {carouselImages.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                  onClick={() => setCurrentImageIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
