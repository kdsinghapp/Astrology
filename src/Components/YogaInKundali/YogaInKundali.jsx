import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import CommonCrousal from "../CommonCrousal/CommonCrousal";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import FAQ from "../AstroPushFAQ/FAQ";

const YogaInKundali = () => {
  const [astrologyYogaFaq, setAstrologyYogaFaq] = useState([
    {
      show: true,
      heading: "<h2>Which is the best yoga in astrology?</h2>",
      desc: "<p>Raja yogas are special combinations of planets in astrology that are considered lucky. They are believed to bring success and a big boost in your career or business. These yogas can also make you more financially prosperous, especially when certain planets are active during specific time periods called dasha.</p>",
    },
    {
      show: true,
      heading: "<h2>Is yoga related to astrology?</h2>",
      desc: "<p>In Hindu astrology, yoga means how planets, signs, or houses are connected to each other through their position, alignment, or closeness. It's all about how these cosmic factors influence each other. This idea also involves looking at the effects of the planets' movement in different directions over time, which is a crucial aspect that sets Hindu astrology apart from Western astrology.</p>",
    },
    {
      show: true,
      heading: "<h2>What is Shiva yoga in astrology?</h2>",
      desc: "<p>This yoga is like a lucky charm that brings good fortune, wealth, positivity, and strength. It's like having extra courage and power when you begin something important during this time. In a way, it's like having the blessing of Lord Shiva.</p>",
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
        <BreadcrumbSection tittle="Yoga In Kundali" />
        <div className="pt-1">
          <h3 className="pb-2 mt-4">Introduction</h3>
          <p>
            A Kundli is like a special map that tells us about a person's life.
            It shows how the planets and other things in the sky can influence
            what happens to a person every day. To make this map, we use three
            main things: 12 houses, 9 planets, and 12 astrological signs. In
            astrology, we believe that when these planets come together in
            certain ways, it can create something called "yoga" in the Kundli.
          </p>
          <p>
            Yoga is a really important part of Kundli predictions. It happens
            when planets, houses, or signs come together in the Kundli, and it
            can be good or bad. An astrologer can tell you about your Kundli by
            looking at the kind of yoga it has, whether it's good or bad.
            Usually, people know more about two types of yoga: Raj Yoga and
            Gajakesari Yoga. If you have these in your Kundli, it means you
            might have a good chance of being rich and prosperous. But if you
            have bad yoga, it could bring bad luck or poverty.
          </p>
          <p>
            In astrology, there are actually about 300 different types of yoga
            that can form in a Kundli. It's all about how the planets and signs
            come together in your Kundli, and astrologers use this information
            to make predictions about your life.
          </p>
        </div>
        <div className="">
          <h3 className="pb-2 mt-4">Types of Yogas in Astrology</h3>
          <p>
            In astrology, we talk about something called "yoga," which is like a
            good or bad influence from the planets in a person's Kundli (birth
            chart). It's like planets can either make things go well (good yoga)
            or cause problems (bad yoga) in a person's life.
          </p>
          <p>
            Vedic Astrology, a type of astrology, has described many different
            yogas, maybe around a hundred of them. Some of these yogas can bring
            wealth and fame, making life better, while others can bring a lot of
            trouble, making life difficult. Here are a few examples of these
            yogas: Gajakesari Yoga, Veeprit Yoga, Panch Mahapurush Yoga, Laxmi
            Yoga, Neech Bhang Raj Yoga, MahaBhagya Yoga and more.
          </p>
        </div>
      </section>
      <CommonCrousal />
      <section className="container content_section mb-5">
        <div>
          <h3 className="pb-2 mt-5">
            Let’s understand their qualities and characteristics in detail:
          </h3>

          <p>
            <strong>Panch Mahapurush Yoga</strong>
          </p>
          <ul>
            <li>
              This is a special yoga in astrology that happens when five
              powerful planets—Mars, Mercury, Jupiter, Saturn, and Venus—line up
              in certain ways.
            </li>
            <li>
              It's like a team of these planets coming together to create a
              positive influence in a person's life.
            </li>
            <li>
              To form this yoga, these planets need to be in their best
              positions in certain houses in the birth chart.
            </li>
            <li>
              When this yoga happens, it leads to five different types of
              outcomes, and each of these outcomes has its own unique
              characteristics.
            </li>
          </ul>

          <p>
            <strong>Gaj Kesari Yoga</strong>
          </p>
          <ul>
            <li>
              Imagine this yoga as a combination of the great qualities of an
              elephant (Gaja) and a lion (Kesari).
            </li>
            <li>
              It happens when the planet Jupiter is in specific positions in the
              birth chart.
            </li>
            <li>
              When someone has this yoga, it brings them intelligence,
              prosperity, and respect.
            </li>
            <li>
              People with Gaj Kesari Yoga tend to do well in both their material
              and spiritual aspects of life.
            </li>
          </ul>

          <p>
            <strong>Neech Bhang Raj Yoga</strong>
          </p>
          <ul>
            <li>
              This yoga forms when a planet that was initially weak
              (debilitated) becomes strong in the birth chart.
            </li>
            <li>
              At the beginning of life, things might be tough for a person with
              this yoga.
            </li>
            <li>
              However, as time goes on and that once-weak planet becomes strong,
              it can lead to wealth and success.
            </li>
          </ul>

          <p>
            <strong>Vipreet Raj Yoga</strong>
          </p>
          <ul>
            <li>
              Vipreet Raj Yoga is all about turning challenges and hardships
              into wealth and respect.
            </li>
            <li>
              It forms when specific house lords (those in charge of certain
              areas of life) are in specific houses in the birth chart.
            </li>
            <li>
              So, if someone goes through a tough time in the beginning, this
              yoga suggests that they could turn things around and achieve
              wealth and respect later in life.
            </li>
          </ul>

          <p>
            <strong>Lakshmi Yoga</strong>
          </p>
          <ul>
            <li>
              This yoga is all about blessings of wealth, fortune, and
              prosperity.
            </li>
            <li>
              It happens when the lord of the 9th house (which represents luck
              and blessings) is in a good position in the birth chart.
            </li>
            <li>
              People with Lakshmi Yoga may enjoy a high-ranking or respected
              position in society.
            </li>
          </ul>

          <p>
            <strong>Kalanidhi Yoga</strong>
          </p>
          <ul>
            <li>
              To understand this yoga, think of it as a talent that needs some
              polishing to shine.
            </li>
            <li>
              It forms when the planet Jupiter is in a specific position in the
              2nd house, with support from Venus or Mercury.
            </li>
            <li>
              This yoga indicates that the person has talent, but they'll need
              to work hard to make the most of it.
            </li>
          </ul>

          <p>
            <strong>Mahabhagya Yoga</strong>
          </p>
          <ul>
            <li>
              This is one of the most powerful yogas, suggesting that someone is
              born with a lot of good luck.
            </li>
            <li>
              Whether you're born during the day or night matters for this yoga.
            </li>
            <li>
              It's like being born with a silver spoon in your mouth, and it's
              believed that you must have done something really good in a
              previous life to have this yoga.
            </li>
          </ul>

          <p>
            <strong>Shubh Kartari Yoga</strong>
          </p>
          <ul>
            <li>
              Imagine this yoga as a source of happiness, prosperity, and
              encouragement for creativity.
            </li>
            <li>
              It happens when two benefic planets (planets that bring positive
              energy) are in specific houses.
            </li>
            <li>
              People with this yoga may find success and happiness coming to
              them relatively easily.
            </li>
          </ul>

          <p>
            <strong>Akhanda Samrajya Yoga</strong>
          </p>
          <ul>
            <li>This yoga is like a ticket to living like a king or queen.</li>
            <li>It suggests immense wealth, fame, and luxuries.</li>
            <li>
              It forms when certain house lords are in specific positions, and
              it can even lead to high education or fame.
            </li>
          </ul>

          <p>
            <strong>Amala Yoga</strong>
          </p>
          <ul>
            <li>
              Amala Yoga is all about fortune, fame, and being a good-hearted
              person.
            </li>
            <li>
              It happens when a benefic planet (a planet that brings positive
              energy) is in the 10th house.
            </li>
            <li>
              People with this yoga tend to have a pleasant nature and are
              well-liked by others.
            </li>
          </ul>

          <p>
            <strong>Dhan Yoga</strong>
          </p>
          <ul>
            <li>
              This yoga is about becoming wealthy, often from various sources.
            </li>
            <li>
              It forms when the lords of the 2nd and 11th houses (related to
              money) are connected to the 5th and 9th houses somehow.
            </li>
            <li>
              So, you might inherit wealth, do well in business, and receive
              cosmic help to gain massive wealth.
            </li>
          </ul>

          <p>
            <strong>Kotipati Yoga</strong>
          </p>
          <ul>
            <li>
              This is a rare and amazing yoga that suggests a constant flow of
              money throughout life.
            </li>
            <li>It's like having millions of rupees or wealth.</li>
            <li>
              To have this yoga, specific planetary positions are needed,
              including the influence of Venus, Jupiter, and Saturn.
            </li>
          </ul>

          <p>
            <strong>Mahalaxmi Yoga</strong>
          </p>
          <ul>
            <li>
              This yoga is all about wealth and prosperity compared to others
              who don't have it.
            </li>
            <li>
              It forms when the planets Moon and Mars are together in specific
              houses.
            </li>
            <li>People with Mahalaxmi Yoga tend to be super-rich.</li>
          </ul>

          <p>
            <strong>Shukra Yoga</strong>
          </p>
          <ul>
            <li>
              Shukra Yoga brings influence and a life filled with luxuries.
            </li>
            <li>
              It happens when the planet Venus is in the 12th house, which is
              usually considered not very good.
            </li>
            <li>People with this yoga are often very wealthy.</li>
          </ul>

          <p>
            <strong>Chandra Mangal Yoga</strong>
          </p>
          <ul>
            <li>This yoga suggests extreme wealth.</li>
            <li>
              It forms when the planets Moon and Mars are in specific houses or
              signs.
            </li>
            <li>People with this combination tend to become extremely rich.</li>
          </ul>

          <p>
            <strong>Guru Mangal Yoga</strong>
          </p>
          <ul>
            <li>
              This yoga forms when the planet Jupiter and Mars are together in
              the birth chart.
            </li>
            <li>It usually leads to prosperity and success.</li>
          </ul>

          <p>
            <strong>Kahal Yoga</strong>
          </p>
          <ul>
            <li>This yoga indicates richness, fame, and a regal life.</li>
            <li>
              It forms when certain house lords are in specific positions.
            </li>
          </ul>

          <p>
            <strong>Vashi Yoga</strong>
          </p>
          <ul>
            <li>Vashi Yoga brings positivity and auspiciousness to life.</li>
            <li>
              It's related to the placement of the Sun and is associated with
              financial soundness and fame.
            </li>
          </ul>

          <p>
            <strong>Teevra Buddhi Yoga</strong>
          </p>
          <ul>
            <li>This yoga indicates exceptional intelligence.</li>
            <li>
              It forms when certain planets are aspected by benefic planets.
            </li>
          </ul>

          <p>
            <strong>Bahubharya Yoga</strong>
          </p>
          <ul>
            <li>This yoga suggests having multiple marriages.</li>
            <li>
              It forms when the lords of the ascendant and the 7th house
              (related to marriage) are connected.
            </li>
          </ul>

          <p>
            <strong>Parijata Yoga</strong>
          </p>
          <ul>
            <li>Parijata Yoga brings happiness, fame, and patronage.</li>
            <li>It forms when specific planets are in certain positions.</li>
          </ul>

          <p>
            <strong>Uttamvarga Yoga</strong>
          </p>
          <ul>
            <li>
              Uttamvarga Yoga leads to family happiness, luck, and prosperity.
            </li>
            <li>
              It forms when the lord of the 4th house (related to home and
              happiness) is in good positions.
            </li>
          </ul>
        </div>
      </section>
      <section className="container content_section mb-5">
        <div>
          <h3 className="pb-2 mt-5">
            Discover 5 Life-Changing Wealth Yogas for Financial Success
          </h3>
          <p>
            Astrology has some interesting ideas about how planets affect our
            money. There are five main money-related "yogas" to know: Dhana
            Yoga, Laxmi Yoga, Budhaditya Yoga, Gaja Kesari Yoga, and Dhanu Panch
            Mahapurusha Yoga. These yogas tell us if we might be good at making
            money, enjoying luxury, being smart with finances, making wise money
            choices, or taking risks for big rewards. Let's break them down in
            an easier way.
          </p>

          <p>
            <strong>Dhana Yoga</strong>
          </p>
          <ul>
            <li>
              Happens when planets related to money are in good positions.
            </li>
            <li>
              It means financial stability, wealth accumulation, and success in
              money-related things.
            </li>
            <li>
              People with this yoga attract resources and make money easily.
            </li>
          </ul>

          <p>
            <strong>Laxmi Yoga</strong>
          </p>
          <ul>
            <li>
              Occurs when Venus, the planet of luxury, is strong in your birth
              chart.
            </li>
            <li>
              It means material comfort, artistic skills, and a love for
              luxurious living.
            </li>
            <li>
              People with Laxmi Yoga have a talent for making money from their
              creative pursuits.
            </li>
          </ul>

          <p>
            <strong>Budhaditya Yoga</strong>
          </p>
          <ul>
            <li>
              Forms when the Sun and Mercury are together in your birth chart.
            </li>
            <li>
              It represents intelligence, good communication, and financial
              smarts.
            </li>
            <li>
              People with this yoga are good at business and communication.
            </li>
          </ul>

          <p>
            <strong>Gaja Kesari Yoga</strong>
          </p>
          <ul>
            <li>Happens when Jupiter and the Moon are closely related.</li>
            <li>It symbolizes financial wisdom and growth.</li>
            <li>
              People with this yoga make smart financial decisions for long-term
              prosperity.
            </li>
          </ul>

          <p>
            <strong>Dhanu Panch Mahapurusha Yoga</strong>
          </p>
          <ul>
            <li>Occurs when Mars is strong in specific houses.</li>
            <li>It gives courage and determination.</li>
            <li>
              It emphasizes taking calculated risks to achieve ambitious goals
              and make money.
            </li>
          </ul>
        </div>
      </section>

      <section className="container content_section mb-5">
        <div>
          <h3 className="pb-2 mt-5">
            Yogas formed by Ascendant & Lord of Ascendant
          </h3>
          <p>
            In the world of astrology, there are some special combinations of
            planets called "yogas" that can give us clues about different
            aspects of our lives, including wealth, comfort, talents, and more.
            We're going to explore a few of these yogas that are related to your
            birth chart's starting point, called the Ascendant. These yogas can
            tell us if you're likely to be wealthy, live a comfortable life,
            have creative talents, or even become a leader. Plus, we'll uncover
            some lesser-known but effective combinations that can make your
            horoscope even stronger. So, let's dive into these astrological
            insights, broken down in a simple and easy-to-understand way.
          </p>

          <p>
            <strong>Adhi Yoga</strong>
          </p>
          <ul>
            <li>
              When Jupiter, Venus, and Mercury are in the 6th, 7th, or 8th
              houses from your birth chart's starting point.
            </li>
            <li>This is a strong combo for wealth and determination.</li>
            <li>You'll live a luxurious life and have leadership skills.</li>
            <li>It's good for starting your own business.</li>
          </ul>

          <p>
            <strong>Saraswati Yoga</strong>
          </p>
          <ul>
            <li>
              Jupiter, Mercury, and Venus in the 1st, 4th, 7th, 10th, 2nd, or
              5th houses from your starting point.
            </li>
            <li>Blessings from the goddess Saraswati.</li>
            <li>You're talented in singing or writing.</li>
            <li>Could become a famous author or creative person.</li>
          </ul>

          <p>
            <strong>Laxmi Yoga</strong>
          </p>
          <ul>
            <li>
              When the 9th house lord from your starting point is strong and in
              the 1st, 4th, 7th, 10th houses with the lord of your starting
              point also strong.
            </li>
            <li>You're courageous and take risks for money.</li>
            <li>Fame and wealth come your way.</li>
            <li>You find a rich and good partner.</li>
          </ul>

          <p>
            <strong>Shubh Kartari Yoga</strong>
          </p>
          <ul>
            <li>
              Happens when good planets like Jupiter, Venus, Mercury, and Moon
              are in the 2nd and 12th houses from your starting point.
            </li>
            <li>No bad stuff on your starting point.</li>
            <li>Life is comfy and peaceful.</li>
            <li>Positive thoughts and a sense of purity surround you.</li>
          </ul>

          <p>
            <strong>Ati-vasuman Yoga</strong>
          </p>
          <ul>
            <li>
              Mercury, Jupiter, and Venus in the 3rd, 6th, 10th, or 11th houses.
            </li>
            <li>These houses are about growth.</li>
            <li>This combo brings wealth.</li>
          </ul>

          <p>
            <strong>Amala Yoga</strong>
          </p>
          <ul>
            <li>
              A good planet in the 10th house from your starting point with no
              bad stuff on your starting point.
            </li>
            <li>You have a high status and good health.</li>
            <li>Earning wealth and fame is likely.</li>
          </ul>
        </div>
      </section>

      <section className="container content_section mb-5">
        <div>
          <h3 className="pb-2 mt-5">Other Combinations from Ascendant:</h3>
          <p>
            <strong>Hidden Strengths:</strong>
          </p>
          <p>
            There are some lesser-known astrological combinations that can
            significantly boost the strength of your birth chart.
          </p>

          <p>
            <strong>Wealth Indication:</strong>
          </p>
          <p>
            For instance, if you have Mercury, Jupiter, and Venus aligned with
            your Ascendant, and Saturn is positioned in the 7th house, it often
            directs a high possibility of becoming rich and accumulating wealth.
            This combination suggests that financial success may be an important
            part of your life.
          </p>

          <p>
            <strong>Ruler Potential:</strong>
          </p>
          <p>
            Alternatively, if Jupiter is located in your Ascendant and Mars is
            in the 2nd house of your birth chart, it could signify the potential
            to attain a position of power and rule over others. This combination
            indicates leadership qualities and the ability to have power.
          </p>

          <p>
            <strong>Rare Regal Sign:</strong>
          </p>
          <p>
            In extremely rare cases, if your rising sign is Pisces and your
            Ascendant degree falls between 26º 40' to 30º in Pisces, you may be
            meant for an extraordinarily high position in life, parallel to
            royalty. However, this potential comes with the condition that your
            planetary placements are favorable and not weakened. Such a unique
            astronomic alignment can give extraordinary status and authority.
          </p>
        </div>
      </section>

      <section className="container content_section mb-5">
        <div>
          <h3 className="pb-2 mt-5">Panch Mahapurush Yoga</h3>
          <p>
            Panch Mahapurush Yoga is a unique yoga that combines the influences
            of five different planets: Jupiter, Mars, Mercury, Saturn, and
            Venus. These planets have distinct characteristics, and how they are
            positioned in your birth chart can affect you in different ways.
          </p>

          <p>
            <strong>Hamsa Yoga</strong>
          </p>
          <ul>
            <li>
              Hamsa Yoga occurs when your natal Jupiter is in Sagittarius,
              Cancer, or Pisces, and one of these signs is in Kendra (1st, 4th,
              7th, or 10th house from your ascendant).
            </li>
            <li>
              People with Hamsa Yoga often gain fame and recognition in life.
              They are known for their intelligence and spirituality. Jupiter
              gives them knowledge and humility.
            </li>
          </ul>

          <p>
            <strong>Malavya Yoga</strong>
          </p>
          <ul>
            <li>
              Malavya Yoga forms when your Venus is in Taurus, Libra, or Pisces,
              and one of these signs is in either the 1st, 4th, 7th, or 10th
              house from your ascendant.
            </li>
            <li>
              This yoga blesses individuals with a charming personality and
              undeniable charisma. They are graceful and attractive. Luxury,
              comfort, and beauty are associated with Malavya Yoga.
            </li>
          </ul>

          <p>
            <strong>Bhadra Yoga</strong>
          </p>
          <ul>
            <li>
              Bhadra Yoga is created when Mercury is in Gemini or Virgo, and
              these signs are positioned in the 1st, 4th, 7th, or 10th house
              from your ascendant.
            </li>
            <li>
              Natives with Bhadra Yoga are believed to have a strong and healthy
              body, leading to a long life. They are quick-witted, gentle, and
              kind. They share Mercury's love for travel and gain much from it.
            </li>
          </ul>

          <p>
            <strong>Ruchaka Yoga</strong>
          </p>
          <ul>
            <li>
              Ruchaka Yoga forms when Mars is placed in Aries, Scorpio, or
              Capricorn, and one of these signs is in Kendra (1st, 4th, 7th, or
              10th house from your ascendant).
            </li>
            <li>
              Mars is associated with courage and bravery in Vedic astrology,
              and individuals with Ruchaka Yoga display these qualities. They
              often hold high positions in government or the military. They are
              not only physically strong but also possess solid mental strength.
            </li>
          </ul>

          <p>
            <strong>Sasa Yoga</strong>
          </p>
          <ul>
            <li>
              Sasa Yoga is created when Saturn is in its own signs Capricorn or
              Aquarius, or exalted in Libra, and at the same time, is situated
              in Kendra.
            </li>
            <li>
              This yoga is often associated with power and fame. Natives with
              Sasa Yoga are likely to achieve a higher social status in their
              lives. They are known for their hospitality and willingness to
              help others.
            </li>
          </ul>

          <p>
            <strong>Panch Mahapurush Yoga Conclusion</strong>
          </p>
          <p>
            These five yogas are part of the Panch Mahapurush Yoga, sometimes
            referred to as Panch Koti Yoga. Each of these yogas has its own
            unique characteristics and influences on the individual's life,
            depending on the positioning of these five significant planets in
            their birth chart.
          </p>
        </div>
      </section>

      <section className="container content_section mb-5">
        <div>
          <h3 className="pb-2 mt-5">
            The Sun and Moon Yogas That Shape Your Life
          </h3>
          <p>
            Astrology is all about how the positions of astronomical objects,
            like the Sun and the Moon, can influence who we are and the path our
            lives take. There are these things called "yogas," which are like
            special combinations of planets, and they give us clues about
            different parts of our lives. These yogas can tell us about our
            money, how good we are at talking to people, how attractive we are,
            and even if we might become important leaders. So, let's dive into
            these Sun and Moon-related yogas and break them down in simple
            words.
          </p>
          <p>
            <strong>Sun-Related Yogas and Their Impact</strong>
          </p>

          <p>
            <strong>Veshi Yoga</strong>
          </p>
          <ul>
            <li>
              Happens when a planet (except Rahu, Ketu, and Moon) is in the
              second position from the Sun.
            </li>
            <li>
              Gives you a truthful and spiritually inclined personality. You're
              good at talking and debating logically.
            </li>
            <li>Provides multiple sources of income.</li>
          </ul>

          <p>
            <strong>Vashi Yoga</strong>
          </p>
          <ul>
            <li>
              Occurs when a planet (except Rahu, Ketu, and Moon) is in the
              twelfth position from the Sun.
            </li>
            <li>
              You enjoy an authoritative role in administration. You lead a
              regal life and are skilled and intellectual.
            </li>
            <li>Strong memory and willpower, hardworking, and generous.</li>
          </ul>

          <p>
            <strong>Ubhayachari Yoga</strong>
          </p>
          <ul>
            <li>
              When a planet (except Rahu, Ketu, and Moon) is in a house just
              before or after where the Sun is placed (second and twelfth houses
              from Sun).
            </li>
            <li>
              You have a refined personality, courage, and a good social life.
              This yoga brings wealth and the comfort of servants.
            </li>
            <li>You enjoy a satisfying life and get support from society.</li>
          </ul>

          <p>
            <strong>Budh Aditya Yoga</strong>
          </p>
          <ul>
            <li>
              Forms when Sun is with Mercury in a house without affliction.
            </li>
            <li>
              Stronger in Virgo, Leo, Aries, and Gemini signs, especially in the
              Ascendant or 10th house.
            </li>
            <li>
              Provides royal comforts, wealth, and happiness. Makes you
              intelligent, famous, and sharp-minded. Good for learning quickly
              and excelling in business, accountancy, debate, and government.
            </li>
          </ul>

          <p>
            <strong>Other Combinations from Sun</strong>
          </p>
          <ul>
            <li>
              If Sun is in Aries in the first house, Saturn is in Libra, Jupiter
              and Venus are in Pisces, and the full Moon is influenced by Mars,
              it indicates a talent for military leadership or commanding roles.
            </li>
          </ul>
          <p>
            <strong>Moon-Related Yogas and Their Impact</strong>
          </p>

          <p>
            <strong>Sunafa Yoga</strong>
          </p>
          <ul>
            <li>
              Happens when a planet (not Rahu, Ketu, or Sun) is in the second
              house from where the Moon is.
            </li>
            <li>
              You become skilled, good at communication, and have a persuasive
              voice. You work hard and earn wealth. Intelligent, attractive,
              knowledgeable, well-mannered, and health-conscious.
            </li>
            <li>Often enjoy reading religious books and excel in sports.</li>
          </ul>

          <p>
            <strong>Anafa Yoga</strong>
          </p>
          <ul>
            <li>
              Occurs when one or more planets (not Rahu, Ketu, or Sun) are in
              the 12th house from the Moon.
            </li>
            <li>
              Gives you an attractive personality and magnetic charisma. Polite
              and influential way of speaking. You shine in debates and
              communication fields. Earn fame and respect in society, plus good
              health and financial stability.
            </li>
          </ul>

          <p>
            <strong>Durudhara Yoga</strong>
          </p>
          <ul>
            <li>
              When planets (not Rahu, Ketu, or Sun) are in the second and
              twelfth houses from the Moon. Planets shouldn't be negatively
              influenced.
            </li>
            <li>
              You're intelligent, hardworking, and resourceful. Earn well, make
              a good name in society, and enjoy a happy life with loved ones.
            </li>
          </ul>

          <p>
            <strong>Gajkesari Yoga</strong>
          </p>
          <ul>
            <li>
              Forms when Jupiter is in the 1st, 4th, 7th, or 10th house from the
              Moon without afflictions. Especially strong when planets are in
              powerful degrees without negative influences.
            </li>
            <li>
              Indicates intelligence, wealth, health, and sharp-mindedness.
              Enjoy luxuries, knowledge, fame, and victory over opponents.
            </li>
          </ul>

          <p>
            <strong>Adhi Yoga</strong>
          </p>
          <ul>
            <li>
              Occurs when Jupiter, Venus, and Mercury are in the 6th, 7th, or
              8th houses from the Moon. These planets become powerful in these
              houses.
            </li>
            <li>
              You may become a strong leader and gain wealth and luxuries.
              Strong willpower and mental strength to overcome obstacles.
              Excellent memory.
            </li>
          </ul>

          <p>
            <strong>Vasuman Yoga</strong>
          </p>
          <ul>
            <li>
              Forms when benefic planets occupy the 3rd, 6th, 10th, and 11th
              houses (Upachaya houses).
            </li>
            <li>
              Natives tend to be strong, wealthy, successful, and hardworking.
              Do well in business, confident, and have strong willpower.
            </li>
          </ul>

          <p>
            <strong>Gauri Yoga</strong>
          </p>
          <ul>
            <li>
              Happens when the Moon is in Taurus or Cancer or occupies a trine
              house from the Ascendant with Jupiter's aspect.
            </li>
            <li>
              Attractive and beautiful. Supportive parents, wealth, and a
              peaceful life with loved ones. Opportunity to marry a partner of
              your choice.
            </li>
          </ul>

          <p>
            <strong>Chandra Mangala Yoga</strong>
          </p>
          <ul>
            <li>Occurs when Mars is with the Moon in a house.</li>
            <li>
              Good for finance and income. Enjoy financial stability and respect
              in society. Can be challenging for relationships with mother and
              relatives, and may experience marriage delays (especially for
              females). Restless and fickle-minded at times.
            </li>
          </ul>

          <p>
            <strong>Amala Yoga</strong>
          </p>
          <ul>
            <li>
              Forms when benefic planets occupy the 10th house from the Moon,
              which is unafflicted.
            </li>
            <li>
              Enjoy an authoritative position in life. Wealthy, prosperous,
              famous, and experience career and social growth.
            </li>
          </ul>
        </div>
      </section>

      <section className="container content_section mb-5">
        <div>
          <h3 className="pb-2 mt-5">
            Decoding Your Astrological Yogas: How to Find and Understand Them
          </h3>
          <p>
            To find out the special combinations of planets, known as "yogas,"
            in your astrological chart, you have two main options. First, you
            can speak with an astrologer, online or offline, who will carefully
            examine your birth chart. They'll look at where the planets were
            positioned at the time you were born, how they relate to each other,
            and which houses and signs they are in. This analysis helps them
            locate specific yogas and explain what they mean for your life and
            personality.
          </p>
          <p>
            Alternatively, you can use online resources like astrology websites
            that offer yoga calculators. These tools require you to input your
            birth details, such as your birth date, time, and place. Once you
            provide this information, the calculators analyze your birth chart
            and generate a report that outlines the yogas present in your chart.
            This report will give you insights into the implications of these
            yogas on various aspects of your life. Both methods can help you
            discover and understand the yogas in your astrological chart.
          </p>

          <h3 className="pb-2 mt-5">Online Kundli with Astropush</h3>
          <p>
            Astropush provides online Kundli analysis based on Vedic astrology,
            a belief that your Kundli chart reflects every significant event in
            your life. It's like a map that outlines the journey of your life.
            By accurately analyzing your online Kundli, our online astrologers
            can uncover your strengths, weaknesses, personality traits, and
            preferences. This information can guide you toward a path of success
            and prosperity through online astrology.
          </p>
          <p>
            Our positive astrology approach, available online, helps you face
            life's ups and downs with courage and wisdom. It empowers you to
            make informed decisions about important aspects of life such as
            education, career, finances, and marriage through our online
            platform. Our free online Hindi Kundli report examines your Kundli
            for any doshas (imbalances) and suggests online solutions to
            overcome obstacles. We also study the movement of planets and how it
            can affect your future in the realm of online astrology.
          </p>
          <p>
            If you're curious about the Yogas (special combinations of planetary
            positions) in your life, now is the perfect time to get your
            personalized online Kundli from Astropush. It's a valuable online
            tool that can provide insights and guidance to help you navigate
            life's journey with confidence through online astrology.
          </p>

          <div className="container faq-section py-3">
            <FAQ data={astrologyYogaFaq} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(YogaInKundali);
