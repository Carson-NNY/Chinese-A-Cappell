"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";

const WordReveal: React.FC<{ text: string; className?: string }> = ({
  text,
  className = "",
}) => {
  const words = text.split(/(\s+)/);
  let wordIndex = 0;

  return (
    <span className={`perf-word-wrap ${className}`}>
      {words.map((segment, i) => {
        if (/^\s+$/.test(segment)) {
          return <span key={i}>{segment}</span>;
        }
        const delay = wordIndex * 0.04;
        wordIndex++;
        return (
          <span
            key={i}
            className="perf-word"
            style={{ transitionDelay: `${0.5 + delay}s` }}
          >
            {segment}
          </span>
        );
      })}
    </span>
  );
};

const PastPerformances: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const eventRefs = useRef<(HTMLElement | null)[]>([]);
  const parallaxImages = useRef<HTMLImageElement[]>([]);

  const getText = (zh: string, en: string) =>
    currentLanguage === "zh" ? zh : en;

  const registerParallax = useCallback((el: HTMLImageElement | null) => {
    if (el && !parallaxImages.current.includes(el)) {
      parallaxImages.current.push(el);
    }
  }, []);

  useEffect(() => {
    /* Hero staggered entrance */
    const raf = requestAnimationFrame(() => {
      heroRef.current?.classList.add("perf-hero--loaded");
    });

    /* Scroll-reveal for event sections */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("perf-event--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" },
    );

    eventRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    /* Subtle parallax on event images */
    const handleScroll = () => {
      const scrollY = window.scrollY;
      parallaxImages.current.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const visible = rect.bottom > 0 && rect.top < window.innerHeight;
        if (!visible) return;
        const center =
          (rect.top + rect.height / 2 - window.innerHeight / 2) /
          window.innerHeight;
        img.style.transform = `scale(1.08) translateY(${center * -30}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const events = [
    {
      image: "/spring-concert.jpg",
      alt: "2025 A Cappella: Night of Qingci",
      title: {
        zh: "2025 · 阿卡贝拉 · 青瓷之夜",
        en: "2025 A Cappella: Night of Qingci",
      },
      description: {
        zh: "一场中西方经典歌曲的庆典，融合东西方之美，以纯粹人声诠释文化的共鸣。",
        en: "A celebration of Chinese and international classics — Eastern and Western voices woven into one evening of pure sound.",
      },
      youtubeUrl: "https://www.youtube.com/watch?v=oMqxfWn7qTg",
      layout: "left" as const,
    },
    {
      image: "/cultural-festival.jpg",
      alt: "2025 GCC A Cappella Mid-Autumn",
      title: {
        zh: "2025 · GCC 阿卡贝拉 · 中秋",
        en: "2025 GCC A Cappella Mid-Autumn",
      },
      description: {
        zh: "传统中国旋律在现代编曲中重焕新生，月圆之夜，声声入心。",
        en: "Traditional Chinese melodies reimagined — ancient sounds reborn beneath the harvest moon.",
      },
      youtubeUrl: "https://www.youtube.com/watch?v=bZ8kppY0_mU",
      layout: "right" as const,
    },
    {
      image: "/holiday-special.jpg",
      alt: "2025 · Night Market",
      title: {
        zh: "2025 · Night Market",
        en: "2025 · Night Market",
      },
      description: {
        zh: "来自世界各地的节日歌曲，在夜市的烟火气中化为动人的人声和鸣。",
        en: "Festive songs from around the world, filling the night with warmth and harmony.",
      },
      youtubeUrl: "https://www.youtube.com/watch?v=-yRW6Kqg64w",
      layout: "fullwidth" as const,
    },
  ];

  return (
    <main>
      <Navbar />

      {/* ── Hero ── */}
      <section className="perf-hero" ref={heroRef}>
        <div className="perf-hero-spotlight" />
        <div className="perf-hero-content">
          <p className="perf-hero-eyebrow perf-reveal perf-reveal--1">
            {getText("演出回顾", "Columbia University Chinese A Cappella")}
          </p>
          <h1 className="perf-hero-title perf-reveal perf-reveal--2">
            {getText("历年演出", "Past Performances")}
          </h1>
          <p className="perf-hero-subtitle perf-reveal perf-reveal--3">
            {getText(
              "探索我们的音乐时刻",
              "Explore our concerts and musical moments.",
            )}
          </p>
        </div>
        <div className="perf-hero-scroll-hint perf-reveal perf-reveal--4">
          <span />
        </div>
      </section>

      {/* ── Events ── */}
      <div className="perf-events">
        {events.map((event, i) => {
          if (event.layout === "fullwidth") {
            return (
              <section
                key={i}
                className="perf-event perf-event--fullwidth"
                ref={(el) => {
                  eventRefs.current[i] = el;
                }}
              >
                <div className="perf-event-fw-image">
                  <img
                    src={event.image}
                    alt={event.alt}
                    ref={registerParallax}
                  />
                  <div className="perf-event-fw-overlay">
                    <div className="perf-event-body perf-event-body--overlay">
                      <span className="perf-event-index perf-stagger perf-stagger--1">
                        0{i + 1}
                      </span>
                      <h2 className="perf-event-title perf-title-reveal">
                        {getText(event.title.zh, event.title.en)}
                      </h2>
                      <p className="perf-event-description perf-desc-reveal">
                        <WordReveal
                          text={getText(
                            event.description.zh,
                            event.description.en,
                          )}
                        />
                      </p>
                      <a
                        href={event.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="perf-event-btn perf-stagger perf-stagger--4"
                      >
                        {getText("观看演出", "Watch")}
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            );
          }

          const dirClass =
            event.layout === "right"
              ? "perf-event--img-right"
              : "perf-event--img-left";

          const imageEl = (
            <div className="perf-event-image" key="img">
              <img src={event.image} alt={event.alt} ref={registerParallax} />
            </div>
          );
          const bodyEl = (
            <div className="perf-event-body" key="body">
              <span className="perf-event-index perf-stagger perf-stagger--1">
                0{i + 1}
              </span>
              <h2 className="perf-event-title perf-title-reveal">
                {getText(event.title.zh, event.title.en)}
              </h2>
              <p className="perf-event-description perf-desc-reveal">
                <WordReveal
                  text={getText(event.description.zh, event.description.en)}
                />
              </p>
              <a
                href={event.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="perf-event-btn perf-stagger perf-stagger--4"
              >
                {getText("观看演出", "Watch")}
              </a>
            </div>
          );

          return (
            <section
              key={i}
              className={`perf-event ${dirClass}`}
              ref={(el) => {
                eventRefs.current[i] = el;
              }}
            >
              {event.layout === "right" ? [bodyEl, imageEl] : [imageEl, bodyEl]}
            </section>
          );
        })}
      </div>

      <Footer />
    </main>
  );
};

export default PastPerformances;
