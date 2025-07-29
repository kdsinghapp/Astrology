import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import CommonCrousal from "../CommonCrousal/CommonCrousal";
import FAQ from "../AstroPushFAQ/FAQ";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";

const Nakshatra = () => {
  const [nakshatraFaq, setNakshatraFaq] = useState([
    {
      show: true,
      heading: "<h2>Can I know my Nakshatra using my birth date?</h2>",
      desc: "<p>Yes, it is. Nakshatra, also known as the Birth Star or Janma nakshatra, is an essential feature of Indian Vedic astrology. Although there are 28 nakshatras, calculations involve 27 of them. By providing your precise birth date, time, and location, astrologers can help you discover your nakshatra along with other astrological details.</p>",
    },
    {
      show: true,
      heading: "<h2>Which nakshatra is king?</h2>",
      desc: "<p> Pushya is like the king among the Nakshatras. It's considered the kindest one and is great for people on a spiritual path. If you're born under Pushya, you're known for being trustworthy, giving, protective, and really calm.</p>",
    },
    {
      show: true,
      heading: "<h2>Which Nakshatra is happy?</h2>",
      desc: "<p>The Uttara Bhadrapada Nakshatra falls between 3 degrees 20 minutes and 16 degrees 40 minutes in the Pisces zodiac sign. People born under this Nakshatra are generally cheerful, good at talking, fond of children, and known for their honesty.</p>",
    },
    {
      show: true,
      heading: "<h2>Which Rashi people become rich?</h2>",
      desc: "<p>Among the Rashis, Libra is often associated with being the richest, and many of the world's billionaires fall under this sign. Other lucky signs when it comes to money and wealth include Pisces, Aries, and Taurus.</p>",
    },
  ]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, []);

  return (
    <>
      <section className="container content_section mb-4">
        <BreadcrumbSection tittle="Nakshatra" />
        <div className="pt-1">
          <h3 className="pb-2 mt-4">Nakshatras in Vedic Astrology Explained</h3>
          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            In Vedic astrology, there's something interesting called
            "Nakshatras." These are like groups of little stars or
            constellations that the moon travels through as it goes around the
            Earth. Your birth nakshatra, which is like your special star group,
            helps shape your personality and character. It works together with
            your moon sign, which tells us where the moon was present, when you
            were born. Nakshatras are sometimes called "Lunar Mansions" in
            English.
          </p>
          <p>
            Now, let's talk about how Vedic astrologers use these Nakshatras.
            They don't just stop at zodiac signs; they also look at these lunar
            mansions to gain deeper insights into a person's inherent
            characteristics and traits. But that's not all. Nakshatras have an
            important role in another division of astrology known as "Electional
            Astrology" or "Muhuratha." Here, they help in figuring out the best
            times for important life events. Think of it as picking the right
            moment, time, day and date for something big like a wedding or
            starting a new venture.
          </p>
          <p>
            In this blog, we're going to take a deep dive into why nakshatras
            matter so much in Vedic astrology. We'll also walk you through each
            of the 27 nakshatras, giving you a glimpse into the unique influence
            and qualities associated with each one. It's like discovering a
            whole new layer of planetary guidance in the world of astrology.
          </p>
          <p>
            Interested in diving deeper into the meaning of Nakshatras and
            learning insights about all 27 of them? You can either connect with
            our renowned astrologers through our website or the AstroPush App,
            or continue reading our blog for a complete study of each Nakshatra
            in the zodiac.
          </p>
        </div>
      </section>
      <CommonCrousal />
      <section className="container content_section mb-4">
        <div className="pt-3">
          <p>
            <strong>What is a Nakshatra?</strong>
          </p>
          <p>
            A Nakshatra is a term used in Indian astrology that's made up of two
            words - "Naksha," which means a map, and "Tara," which means a star.
            So, when you put them together, it basically means "Mapping of the
            stars." You can find its references back to ancient texts like the
            Rig Veda, Yajur Veda, and Atharva Veda.
          </p>
          <p>
            The meaning of Nakshatra is quite clear in Indian astrology. It
            refers to groups of stars or constellations that have an impact on a
            person's life from the moment they are born, depending on where the
            moon is situated. In total, there are 27 Nakshatras. The names of
            these 27 Nakshatras were first recorded in the Vedanga Jyotisha.
          </p>
          <p>
            Now, here's how it works. As the Moon moves around and takes
            different positions in various Nakshatras, it impacts the zodiac
            signs of people born during those times. The Moon is the ruler of
            the Nakshatras and it takes nearly 28 days to move from one zodiac
            sign to another. Moreover, the Moon spends about a day in each
            Nakshatra and each one is roughly 13 degrees and 20 minutes long.
          </p>
          <p>
            Let's take a closer look at this arrangement. You see, each
            Nakshatra, those groups of stars we talked about earlier, gets
            divided into four smaller parts called "Padas." These Padas are like
            divisions, and each one is about 3 degrees and 20 minutes wide. It's
            like cutting a pizza into four equal slices. Now, these Padas also
            have a connection with another division in astrology, which is the
            9th part of a zodiac sign, known as "Navamsa." It's like cutting
            that pizza even more into nine pieces.
          </p>
          <p>
            But there's more! Each Nakshatra and its Padas aren't just out on
            their own. They are influenced by specific planets. Think of it like
            each Nakshatra and Pada having their own special guides from the
            world of planets.
          </p>
          <p>
            This whole setup is pretty interesting because it helps astrologers
            dig really deep into a person's life. They can provide super
            detailed insights based on which Nakshatra, Pada, and planetary
            influence someone was born under. It's like having a personalized
            planetary roadmap to understand a person's journey in life.
          </p>
          <p>
            You can easily connect with our highly respected astrologers by
            visiting our website or downloading the AstroPush App. Through these
            platforms, you can gain in-depth knowledge about Nakshatras and
            explore their significance in astrology.
          </p>
          <p>
            <strong>Let's break down the types of Nakshatras:</strong>
          </p>
          <p>
            <strong>1. Godly Nakshatras:</strong>
          </p>
          <ul>
            <li>
              People born under these Nakshatras are commonly kind and lucky in
              life.
            </li>
            <li>
              They might, however, struggle with feelings of pride and power.
            </li>
          </ul>

          <p>
            <strong>2. Human-like Nakshatras:</strong>
          </p>
          <ul>
            <li>
              People born under these Nakshatras tend to work hard and aim for
              materialistic success.
            </li>
            <li>
              While they are generally kind, they can sometimes be unforgiving
              and focused on their own interests.
            </li>
          </ul>

          <p>
            <strong>3. Monstrous Nakshatras:</strong>
          </p>
          <ul>
            <li>
              Those born under monstrous Nakshatras are often intuitive,
              strong-minded, and confident.
            </li>
            <li>
              However, they may also have a leaning towards anger and violence.
            </li>
          </ul>
          <p>
            Apart from these groups, Nakshatras can get even more specific. They
            can be further divided based on the zodiac sign they belong to and
            the planetary ruler they have. Each of the nine planets in Vedic
            astrology rules over three Nakshatras, starting with Ketu, who is
            the ruler of Ashwini, the first Nakshatra. This adds an extra layer
            of detail to understanding a person's Nakshatra and its influence on
            their life.
          </p>
        </div>
      </section>
      <section className="container content_section mb-4">
        <div className="pt-3">
          <p>
            <strong>
              Here's a list of the 27 Nakshatras along with some key details
              about each one:
            </strong>
          </p>
          <p>
            <strong>Ashwini:</strong> Godly Nakshatra in Aries, ruled by Ketu,
            represented by a horse's head.
          </p>
          <p>
            <strong>Bharani:</strong> Human-like Nakshatra in Venus, ruled by
            Venus, represented by the female sex organ.
          </p>
          <p>
            <strong>Krittika:</strong> Monstrous Nakshatra in Aries and Taurus,
            ruled by the Sun, represented by a knife or flame.
          </p>
          <p>
            <strong>Rohini:</strong> Human-like Nakshatra in Taurus, ruled by
            the Moon, represented by an oxcart or temple.
          </p>
          <p>
            <strong>Mrigashira:</strong> Godly Nakshatra in Taurus and Gemini,
            ruled by Mars, represented by a deer's head.
          </p>
          <p>
            <strong>Ardra:</strong> Human-like Nakshatra in Gemini, ruled by
            Rahu, represented by a human head or teardrop.
          </p>
          <p>
            <strong>Punarvasu:</strong> Godly Nakshatra in Gemini and Cancer,
            ruled by Jupiter, represented by a bow and quiver.
          </p>
          <p>
            <strong>Pushya:</strong> Godly Nakshatra in Cancer, ruled by Saturn,
            represented by a bow and quiver.
          </p>
          <p>
            <strong>Ashlesha:</strong> Monstrous Nakshatra in Cancer, ruled by
            Mercury, represented by a serpent.
          </p>
          <p>
            <strong>Magha:</strong> Monstrous Nakshatra in Leo, ruled by Ketu,
            represented by a palanquin or throne.
          </p>
          <p>
            <strong>Purva Phalguni:</strong> Human-like Nakshatra in Leo, ruled
            by Venus, represented by a hammock.
          </p>
          <p>
            <strong>Uttara Phalguni:</strong> Human-like Nakshatra in Leo and
            Virgo, ruled by the Sun, represented by a bed.
          </p>
          <p>
            <strong>Hasta:</strong> Godly Nakshatra in Virgo, ruled by the Moon,
            represented by a hand.
          </p>
          <p>
            <strong>Chitra:</strong> Monstrous Nakshatra in Virgo and Libra,
            ruled by Mars, represented by a pearl or jewel.
          </p>
          <p>
            <strong>Swati:</strong> Godly Nakshatra in Libra, ruled by Rahu,
            represented by a fresh blade of grass.
          </p>
          <p>
            <strong>Vishakha:</strong> Monstrous Nakshatra in Libra and Scorpio,
            ruled by Jupiter, represented by a potter's wheel.
          </p>
          <p>
            <strong>Anuradha:</strong> Godly Nakshatra in Scorpio, ruled by
            Saturn, represented by a lotus flower.
          </p>
          <p>
            <strong>Jyeshta:</strong> Monstrous Nakshatra in Scorpio, ruled by
            Mercury, represented by an umbrella.
          </p>
          <p>
            <strong>Mula:</strong> Monstrous Nakshatra in Sagittarius, ruled by
            Ketu, represented by roots.
          </p>
          <p>
            <strong>Purva Shadha:</strong> Human-like Nakshatra in Sagittarius,
            ruled by Venus, represented by a winnowing basket.
          </p>
          <p>
            <strong>Uttara Ashadha:</strong> Human-like Nakshatra in Sagittarius
            and Capricorn, ruled by the Sun, represented by an elephant's tusk.
          </p>
          <p>
            <strong>Shravana:</strong> Godly Nakshatra in Capricorn, ruled by
            the Moon, represented by an ear.
          </p>
          <p>
            <strong>Dhanishta:</strong> Monstrous Nakshatra in Capricorn and
            Aquarius, ruled by Mars, represented by a drum.
          </p>
          <p>
            <strong>Shatabhisha:</strong> Monstrous Nakshatra in Aquarius, ruled
            by Rahu, represented by an empty circle.
          </p>
          <p>
            <strong>Purva Bhadrapada:</strong> Human-like Nakshatra in Aquarius
            and Pisces, ruled by Jupiter, represented by a funeral bed.
          </p>
          <p>
            <strong>Uttara Bhadrapada:</strong> Human-like Nakshatra in Pisces,
            ruled by Saturn, represented by a snake.
          </p>
          <p>
            <strong>Revati:</strong> Godly Nakshatra in Pisces, ruled by
            Mercury, represented by a fish.
          </p>
        </div>
        <p>
          <strong>
            Details of all 27 Nakshatras, including their Deity, Lord, Color,
            and Astronomical Name:
          </strong>
        </p>
        <p>
          <strong>1. Ashwini</strong>
        </p>
        <ul>
          <li>Deity: Ashwini Kumara</li>
          <li>Lord: Ketu</li>
          <li>Color: Blood red</li>
          <li>Gemstone: Cat’s Eye (red)</li>
        </ul>

        <p>
          <strong>2. Bharani</strong>
        </p>
        <ul>
          <li>Deity: Yama</li>
          <li>Lord: Venus</li>
          <li>Color: Blood red</li>
          <li>Gemstone: Diamond</li>
        </ul>

        <p>
          <strong>3. Krittika</strong>
        </p>
        <ul>
          <li>Deity: Agni</li>
          <li>Lord: Sun</li>
          <li>Color: White</li>
          <li>Gemstone: Ruby</li>
        </ul>

        <p>
          <strong>4. Rohini</strong>
        </p>
        <ul>
          <li>Deity: Brahma</li>
          <li>Lord: Moon</li>
          <li>Color: White</li>
          <li>Gemstone: Natural Pearl</li>
        </ul>

        <p>
          <strong>5. Mrigashirsha</strong>
        </p>
        <ul>
          <li>Deity: Chandra</li>
          <li>Lord: Mars</li>
          <li>Color: Silver Grey</li>
          <li>Gemstone: Red Coral</li>
        </ul>

        <p>
          <strong>6. Ardra</strong>
        </p>
        <ul>
          <li>Deity: Rudra</li>
          <li>Lord: Rahu</li>
          <li>Color: Green</li>
          <li>Gemstone: Gomedh</li>
        </ul>

        <p>
          <strong>7. Punarvasu</strong>
        </p>
        <ul>
          <li>Deity: Aditya</li>
          <li>Lord: Jupiter</li>
          <li>Color: Lead</li>
          <li>Gemstone: Yellow Sapphire</li>
        </ul>

        <p>
          <strong>8. Pushya</strong>
        </p>
        <ul>
          <li>Deity: Brihaspathi</li>
          <li>Lord: Saturn</li>
          <li>Color: Black mixed with red</li>
          <li>Gemstone: Blue Sapphire</li>
        </ul>

        <p>
          <strong>9. Ashlesha</strong>
        </p>
        <ul>
          <li>Deity: Nagas</li>
          <li>Lord: Mercury</li>
          <li>Color: Black mixed with red</li>
          <li>Gemstone: Emerald</li>
        </ul>

        <p>
          <strong>10. Magha</strong>
        </p>
        <ul>
          <li>Deity: Pithras</li>
          <li>Lord: Ketu</li>
          <li>Color: Ivory or cream</li>
          <li>Gemstone: Cat’s Eye</li>
        </ul>

        <p>
          <strong>11. Purva Phalguni</strong>
        </p>
        <ul>
          <li>Deity: Bhaga</li>
          <li>Lord: Venus</li>
          <li>Color: Light brown</li>
          <li>Gemstone: Diamond</li>
        </ul>

        <p>
          <strong>12. Uttara Phalguni</strong>
        </p>
        <ul>
          <li>Deity: Aryaman</li>
          <li>Lord: Sun</li>
          <li>Color: Bright blue</li>
          <li>Gemstone: Ruby</li>
        </ul>

        <p>
          <strong>13. Hasta</strong>
        </p>
        <ul>
          <li>Deity: Aditya</li>
          <li>Lord: Moon</li>
          <li>Color: Deep green</li>
          <li>Gemstone: Natural Pearl</li>
        </ul>

        <p>
          <strong>14. Chitra</strong>
        </p>
        <ul>
          <li>Deity: Tvashtav</li>
          <li>Lord: Mars</li>
          <li>Color: Black</li>
          <li>Gemstone: Red Coral</li>
        </ul>

        <p>
          <strong>15. Swati</strong>
        </p>
        <ul>
          <li>Deity: Vayu</li>
          <li>Lord: Rahu</li>
          <li>Color: Black</li>
          <li>Gemstone:Gomedha</li>
        </ul>
        <p>
          <strong>16. Vishakha</strong>
        </p>
        <ul>
          <li>Deity: Indra-Agni</li>
          <li>Lord: Jupiter</li>
          <li>Color: Golden</li>
          <li>Gemstone: Yellow Sapphire</li>
        </ul>

        <p>
          <strong>17. Anuradha</strong>
        </p>
        <ul>
          <li>Deity: Mitra</li>
          <li>Lord: Saturn</li>
          <li>Color: Reddish brown</li>
          <li>Gemstone: Blue Sapphire</li>
        </ul>

        <p>
          <strong>18. Jyeshta</strong>
        </p>
        <ul>
          <li>Deity: Indra</li>
          <li>Lord: Mercury</li>
          <li>Color: Cream</li>
          <li>Gemstone: Emerald</li>
        </ul>

        <p>
          <strong>19. Mula</strong>
        </p>
        <ul>
          <li>Deity: Nirrti</li>
          <li>Lord: Ketu</li>
          <li>Color: Brownish yellow</li>
          <li>Gemstone: Cat’s Eye</li>
        </ul>

        <p>
          <strong>20. Purva Shadha</strong>
        </p>
        <ul>
          <li>Deity: Jal</li>
          <li>Lord: Venus</li>
          <li>Color: Black</li>
          <li>Gemstone: Diamond</li>
        </ul>

        <p>
          <strong>21. Uttara Shadha</strong>
        </p>
        <ul>
          <li>Deity: Vishva Deva</li>
          <li>Lord: Sun</li>
          <li>Color: Copper</li>
          <li>Gemstone: Ruby</li>
        </ul>

        <p>
          <strong>22. Shravana</strong>
        </p>
        <ul>
          <li>Deity: Vishnu</li>
          <li>Lord: Moon</li>
          <li>Color: Light blue</li>
          <li>Gemstone: Natural Pearl</li>
        </ul>

        <p>
          <strong>23. Dhanishta</strong>
        </p>
        <ul>
          <li>Deity: Ashta vasav</li>
          <li>Lord: Mars</li>
          <li>Color: Silver Grey</li>
          <li>Gemstone: Red Coral</li>
        </ul>

        <p>
          <strong>24. Shatabhisha</strong>
        </p>
        <ul>
          <li>Deity: Varuna</li>
          <li>Lord: Rahu</li>
          <li>Color: Aquamarine</li>
          <li>Gemstone: Gomedh</li>
        </ul>

        <p>
          <strong>25. Purva Bhadrapada</strong>
        </p>
        <ul>
          <li>Deity: Ajaikapat</li>
          <li>Lord: Jupiter</li>
          <li>Color: Silver grey</li>
          <li>Gemstone: Yellow Sapphire</li>
        </ul>

        <p>
          <strong>26. Uttara Bhadrapada</strong>
        </p>
        <ul>
          <li>Deity: Ahir Budhanya</li>
          <li>Lord: Saturn</li>
          <li>Color: Purple</li>
          <li>Gemstone: Blue Sapphire</li>
        </ul>

        <p>
          <strong>27. Revati</strong>
        </p>
        <ul>
          <li>Deity: Pooshvav</li>
          <li>Lord: Mercury</li>
          <li>Color: Brown</li>
          <li>Gemstone: Emerald</li>
        </ul>

        <p>
          <strong>
            Qualities and Positive activities for different Nakshatras
          </strong>
        </p>
        <p>
          <strong>Stable Nakshatras</strong>
        </p>
        <p>
          Rohini, Uttara Phalguni, Uttara Ashadha, and Uttara Bhadrapada are
          steady Nakshatras. They're good for long-term activities like buying a
          home or planting trees. These qualities are even stronger when they
          happen on a Sunday.
        </p>

        <p>
          <strong>Moving Nakshatras</strong>
        </p>
        <p>
          Punarvasu, Swati, Shravana, Dhanishtha, and Shatabhisha are moving
          Nakshatras. They're great for journeys and buying vehicles. These
          qualities are emphasized when they match with Monday.
        </p>
        <p>
          <strong>Fierce Nakshatras</strong>
        </p>
        <p>
          Bharani, Magha, Purva Phalguni, Purva Ashadha, and Purva Bhadrapada
          are fierce Nakshatras. They're appropriate for tasks requiring force
          or dealing with challenges. These qualities are better on Tuesday.
        </p>
        <p>
          <strong>Quick Nakshatras</strong>
        </p>
        <p>
          Ashwini, Pushya, and Hasta are quick Nakshatras. They're favourable
          for activities like business transactions, admissions, travel, and
          loans. These qualities shine on Thursday.
        </p>
        <p>
          <strong>Soft Nakshatras</strong>
        </p>
        <p>
          Mrigashira, Chitra, Anuradha, and Revati are soft Nakshatras. They're
          great for enjoyment, arts, and creative hobbies like dancing, writing
          poetry, or drama. These qualities stand out on Friday.
        </p>
        <p>
          <strong>Sharp Nakshatras</strong>
        </p>
        <p>
          Ardra, Ashlesha, Jyeshtha, and Mula are sharp Nakshatras. They're
          suitable for powerful activities like exorcism, dealing with demons,
          divorce, or punishment. These qualities are noticeable on Saturday.
        </p>
        <p>
          <strong>Mixed Nakshatras</strong>
        </p>
        <p>
          Krittika and Vishakha are mixed Nakshatras. They're favorable for fire
          ceremonies, buying electronics or furniture, and such activities.
          These qualities are better when they match with Wednesday.
        </p>
        <p>
          AstroPush is a user-friendly online platform for people curious about
          astrology. It doesn't matter if you're just starting or really into
          astrology; you can learn a lot by going to our website or getting the
          AstroPush app. These tools have tons of information about astrology,
          so you can explore this interesting subject right from your own
          device, like a smartphone or computer.
        </p>
        <div className="container faq-section py-3">
          <FAQ data={nakshatraFaq} />
        </div>
      </section>
    </>
  );
};

export default HOC(Nakshatra);
