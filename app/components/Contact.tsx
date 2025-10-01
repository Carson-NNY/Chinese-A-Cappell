"use client";

import React, { useState } from "react";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

const Contact: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "";
  }>({ text: "", type: "" });

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage(
        getText("请输入有效的邮箱地址", "Please enter a valid email address"),
        "error"
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post("/api/subscribe", { email });

      if (response.data.success) {
        showMessage(
          getText(
            "订阅成功！请检查您的邮箱确认。",
            "Successfully subscribed! Please check your email for confirmation."
          ),
          "success"
        );
        setEmail("");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      showMessage(
        getText(
          "订阅失败，请稍后重试。",
          "Subscription failed. Please try again later."
        ),
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: "fab fa-instagram", label: "Instagram" },
    { icon: "fab fa-youtube", label: "YouTube" },
    { icon: "fab fa-facebook", label: "Facebook" },
    { icon: "fab fa-twitter", label: "Twitter" },
  ];

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            {getText("联系我们", "Get In Touch")}
          </h2>
          <p className="section-subtitle">
            {getText(
              "了解我们最新的新闻和活动",
              "Stay connected with our latest news and events"
            )}
          </p>
        </div>
        <div className="contact-content">
          <div className="contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={getText("邮箱地址", "Email Address")}
                  required
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? getText("订阅中...", "Subscribing...")
                  : getText("订阅", "Subscribe")}
              </button>
            </form>
            {message.text && (
              <div className={`form-message form-message-${message.type}`}>
                {message.text}
              </div>
            )}
            <p className="form-note">
              {getText(
                "订阅后，您将收到我们演出和活动的更新。",
                "By subscribing, you'll receive updates about our performances and events."
              )}
            </p>
          </div>
          <div className="social-links">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href="#"
                className="social-link"
                aria-label={link.label}
              >
                <i className={link.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
