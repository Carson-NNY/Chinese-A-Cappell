import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const About: React.FC = () => {
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
  }, []);

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{getText("关于我们", "About Us")}</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p className="about-description">
              {getText(
                "我们是哥伦比亚大学首屈一指的中文阿卡贝拉团体，致力于通过音乐这一通用语言连接不同文化。我们多元化的团队汇聚了来自不同背景的学生，共同创作中文和国际歌曲的和谐编曲。",
                "We are Columbia University's premier Chinese a cappella group, dedicated to bridging cultures through the universal language of music. Our diverse ensemble brings together students from various backgrounds to create harmonious arrangements of Chinese and international songs."
              )}
            </p>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">{getText("成员", "Members")}</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">{getText("歌曲", "Songs")}</span>
              </div>
              <div className="stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">{getText("年", "Years")}</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img
              src="/group-photo.jpg"
              alt="哥伦比亚大学中文阿卡贝拉团体照片"
              className="about-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
