import React, { useEffect, useState, useContext } from "react";
import HOC from "../../Common/HOC";
import "./HomePage.css";
import Crousal from "../Crousal/Crousal";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import TodayHoroscope from "../Crousal/TodayHoroscope";
import palmistory from "../../images/palmistry.png";
import icons from "../../images/Icons/phone.png";
import icons2 from "../../images/Icons/chat.png";
import icons3 from "../../images/Icons/shop.png";
import icons5 from "../../images/Icons/live.png";
import { useNavigate } from "react-router-dom";
// import { Card } from "@material-ui/core";
import { Card } from "@mui/material";
import LiveEvent from "../Crousal/LiveEvent";
import ClientsTestimonials from "../Crousal/ClientsTestimonials";
import Securety from "./Securety";
import { notificationHandler } from "../utils/Notification";
import { Skeleton } from "@mui/material";
import { UserContext } from "../../App";
import Carousel from "react-material-ui-carousel";
import homeapi from "../api/homeapi";
import SEO from "../Seo/seo";
import Loder from "../Loder/Loder";
import UserRating from "../DialogeBox/UserRating";
import FAQ from "../AstroPushFAQ/FAQ";
import BlogCrousal from "../Crousal/BlogCrousal";
import Cookies from "js-cookie";
import { get_profile_api } from "../api/authapi";

