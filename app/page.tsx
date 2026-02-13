"use client";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Music from "./components/Music";
import Join from "./components/Join";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Music />
      <Join />
      <Contact />
      <Footer />
    </main>
  );
}
