"use client";

import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const WordReveal: React.FC<{ text: string; baseDelay?: number }> = ({
  text,
  baseDelay = 0.5,
}) => {
  const words = text.split(/(\s+)/);
  let wordIndex = 0;

  return (
    <span className="donate-word-wrap">
      {words.map((segment, i) => {
        if (/^\s+$/.test(segment)) {
          return <span key={i}>{segment}</span>;
        }
        const delay = wordIndex * 0.04;
        wordIndex++;
        return (
          <span
            key={i}
            className="donate-word"
            style={{ transitionDelay: `${baseDelay + delay}s` }}
          >
            {segment}
          </span>
        );
      })}
    </span>
  );
};

const DONORS = ["Jack Chen", "cfplyw", "Shaokai Lin", "Vienna Zhu"];

const DonatePage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLElement>(null);
  const [contactInfo, setContactInfo] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const getText = (zh: string, en: string) =>
    currentLanguage === "zh" ? zh : en;

  useEffect(() => {
    requestAnimationFrame(() => {
      heroRef.current?.classList.add("donate-hero--loaded");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("donate-section--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    if (formRef.current) observer.observe(formRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.trim()) return;

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactInfo: contactInfo.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(
          getText(
            "提交失败，请稍后重试。",
            "Something went wrong. Please try again.",
          ),
        );
      }
    } catch {
      setError(
        getText(
          "网络错误，请稍后重试。",
          "Network error. Please try again later.",
        ),
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <main>
      <Navbar />

      {/* ── Hero with group photo ── */}
      <section className="donate-hero" ref={heroRef}>
        <img
          src="/donate.JPG"
          alt={getText(
            "哥大中文阿卡贝拉合影",
            "Columbia University Chinese A Cappella group photo",
          )}
          className="donate-hero-img"
        />
        <div className="donate-hero-overlay" />
        <div className="donate-hero-content">
          <p className="donate-hero-eyebrow donate-reveal donate-reveal--1">
            {getText("支持我们", "Support Our Mission")}
          </p>
          <h1 className="donate-hero-title donate-reveal donate-reveal--2">
            {getText("捐赠支持", "Donate")}
          </h1>
          <p className="donate-hero-subtitle donate-reveal donate-reveal--3">
            {getText(
              "您的每一份支持，都是我们前行的动力。",
              "Every contribution fuels the music we share with the world.",
            )}
          </p>
        </div>
      </section>

      {/* ── Gratitude + Contact Form ── */}
      <section className="donate-form-section" ref={formRef}>
        <div className="donate-form-container">
          <div className="donate-gratitude">
            <span className="donate-gratitude-icon donate-stagger donate-stagger--1">
              ♪
            </span>
            <h2 className="donate-gratitude-title donate-title-reveal">
              {getText("感谢您的支持", "Thank You for Your Generosity")}
            </h2>
            <p className="donate-gratitude-text donate-desc-reveal">
              <WordReveal
                text={getText(
                  "哥大中文阿卡贝拉由一群热爱音乐的学生组成。您的慷慨支持将帮助我们购买演出设备、举办音乐会，并将中文音乐带向更广阔的舞台。每一份捐赠都意义深远——感谢您与我们同行。",
                  "Columbia University Chinese A Cappella is a student-run group fueled by passion. Your generous support helps us fund equipment, host concerts, and bring Chinese music to wider audiences. Every donation — large or small — makes a meaningful difference. Thank you for believing in our voices.",
                )}
                baseDelay={0.6}
              />
            </p>

            {/* ── Donors inline ── */}
            <div className="donate-donors-inline donate-stagger donate-stagger--2">
              <p className="donate-donors-label">
                {getText("感谢捐赠者", "Our Donors")}
              </p>
              <p className="donate-donors-thanks">
                {getText(
                  "以下校友与朋友的慷慨，让我们的歌声得以延续。",
                  "These generous souls believed in our music and made it possible."
                )}
              </p>
              <ul
                className="donate-wall-grid"
                aria-label={getText("捐赠者名单", "Donor list")}
              >
                {DONORS.map((name, i) => (
                  <li
                    key={name}
                    className="donate-wall-name"
                    style={{ transitionDelay: `${1.6 + i * 0.1}s` }}
                  >
                    <span className="donate-wall-name-inner">{name}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="donate-gratitude-divider donate-stagger donate-stagger--3" />
            <p className="donate-gratitude-note donate-desc-reveal">
              <WordReveal
                text={getText(
                  "如您有意捐赠，请留下联系方式，我们的团队成员将尽快与您联系。",
                  "If you'd like to donate, please leave your contact info below. A member of our team will reach out to you personally.",
                )}
                baseDelay={1.8}
              />
            </p>
          </div>

          <div className="donate-card donate-stagger donate-stagger--3">
            {!submitted ? (
              <form className="donate-form" onSubmit={handleSubmit}>
                <label className="donate-form-label" htmlFor="contact-info">
                  {getText("您的联系方式", "Your Contact Info")}
                </label>
                <p className="donate-form-hint">
                  {getText(
                    "邮箱 / 微信 / 手机号均可",
                    "Email, WeChat, or phone number — whatever works best for you.",
                  )}
                </p>
                <input
                  id="contact-info"
                  type="text"
                  className="donate-form-input"
                  placeholder={getText(
                    "例: your@email.com / WeChat ID",
                    "e.g. your@email.com / WeChat ID",
                  )}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="donate-form-btn"
                  disabled={sending}
                >
                  <span>
                    {sending
                      ? getText("发送中...", "Sending...")
                      : getText("提交", "Get in Touch")}
                  </span>
                </button>
                {error && <p className="donate-form-error">{error}</p>}
              </form>
            ) : (
              <div className="donate-success">
                <span className="donate-success-icon">✓</span>
                <h3 className="donate-success-title">
                  {getText("感谢您！", "Thank You!")}
                </h3>
                <p className="donate-success-text">
                  {getText(
                    "我们已收到您的信息，团队成员将尽快与您联系。",
                    "We've received your info. A team member will be in touch soon.",
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DonatePage;