const HomePage = () => {
  const [isloading, setisloading] = useState(false);
  const [liveAstrologerArr, setliveAstrologerArr] = useState([]);
  const auth = Cookies.get("auth");
  const [AstrologerList, setAstrologerList] = useState("");
  const [BlogSectionArry, setBlogSectionArry] = useState([]);
  const [testimonialsArry, settestimonialsArry] = useState([]);
  const [astroUser, setAstroUser] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const [rating, setrating] = useState(false);
  const [homepagebanner, sethomepagebanner] = useState([]);
  const navigate = useNavigate();

  const allservics = [
    {
      title: "Talk to Astrologer",
      link: "/talk-to-astrologer",
      icon: icons,
    },
    {
      title: "Chat with Astrologer",
      link: "/chat-with-astrologer",
      icon: icons2,
    },
    {
      title: "Shop at AstroPush",
      link: "/astroshop",
      icon: icons3,
    },
    {
      title: "Live at AstroPush",
      link: "/live_astrologer",
      icon: icons5,
    },
  ];

  const [horoscopeFaq, sethoroscopeFaq] = useState([
    {
      show: true,
      heading: "<h2>How to choose the best online astrologer in India?</h2>",
      desc: "<p>To choose the best online astrologer in India, consider their expertise, experience, client reviews, accuracy of predictions, pricing, and communication skills for effective guidance.</p>",
    },
    {
      show: true,
      heading: "<h2>Can online astrologers provide remedies for problems?</h2>",
      desc: "<p>Yes, online astrologers can provide remedies for problems through personalised advice and guidance based on astrological analysis.</p>",
    },
    {
      show: true,
      heading:
        "<h2>How long does an online astrology consultation typically last?</h2>",
      desc: "<p>The duration of an online astrology consultation can vary, typically ranging from 30 minutes to 1 hour, depending on the depth of analysis and discussion required.</p>",
    },
    {
      show: true,
      heading:
        "<h2>What services are offered by online astrologers in India?</h2>",
      desc: "<p>Online astrologers in India offer services such as personalised horoscope readings, astrological consultations, relationship compatibility analysis, career guidance, and remedial solutions for planetary afflictions.</p>",
    },
    {
      show: true,
      heading:
        "<h2>Why Should You Choose Astropush site For An Astrology Services?</h2>",
      desc: "<p>Astropush is the best choice for astrology services due to accurate predictions, experienced astrologers, personalised guidance, and reliable insights.</p>",
    },
  ]);

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <div
              style={{ width: "40%", margin: "5px" }}
              key={index}
            >
              <Skeleton
                variant="rectangular"
                width="100%"
              >
                <div style={{ paddingTop: "57%" }} />
              </Skeleton>
              <Skeleton />
              <Skeleton />
            </div>
          ))}
      </>
    );
  };

  const LiveAstroData = async () => {
    setisloading(true);
    try {
      const res = await homeapi();
      if (res.data.status) {
        if (res.data.is_open_rating === "Yes" && res.data.call_duracation > 4) {
          setAstroUser({
            id: res.data?.astro_id,
            name: res.data?.astro_name,
            profile_img: res.data?.astro_profile_img,
            channelId: res.data.channel_id,
          });
          setrating(true);
        }
        setliveAstrologerArr(res?.data?.live);
        setBlogSectionArry(res?.data?.blog);
        setAstrologerList(res?.data?.astrologer);
        settestimonialsArry(res?.data?.testimonials);
        sethomepagebanner(res?.data?.banner);
        setisloading(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: "Network error" });
    }
  };

  const get_profile = async () => {
    setisloading(true);
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        dispatch({
          type: "USER",
          payload: {
            ...state,
            results_web: res?.data?.results_web,
            wallet: res?.data?.results_web?.wallet,
            notification: res?.data?.notifications_count,
            cartItemsLength: res?.data?.results_web?.item_total,
          },
        });
        setisloading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  useEffect(() => {
    if (auth === "true") {
      get_profile();
    }
  }, [auth]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    LiveAstroData();
  }, []);

  return (
    <>
      <SEO
        title="AstroPush - Talk to Astrologers"
        description="Looking for Best Astrology Website in India? Consult Best Astrologer Online at Astropush Astrology App and Talk With Expert Astrologer for Instant Solution."
        keywords="best online astrology consultation,book best astrologer,best astrology website in india,best astrologer in india for consultation"
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        {/* <div className="">
          <Carousel indicators={false}>
            {homepagebanner?.map((item, i) => (
              <div className="home_dynamic_banner" style={{ cursor: "pointer" }} onClick={() => window.open(item.link)}>
                <img src={item.img} loading="lazy" style={{ width: "100%" }} />
                <h1>{item.name}</h1>
              </div>
            ))}
          </Carousel>
        </div> */}
        {/* 
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <div class="carousel-inner">
            {homepagebanner?.map((item, i) => (
              <div class="carousel-item active">
                <img src={item.img} loading="lazy" style={{ width: "100%" }} alt="First slide" />
              </div>
            ))}
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div> */}
        <div
          id="carouselExampleIndicators"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            {homepagebanner?.map((item, i) => (
              <div class={`carousel-item ${i === 0 ? "active" : ""}`}>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <img
                    class="d-block w-100"
                    src={item.img}
                    loading="lazy"
                    alt="First slide"
                  />
                </a>
              </div>
            ))}

            {/* <div class="carousel-item active">
              <img class="d-block w-100" src="..." alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="..." alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src="..." alt="Third slide" />
            </div> */}
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          >
            <span
              class="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >
            <span
              class="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <section>
          <div className="live_astrobg_banner">
            <div className="container">
              <div className="row live_connect">
                {allservics.map((data, index) => (
                  <div className="live_astrobg_banner_content col-3 col-sm-3 col-md-3">
                    <div
                      className="live_astrobg_banner_content_card p-3"
                      onClick={() => navigate(`${data.link}`)}
                    >
                      <div className="best_astro d-flex justify-content-center">
                        <img src={data.icon} />
                      </div>
                      <div className="text-center mt-2">
                        <div>
                          <span className="chatastro_heading">
                            {data.title}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <Crousal />
        </section>
        <section className="live_astrobg_banner_crousal">
          <div className="container pt-4">
            {/* <LiveEvent live={liveAstrologerArr} /> */}
          </div>
        </section>
        <section className="container ourastrologer mt-3 mb-5">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
        <section className="today_horoscope_banner">
          <TodayHoroscope />
        </section>
        <BlogCrousal BlogSectionArry={BlogSectionArry} />
        <section className="client_testional_banner Clients_Testimonials">
          <div className="container">
            <ClientsTestimonials client={testimonialsArry} />
          </div>
        </section>
        <section>
          {/* <div className="palmistory_bg">
            <img src={home_img} alt="" /> */}

          {/* <div className="container">
              <div className="d-flex">
                <div className="palmistory">
                  <img src={palmistory} alt="" />
                </div>
                <div className="palmistory_heading">
                  <h3>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nihil, molestias.
                  </h3>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Veritatis, enim sapiente quas ad ipsa tempore voluptatem
                    maxime necessitatibus vitae quibusdam hic, obcaecati
                    repellat, sit unde enim sapiente quas ad ipsa tempore
                    voluptatem maxime necessitatibus vitae quibusdam hic,
                    obcaecati repellat, sit under quas ad ipsa tempore
                    voluptatem maxime necessitatibus vitae quibusdam hic,
                    obcaecati repellat, sit unde enim sapiente quas ad ipsa
                    tempore voluptatem maxime necessitatibus vitae quibusdam
                    hic, obcaecati repellat, sit under quas ad ipsa tempore
                    voluptatem maxime necessitatibus vitae quibusdam hic,
                    obcaecati repellat, sit unde enim sapiente quas ad ipsa
                    tempore voluptatem maxime necessitatibus vitae quibusdam
                    hic, obcaecati repellat, sit under.
                  </p>
                </div>
              </div>
            </div> */}
          {/* </div> */}
        </section>

        <div className="container py-5">
          <div className="vediv-content">
            <h1 className="text-center">Principles behind Vedic Astrology</h1>
            <p>
              Vedic astrology, also known as Jyotish, is a traditional system of
              astrology that originated in ancient India. It is a significant
              part of Hindu culture and is based on the ancient texts called the
              Vedas. Vedic astrology is distinct from Western astrology in terms
              of its techniques, calculations, and philosophical foundations.
            </p>
            <p>
              <b>
                Here are some key features and principles of Vedic astrology:
              </b>
            </p>
            <ul>
              <li>
                <b>Birth chart:</b> Vedic astrology uses a birth chart, also
                known as a horoscope or a Kundali, which is calculated based on
                the date, time, and place of an individual’s birth. The birth
                chart is a representation of the positions of celestial bodies,
                including the Sun, Moon, planets, and constellations, at the
                time of birth on an individual.
              </li>
              <li>
                <b> Planetary influences:</b> Vedic astrology assigns specific
                significations and characteristics to each celestial body. These
                bodies are believed to exert influences on various aspects of
                human life, including personality traits, relationships, career,
                health, and events.
              </li>
              <li>
                <b>Zodiac signs:</b> Vedic astrology divides the zodiac into 12
                equal segments or signs, just like Western astrology. However,
                Vedic astrology uses the sidereal zodiac, which accounts for the
                precession of Earth’s axis and aligns the zodiac signs with the
                actual positions of the constellations.
              </li>
              <li>
                <b> Dasha system:</b> Vedic astrology incorporates a unique
                predictive technique called the Dasha system. It involves a
                series of planetary periods or time periods that are believed to
                influence an individual’s life events. The Dasha system combines
                the positions of the Moon and other planets in the birth chart
                to determine the timing and nature of various life experiences.
              </li>
              <li>
                <b> Remedial measures:</b> Vedic astrology suggests various
                remedial measures to mitigate the negative effects of planetary
                influences or to enhance positive outcomes. These measures can
                include rituals, prayers, gemstone recommendations, wearing
                specific colors, and other practices believed to align with the
                energy of particular planets.
              </li>
            </ul>
            <p>
              Vedic astrology continues to be widely practiced and respected as
              the best form of astrology. It is often approached as a cultural,
              philosophical, and spiritual tradition in India.
            </p>
            <h4>AstroPush- 24X7 online astrology Platform</h4>
            <p>
              At AstroPush, an online Astrology Platform, we provide access to
              top online Vedic Astrologers in India and worldwide. Our astrology
              platform, aims to provide astrology services globally. With a team
              of knowledgeable astrologers specialising in Vedic Astrology,
              Nadi, Tarot Card Reading, Vastu Shastra, Western Astrology,
              Numerology, Reiki healing, and Palmistry, AstroPush offers
              convenient online astrology consultations. The platform is serving
              with an aim to provide reliable online astrology solutions in
              today’s busy life of individuals. These solution from top
              astrologers are oriented towards pushing the worries out of
              individual’s life through guidance and easy remedies.
            </p>
            <p>
              AstroPush’s online platform provides several free Astrology
              services and information which includes free kundli, free
              matchmaking, free daily, monthly, yearly horoscopes and Zodiac
              signs, muhurats, upcoming festivals, free astrology chat/call
              sessions and live events.
            </p>
            <h4>
              Reliable Astrology Services through strong Review and Ratings
              system:{" "}
            </h4>
            <p>
              AstroPush values customer satisfaction and ensures credibility by
              providing reliable services. The platform's experienced online
              astrologers share their expertise through one-on-one calls and
              chat consultations. Ratings and reviews provided by customers
              determine the quality of service, and the first chat with an
              astrologer comes with a discount. Our Astrologers also provide
              easy and workable remedies which can be performed on day to day
              basis, despite busy routines of individual’s.
            </p>
            <h4>Online Astrology Mall: </h4>
            <p>
              Our In-house online Astrology shopping Mall sells best quality and
              reliable gem stones, rudrakhsa, temples and Pooja items.AstroPush
              strives aims to provide comprehensive astrology services under one
              roof, catering to diverse interests and needs. Our Astrologers can
              provide online Astrology services through Chat/Call in various
              Indian regional langauges. With a commitment to excellence,
              AstroPush aims to be a reliable partner and guide in the field of
              astrology.{" "}
            </p>
          </div>
        </div>
        <div className="container faq-section py-3">
          <FAQ data={horoscopeFaq} />
        </div>
        <section>
          <Securety />
        </section>
      </div>
      <Loder loading={isloading} />
      <UserRating
        open={rating}
        astroUser={astroUser}
        close={() => setrating(!rating)}
        type="Audio"
      />
    </>
  );
};

export default HOC(HomePage);
