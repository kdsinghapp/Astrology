import React from "react";
import HOC from "../Common/HOC";
import { useEffect } from "react";

const VedicAstrology = () => {
  useEffect(() => {
    window.scrollTo({
      top: 530,
      behavior: "smooth",
    });
  }, []);
  return (
    <>
      <div className="container mt-5">
        <div className="vediv-content">
          <h1>Principles behind Vedic Astrology</h1>
          <p>
            Vedic astrology, also known as Jyotish, is a traditional system of astrology that originated in ancient India. It is a significant part of Hindu
            culture and is based on the ancient texts called the Vedas. Vedic astrology is distinct from Western astrology in terms of its techniques,
            calculations, and philosophical foundations.
          </p>
          <p>
            <b>Here are some key features and principles of Vedic astrology:</b>
          </p>
          <ul>
            <li>
              <b>Birth chart:</b> Vedic astrology uses a birth chart, also known as a horoscope or a Kundali, which is calculated based on the date, time, and
              place of an individual’s birth. The birth chart is a representation of the positions of celestial bodies, including the Sun, Moon, planets, and
              constellations, at the time of birth on an individual.
            </li>
            <li>
              <b> Planetary influences:</b> Vedic astrology assigns specific significations and characteristics to each celestial body. These bodies are
              believed to exert influences on various aspects of human life, including personality traits, relationships, career, health, and events.
            </li>
            <li>
              <b>Zodiac signs:</b> Vedic astrology divides the zodiac into 12 equal segments or signs, just like Western astrology. However, Vedic astrology
              uses the sidereal zodiac, which accounts for the precession of Earth’s axis and aligns the zodiac signs with the actual positions of the
              constellations.
            </li>
            <li>
              <b> Dasha system:</b> Vedic astrology incorporates a unique predictive technique called the Dasha system. It involves a series of planetary
              periods or time periods that are believed to influence an individual’s life events. The Dasha system combines the positions of the Moon and other
              planets in the birth chart to determine the timing and nature of various life experiences.
            </li>
            <li>
              <b> Remedial measures:</b> Vedic astrology suggests various remedial measures to mitigate the negative effects of planetary influences or to
              enhance positive outcomes. These measures can include rituals, prayers, gemstone recommendations, wearing specific colors, and other practices
              believed to align with the energy of particular planets.
            </li>
          </ul>
          <p>
            Vedic astrology continues to be widely practiced and respected as the best form of astrology. It is often approached as a cultural, philosophical,
            and spiritual tradition in India.
          </p>
          <h4>AstroPush- 24X7 online astrology Platform</h4>
          <p>
            At AstroPush, an online Astrology Platform, we provide access to top online Vedic Astrologers in India and worldwide. Our astrology platform, aims
            to provide astrology services globally. With a team of knowledgeable astrologers specialising in Vedic Astrology, Nadi, Tarot Card Reading, Vastu
            Shastra, Western Astrology, Numerology, Reiki healing, and Palmistry, AstroPush offers convenient online astrology consultations. The platform is
            serving with an aim to provide reliable online astrology solutions in today’s busy life of individuals. These solution from top astrologers are
            oriented towards pushing the worries out of individual’s life through guidance and easy remedies.
          </p>
          <p>
            AstroPush’s online platform provides several free Astrology services and information which includes free kundli, free matchmaking, free daily,
            monthly, yearly horoscopes and Zodiac signs, muhurats, upcoming festivals, free astrology chat/call sessions and live events.
          </p>
          <h4>Reliable Astrology Services through strong Review and Ratings system: </h4>
          <p>
            AstroPush values customer satisfaction and ensures credibility by providing reliable services. The platform's experienced online astrologers share
            their expertise through one-on-one calls and chat consultations. Ratings and reviews provided by customers determine the quality of service, and the
            first chat with an astrologer comes with a discount. Our Astrologers also provide easy and workable remedies which can be performed on day to day
            basis, despite busy routines of individual’s.
          </p>
          <h4>Online Astrology Mall: </h4>
          <p>
            Our In-house online Astrology shopping Mall sells best quality and reliable gem stones, rudrakhsa, temples and Pooja items.AstroPush strives aims to
            provide comprehensive astrology services under one roof, catering to diverse interests and needs. Our Astrologers can provide online Astrology
            services through Chat/Call in various Indian regional langauges. With a commitment to excellence, AstroPush aims to be a reliable partner and guide
            in the field of astrology.{" "}
          </p>
        </div>
      </div>
    </>
  );
};

export default HOC(VedicAstrology);
