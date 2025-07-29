import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import CommonCrousal from "../CommonCrousal/CommonCrousal";
import FAQ from "../AstroPushFAQ/FAQ";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";

const Aarti = () => {
  const [aartiSignificanceFaq, setAartiSignificanceFaq] = useState([
    {
      show: true,
      heading: "<h2>What is the power of Aarti?</h2>",
      desc: "<p>All people have an aura even if some do not believe it. Bad thoughts or jealous people can harm you and your soul. Doing an individual Aarti can protect you from these bad effects. This art has the power to keep you safe from such bad things.</p>",
    },
    {
      show: true,
      heading: "<h2>What is the spiritual meaning of aarti?</h2>",
      desc: "<p>Aarti serves as a means of expressing a collection of emotions. It can encompass feelings of love, kindness, gratitude, faith, or even hopes and desires. The specific emotions conveyed through Aarti depend on the individual or object for whom it is performed.</p>",
    },
    {
      show: true,
      heading: "<h2>At what time should we do aarti at home?</h2>",
      desc: "<p>Aarti is performed twice daily, in the morning and evening, at home. As part of proper devotion, flowers are offered three times before beginning the Aarti. Using ghee and three, five, or seven wicks (Baati), the Aarti of God is then performed by lighting the Diya.</p>",
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
        <BreadcrumbSection tittle="Aarti" />
        <div className="pt-1">
          <h3 className="pb-2 mt-4">Aarti: The ceremony of Lights</h3>
          <p>
            <strong>Introduction</strong>
          </p>
          <p>
            An "Aarti" is a special ceremony in Hinduism that happens a lot in
            temples. It takes place about six to seven times every day. During
            this ceremony, people show respect to the idol of a God, which is
            called a "Murti." A priest called a "Pujari" or “Pandit” leads the
            ceremony, and people who believe in this religion watch and take
            part.
          </p>
          <p>
            The aarti is all about using light to get rid of darkness and
            negativity. The word "Aarti" comes from an old language called
            Sanskrit. It means to light up the dark night and make it bright.
            This is like a symbol of hope, belief and goodness. The word "Aarti"
            has another meaning too: "A + Rati." In this, 'A' means to make
            bigger, and 'rati' means liking or love. So, doing the aarti is like
            making your love and connection with the God stronger.
          </p>
          <p>
            In the aarti, the God's idol or image is worshiped using bright
            well-lit lamps called "Deepmala." The priest or the person doing the
            ceremony moves Aarti articles in circular motions representing the
            clockwise flow in front of the God's image or idol. At the same
            time, they ring a small bell and think about all the different ways
            the God is seen.
          </p>
          <p>
            This whole ceremony usually lasts from five to thirty minutes.
            During this time, the person doing it offers things like
            nice-smelling stuff, a flower, clean water, a lamp with five flames,
            and another lamp with something that makes a bright flame. The
            ceremony starts and ends with the sound of a conch-shell horn often
            known as the “Shankh”. This horn sound is like saying "we're
            beginning" and "we're done."
          </p>
        </div>
      </section>
      <CommonCrousal />
      <section className="container content_section mb-4">
        <div className="pt-3">
          <p>
            <strong>
              Understanding the Deeper Meaning of performing an Aarti
            </strong>
          </p>
          <p>
            The main reason people perform the aarti is to wave small burning
            wicks in front of the Gods, which are like special gods or sacred
            beings. When they do this, they feel humble and thankful. This
            action lets them connect very closely with the special form of God
            they believe in. It's like they are saying, "Hello" in a very
            respectful way to their divine friend. The aarti is even more
            special because it has a hidden meaning. The things they use in the
            aarti, like the fire, the wind, the water, the sky, and the earth,
            represent different parts of nature.
          </p>
          <p>
            Each of these elements represents a specific aspect of nature and
            existence:
          </p>
          <p>
            <strong>1. Sky (Akash):</strong>
          </p>
          <ul>
            <li>
              The element of Sky (Akash) stands for the hugeness and openness of
              the universe.
            </li>
            <li>
              It symbolizes the vastness that goes beyond our imagination,
              reminding us of the endless possibilities in the universe.
            </li>
          </ul>

          <p>
            <strong>2. Wind (Vayu):</strong>
          </p>
          <ul>
            <li>Wind (Vayu) is a symbol of movement and change.</li>
            <li>
              It represents the life force that constantly flows through
              everything, bringing about changes, evolutions, and the energy of
              motion.
            </li>
          </ul>

          <p>
            <strong>3. Fire (Agni):</strong>
          </p>
          <ul>
            <li>
              Fire (Agni) holds deep symbolism of transformation, energy, and
              enlightenment.
            </li>
            <li>
              Just as fire transforms matter into different forms, it's a
              reminder of how change is an essential part of life.
            </li>
            <li>
              Fire also brings light, dispersing darkness, and symbolizes the
              energy that fuels our actions and deeds.
            </li>
          </ul>

          <p>
            <strong>4. Water (Jal):</strong>
          </p>
          <ul>
            <li>Water (Jal) symbolizes purity, nourishment, and fluidity.</li>
            <li>
              Just as water cleanses and purifies, it represents the need for
              internal cleansing and renewal in our spiritual journey.
            </li>
            <li>
              Water's nourishing quality is a reminder of how our souls need
              nourishment, much like our bodies.
            </li>
          </ul>

          <p>
            <strong>5. Earth (Prithvi):</strong>
          </p>
          <ul>
            <li>Earth (Prithvi) signifies stability and foundation.</li>
            <li>
              Like the earth supports all life, it represents the strong base
              from which we can grow spiritually.
            </li>
            <li>
              The element of earth reminds us of the importance of being
              grounded in our beliefs and values.
            </li>
          </ul>
          <p>
            When these elements are included in the Aarti ceremony, it's like
            making a link between the real world and the spiritual world. When
            people acknowledge these elements and show respect, it helps them
            remember how nature, spiritual world, and they themselves are all
            connected. This connection helps them know that they are a special
            part of everything around them. It's like thinking about how they
            fit into the big picture of the universe and how everything is
            related.
          </p>
        </div>
      </section>
      <section className="container content_section mb-4">
        <div className="pt-3">
          <p>
            <strong>Benefits and Significance of Aarti</strong>
          </p>

          <p>
            <strong>1. Purification through Holy Fire:</strong>
          </p>
          <ul>
            <li>
              One of the key advantages of performing Aarti stands in the use of
              fire, an essential force known for its purifying attributes.
            </li>
            <li>
              By including fire in the ceremony, a holy and pure atmosphere is
              created around the Idol being worshipped.
            </li>
            <li>
              This holy environment releases positive energies, effectively
              purifying not only the space but also the hearts and thoughts of
              the devotees present.
            </li>
          </ul>

          <p>
            <strong>2. Camphor's Significance and Spiritual Message:</strong>
          </p>
          <ul>
            <li>
              In certain occasions, the traditional wick (Baati) is replaced
              with camphor (Kapoor) for Aarti.
            </li>
            <li>
              Camphor, when ignited, completely dissolves into the flames,
              offering a deep significance of surrendering to the divine power.
            </li>
            <li>
              The act of using camphor signifies the sacrificing of ego and the
              acceptance of humbleness.
            </li>
            <li>
              It functions as an emotional reminder to devotees of their
              everlasting nature and the need to rise above materialistic
              desires.
            </li>
          </ul>

          <p>
            <strong>3. Life Lessons from the Ritual:</strong>
          </p>
          <ul>
            <li>The Aarti ceremony conveys valuable life lessons.</li>
            <li>
              Camphor's nature to dissolve completely to brighten and spread
              fragrance indicates the ideal of living a life that leaves behind
              a positive impact.
            </li>
            <li>
              The ceremony inspires a life devoted to worshipping, supporting
              others, and leaving a gift of goodness.
            </li>
          </ul>

          <p>
            <strong>4. Deep Connection with God:</strong>
          </p>
          <ul>
            <li>
              Aarti serves as a spiritual link, bringing devotees closer to the
              heavenly presence.
            </li>
            <li>
              During this ritual, individuals often close their eyes, allowing
              them to develop a deep connection with their inner selves and the
              spiritual world.
            </li>
          </ul>

          <p>
            <strong>5. Guidance and Overcoming Problems:</strong>
          </p>
          <ul>
            <li>
              The ritual of Aarti is not just representational; it is believed
              to have a transformative effect on the lives of devotees.
            </li>
            <li>
              By participating in Aarti, the difficulties and problems in one's
              life are believed to be removed, and a path towards success and
              prosperity is shown.
            </li>
          </ul>

          <p>
            <strong>6. Overall Well-being:</strong>
          </p>
          <ul>
            <li>
              The practice of Aarti promotes and strengthens devotion and
              spirituality.
            </li>
            <li>
              This devotion has important impacts, enriching the devotees’ life,
              mentally, emotionally, religiously, and physically.
            </li>
            <li>
              Consequently, Aarti contributes to a complete sense of well-being.
            </li>
          </ul>

          <p>
            <strong>7. Scientific Significance:</strong>
          </p>
          <ul>
            <li>
              Aarti carries not only spiritual depth but also scientific
              significance.
            </li>
            <li>
              The sounds generated by bells and drums during Aarti create
              specific waves that send vibrations in the surroundings.
            </li>
            <li>
              These waves have been shown to reduce air pollution and the
              presence of harmful bacteria, contributing to a cleaner and
              healthier atmosphere.
            </li>
            <li>
              Moreover, the burning of Dhoop releases positive energy that
              nurtures the spiritual well-being of devotees.
            </li>
          </ul>

          <p>
            <strong>8. Unity, Support, and Spiritual Presence:</strong>
          </p>
          <ul>
            <li>
              Aarti holds cultural and mutual significance, going beyond
              individual’s belief.
            </li>
            <li>
              It is performed in various life situations, including times of
              conflict and victory, representing unity, support, and a shared
              spiritual presence.
            </li>
          </ul>
          <p>
            <strong>Types of Aarti</strong>
          </p>
          <p>
            <strong>1. Mangala Aarti:</strong>
          </p>
          <p>
            <strong>Meaning:</strong> 'Auspicious'
          </p>
          <ul>
            <li>The Mangala Aarti is like an auspicious start.</li>
            <li>It's a way to start the day with positivity and good vibes.</li>
            <li>
              When the sun rises, this Aarti happens, making the day full of
              blessings, positivity, and promises.
            </li>
          </ul>

          <p>
            <strong>2. Shangar Aarti:</strong>
          </p>
          <p>
            <strong>Meaning:</strong> 'Adornments'
          </p>
          <ul>
            <li>
              During the Shangar Aarti, the Idols are dressed up really nicely.
            </li>
            <li>
              This happens early in the morning, where the Pujaris or Pandits
              decorate the Idols with beautiful clothes and ornaments.
            </li>
          </ul>

          <p>
            <strong>3. Rajbhog Aarti:</strong>
          </p>
          <p>
            <strong>Meaning:</strong> 'Royal Offering'
          </p>
          <ul>
            <li>When the sun is high up, it's time for the Rajbhog Aarti.</li>
            <li>
              This is when the Gods are offered a big, delicious meal known as
              “Prasad”.
            </li>
          </ul>

          <p>
            <strong>4. Sandhya Aarti:</strong>
          </p>
          <p>
            <strong>Meaning:</strong> 'Evening'
          </p>
          <ul>
            <li>As the sun sets, the Sandhya Aarti happens.</li>
            <li>
              It's a special time to connect with the Gods in the evening.
            </li>
            <li>
              During this Aarti, people feel calm and connected, like the day is
              ending on a peaceful note.
            </li>
          </ul>

          <p>
            <strong>5. Shayan Aarti:</strong>
          </p>
          <p>
            <strong>Meaning:</strong> 'Sleeping'
          </p>
          <ul>
            <li>
              When it's late and time to sleep, the Shayan Aarti takes place.
            </li>
            <li>
              The Gods are dressed in comfortable clothes, like they're getting
              ready to rest.
            </li>
            <li>
              Devotees sing soothing songs, as if singing them to sleep, and
              it's a nice way to end the day.
            </li>
          </ul>
          <p>
            These Aarti ceremonies make a beautiful pattern of devotion and
            connection throughout the day. They help devotees feel close to the
            Gods in different moments, making each part of the day meaningful in
            a special way.
          </p>
          <p>
            <strong>Significance of Ganga Aarti</strong>
          </p>
          <ul>
            <li>
              The Ganga Aarti ceremony is a profoundly significant and cherished
              tradition in Hindu culture. It holds a special place in the hearts
              of those who follow this faith because it serves as a way to
              express deep reverence and admiration for the Ganges River, which
              is considered a sacred and revered waterway in Hinduism.
            </li>
            <li>
              What makes the Ganga Aarti particularly meaningful is the powerful
              message it conveys to all participants. It reminds them that there
              exists a divine force, often referred to as God, that is the
              ultimate controller of all human actions and the entire universe.
              This spiritual insight offers people a source of inner strength
              and flexibility that is essential for navigating life's many ups
              and downs. It teaches the profound lesson of surrendering to a
              higher power and having faith in a larger cosmic plan.
            </li>

            <li>
              Furthermore, the Ganga Aarti ceremony is seen as a source of
              spiritual solace and a pathway to peace of mind. Many Hindus seek
              spiritual salvation and a sense of relief from the burdens and
              worries of everyday life. Attending this ritual is believed to
              provide them with that solace. It is said that those who regularly
              participate in the Ganga Aarti ceremony can gradually shed their
              ego and find respite from the stress and anxieties that often
              accompany the challenges of daily existence.
            </li>

            <li>
              In essence, the Ganga Aarti ceremony is not just a physical
              ritual; it is a profound spiritual experience. It serves as a
              poignant reminder of our deep connection to the divine and the
              importance of surrendering ourselves to a higher power. For those
              who partake in this ceremony, it offers comfort, calmness, and a
              profound sense of purpose, making it a treasured and revered
              tradition within Hindu culture.
            </li>
          </ul>
          <p>
            <strong>The right way of performing an Aarti</strong>
          </p>
          <p>
            Performing the Aarti, a sacred ritual in Hinduism, involves several
            significant steps. These steps hold deep spiritual meaning and help
            create a connection between the devotee and the deity being
            worshiped. Let's explore these steps in detail.
          </p>
          <p>
            <strong>1. Lighting the Lamp:</strong>
          </p>
          <p>
            The first step is to light a lamp, typically an oil lamp with a
            wick. This act symbolizes dispelling darkness and bringing light
            into one's life. It signifies the presence of the divine and the
            removal of ignorance.
          </p>

          <p>
            <strong>2. Blowing the Conch:</strong>
          </p>
          <p>
            The blowing of a conch shell is the second step. The sound of the
            conch is believed to purify the environment and alert the divine
            forces about the beginning of the ritual. It's a call to the gods
            and goddesses to join the ceremony.
          </p>

          <p>
            <strong>3. Wearing Clean Clothes:</strong>
          </p>
          <p>
            During the Aarti, it's important to wear clean and freshly washed
            clothes. This step emphasizes purity, both physical and spiritual.
            Cleanliness is seen as essential for connecting with the divine.
          </p>

          <p>
            <strong>4. Offering Mango, Pepul Leaves, and Flowers:</strong>
          </p>
          <p>
            The third step involves making offerings to the deity. These
            offerings typically include mango, peepal leaves, and flowers. Each
            of these items has symbolic significance. Mango represents a sweet
            offering to God, peepal leaves symbolize long life, and flowers are
            a gesture of devotion and beauty.
          </p>

          <p>
            <strong>5. Bowing Down in Reverence (Dandhwat Pranaam):</strong>
          </p>
          <p>
            Finally, the devotee bows down in a pose of deep reverence, known as
            "Dandhwat Pranaam." This act shows utmost respect and surrender to
            the deity. It signifies humility and acknowledges the divine as the
            ultimate authority.
          </p>

          <p>
            During the Aarti, there's a special plate made of metal. It has
            wicks soaked in oil, along with flowers, incense, and rice. This
            plate is passed around a person or a figure that represents a god or
            goddess while people recite prayers or songs.
          </p>

          <p>
            If you're invited to take part in an Aarti ceremony, it's essential
            to understand what's expected. Don't touch or move anything unless
            you're invited to do so. Be aware of any rules or places where it
            might be considered impolite to stand or sit. If you're respectful,
            well-informed, and don't disrupt the ceremony, the Aarti can be a
            peaceful and meditative experience.
          </p>
          <p>
            In addition to these steps, there's another important aspect to
            consider—the number of times the lamp is rotated during the Aarti.
            Each deity has a specific number associated with them. For example:
          </p>
          <ul>
            <li>
              Lord Vishnu is associated with the number twelve, so the lamp
              should be rotated twelve times when worshiping him.
            </li>
            <li>
              Lord Rudra has tithi numbers one and four, so the lamp is rotated
              either eleven or fourteen times for him.
            </li>

            <li>
              Lord Ganesha is linked to the number four, so the lamp is rotated
              four times.
            </li>

            <li>
              Goddess Durga is connected to the number nine, resulting in nine
              rotations.
            </li>
          </ul>
          <p>
            After completing the Aarti, it is common for devotees to move their
            hands over the lamp and then over their face. This symbolic gesture
            signifies purification. While doing this, one should meditate on the
            idea of rising towards holiness, similar to how the flame of the
            lamp always moves upward, never downward. It's a moment of inner
            reflection and spiritual connection.
          </p>
          <p>
            <strong>Astropush- An Online Platform</strong>
          </p>
          <p>
            Are you into online astrology? Interested in getting astrological
            insights on the internet? We've got you covered with our website,
            astropush.com, and user-friendly mobile app, AstroPush. Here's the
            deal: When you visit our site or use our app, you'll connect with
            expert astrologers who understand the world of online astrology.
            They can explain how the stars and planets influence your life.
            What's even more convenient is our live chat feature with
            astrologers. You can access this feature online at any time you
            wish. So, whether it's early in the morning or late at night, you
            can connect with our astrologers and get swift responses to your
            questions, all from the comfort of your own space. In summary, if
            you're keen to explore your future and understand the reasons behind
            life's events, our online platform and mobile app, AstroPush, are
            here to assist you. Our expert astrologers are just a few clicks
            away, ready to engage in meaningful conversations about the
            influence of celestial bodies on your life, ensuring you have access
            to astrological insights whenever you need them.
          </p>
          <div className="container faq-section py-3">
            <FAQ data={aartiSignificanceFaq} />
          </div>
        </div>
      </section>
    </>
  );
};

export default HOC(Aarti);
