"use client";

import React from "react";
import { useLanguage } from "../context/LanguageContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UNPerformance: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const getText = (zh: string, en: string) => {
    return currentLanguage === "zh" ? zh : en;
  };

  return (
    <main>
      <Navbar />
      <article className="article-page">
        <div className="article-hero">
          <img
            src="/UN_cover.JPG"
            alt={getText(
              "哥大中文阿卡贝拉在联合国演出",
              "Columbia University Chinese A Cappella at the United Nations",
            )}
            className="article-hero-image"
          />
          <div className="article-hero-overlay">
            <div className="container">
              <h1 className="article-title">
                {getText(
                  '唱响联合国：哥大中文阿卡贝拉亮相"郎酒新春之夜"',
                  'Echoing through the UN: Columbia University Chinese A Cappella Highlights "Langjiu Chinese New Year Gala"',
                )}
              </h1>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="article-content">
            {currentLanguage === "zh" ? (
              <>
                <p>
                  在农历新年的喜庆余韵中，哥大中文阿卡贝拉受邀走进了一个特殊的舞台——纽约联合国总部外交官餐厅（United
                  Nations Diplomats' Dining
                  Room），参加由郎酒主办的"郎酒新春之夜"。
                </p>
                <p>
                  这不仅是一次音乐的交流，更是一场跨越国界的文化碰撞。在这样一个汇聚了各国使节与各界精英的庄重场合，我们用最纯粹的人声，传递了来自中国青年学子的声音。
                </p>

                <div className="article-section-container">
                  <h2 className="article-section-title">
                    独家编曲：一曲《如愿》寄相思
                  </h2>
                  <div className="article-section">
                    <div className="article-section-text">
                      <p>
                        当晚，我们带来了由校友Lance
                        Chen精心编曲的代表作《如愿》人声合唱版。
                      </p>
                      <p>
                        这首歌不仅承载着对父辈的致敬，更在这个特殊的时刻，表达了海外学子对祖国和亲人的深切思念。为了适应阿卡贝拉的表现形式，Lance在和声编排上加入了不少巧思：
                      </p>
                    </div>
                    <div className="article-section-image">
                      <div className="article-image-wrapper">
                        <img
                          src="/UN_1.JPG"
                          alt="哥大中文阿卡贝拉在联合国演出"
                          className="article-image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="article-highlight-section">
                    <p className="article-highlight article-highlight--body">
                      <strong>层次感：</strong>
                      从开头的静谧叙述到副歌的宏大爆发。
                    </p>
                    <p className="article-highlight article-highlight--body">
                      <strong>情感共鸣：</strong>
                      利用人声模拟乐器的细腻音色，营造出一种温暖而坚定的氛围。
                    </p>
                  </div>
                </div>

                <div className="article-section-container">
                  <h2 className="article-section-title">
                    现场回响：掌声与泪水中的共鸣
                  </h2>
                  <div className="article-section reverse">
                    <div className="article-section-image">
                      <div className="article-image-wrapper">
                        <img
                          src="/UN_2.JPG"
                          alt="哥大中文阿卡贝拉团队合影"
                          className="article-image"
                        />
                      </div>
                    </div>
                    <div className="article-section-text">
                      <p>
                        演出结束后，现场的反应远远超出了我们的预期。当最后一个音符落下，外交官餐厅内响起了久久不息的掌声。
                      </p>
                      <p>
                        最让我们动容的是，现场有几位同胞在听完后眼含热泪。一位宾客在赛后告诉我们："在异国他乡的联合国听到这首歌，尤其是这种纯净的合唱形式，真的触动了心底最柔软的地方。"
                      </p>
                    </div>
                  </div>
                  <div className="article-highlight-section">
                    <p className="article-highlight article-highlight--no-accent">
                      这种"天涯共此时"的连接感，正是我们坚持推广中文阿卡贝拉的初衷。
                    </p>
                  </div>
                </div>

                <h2>结语</h2>
                <p>
                  能够受邀参加"郎酒新春之夜"，我们深感荣幸。感谢郎酒的邀请，让我们有机会在国际舞台上展示中文音乐的魅力。未来，哥大中文阿卡贝拉将继续用歌声讲好中国故事，让世界听见我们的旋律。
                </p>
              </>
            ) : (
              <>
                <p>
                  In the festive lingering warmth of the Chinese New Year,
                  Columbia University Chinese A Cappella (CUCAC) was invited to
                  a truly unique stage: the United Nations Diplomats' Dining
                  Room in New York, for the prestigious "Langjiu Chinese New
                  Year Gala."
                </p>
                <p>
                  This event was more than just a musical performance; it was a
                  cultural bridge-building moment. In a venue graced by
                  international diplomats and global elites, we used the purest
                  form of music—the human voice—to convey the spirit and
                  perspective of young Chinese scholars today.
                </p>

                <div className="article-section-container">
                  <h2 className="article-section-title">
                    Exclusive Arrangement: "Wishing" as a Vessel for Remembrance
                  </h2>
                  <div className="article-section">
                    <div className="article-section-text">
                      <p>
                        For this special evening, we performed a bespoke vocal
                        arrangement of our signature piece, "As You Wish"
                        (如愿), meticulously crafted by our alumnus, Lance Chen.
                      </p>
                      <p>
                        The song serves as a tribute to previous generations
                        while expressing the profound longing that students
                        abroad feel for their homeland and loved ones. To adapt
                        this piece for A Cappella, Lance infused the arrangement
                        with several sophisticated elements:
                      </p>
                    </div>
                    <div className="article-section-image">
                      <div className="article-image-wrapper">
                        <img
                          src="/UN_1.JPG"
                          alt="Columbia University Chinese A Cappella performing at the United Nations"
                          className="article-image"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="article-highlight-section">
                    <p className="article-highlight article-highlight--body">
                      <strong>Dynamic Layering:</strong> Transitioning from a
                      serene, narrative opening to a grand, powerful explosion
                      in the chorus.
                    </p>
                    <p className="article-highlight article-highlight--body">
                      <strong>Emotional Resonance:</strong> Utilizing vocal
                      textures to simulate the delicate nuances of instruments,
                      creating an atmosphere that felt both warm and steadfast.
                    </p>
                  </div>
                </div>

                <div className="article-section-container">
                  <h2 className="article-section-title">
                    Live Resonance: Standing Ovations and Heartfelt Tears
                  </h2>
                  <div className="article-section reverse">
                    <div className="article-section-image">
                      <div className="article-image-wrapper">
                        <img
                          src="/UN_2.JPG"
                          alt="Columbia University Chinese A Cappella group photo"
                          className="article-image"
                        />
                      </div>
                    </div>
                    <div className="article-section-text">
                      <p>
                        The reception following our performance far exceeded our
                        expectations. As the final note faded into the room, the
                        Diplomats' Dining Room erupted into thunderous,
                        sustained applause.
                      </p>
                      <p>
                        What moved us most was seeing several fellow Chinese
                        guests in the audience moved to tears. One guest
                        remarked afterward: "Hearing this song at the United
                        Nations, so far from home—especially in such a pure
                        choral form—truly touched the softest part of my heart."
                      </p>
                    </div>
                  </div>
                  <div className="article-highlight-section">
                    <p className="article-highlight article-highlight--no-accent">
                      This sense of connection—of being "worlds apart, yet
                      sharing this moment"—is exactly why we are so passionate
                      about promoting Chinese A Cappella.
                    </p>
                  </div>
                </div>

                <h2>Conclusion</h2>
                <p>
                  It was a profound honor to be invited to the "Langjiu Chinese
                  New Year Gala." We extend our sincere gratitude to Langjiu for
                  providing us with the opportunity to showcase the charm of
                  Chinese music on an international stage. Moving forward,
                  Columbia University Chinese A Cappella will continue to use
                  our voices to tell China's stories and let the world hear our
                  melody.
                </p>
              </>
            )}

            <div className="article-back-button">
              <a href="/" className="back-button">
                {getText("返回首页", "Back to Home")}
              </a>
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
};

export default UNPerformance;
