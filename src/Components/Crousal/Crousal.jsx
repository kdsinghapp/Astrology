import React from "react";
import OwlCarousel from "react-owl-carousel";
import "./Crousal.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import DetailedReport from "../../images/Icons/DetailedReport.jpeg";
import AskQuestions from "../../images/Icons/AskQuestions.jpeg";
import FreeMatchMaking from "../../images/Icons/FreeMatchMaking.png";
import FreeKundli from "../../images/Icons/FreeKundli.png";
import FreeNumerology from "../../images/Icons/FreeNumerology.jpeg";
import DailyHoroscope from "../../images/Icons/DailyHoroscope.jpeg";
import DailyPanchang from "../../images/Icons/DailyPanchang.jpeg";

const Crousal = () => {
  const navigate = useNavigate();

  const options = {
    loop: true,
    nav: true,
    navText: ["<i className='fa fa-chevron-left arrow_right'></i>", "<i className='fa fa-chevron-right arrow_left '></i>"],
    autoplay: true,
    autoplayHoverPause: true,
    mouseDrag: true,
    // margin: 30,
    // center: false,
    dots: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 3,
      },
    },
  };

  const allservice = [
    {
      img: DetailedReport,
      nav: "reportlist",
      alt: "Astropush-Detailed Report",
    },
    {
      img: AskQuestions,
      nav: "askastrologer",
      alt: "Astropush-Ask Questions",
    },
    {
      img: FreeMatchMaking,
      nav: "free-kundali-matching",
      alt: "Astropush-Free MatchMaking",
    },
    {
      img: FreeKundli,
      nav: "free-kundli-online",
      alt: "Astropush-Free Kundli",
    },
    {
      img: FreeNumerology,
      nav: "free-numerology-online",
      alt: "Astropush-Free Numerology",
    },
    // {
    //   img: DailyHoroscope,
    //   alt: "Astropush-Daily Horoscope",
    //   nav: "horoscope/todays-horoscope/aries",
    //   pageType: "todays-horoscope/aries",
    // },
    {
      img: DailyPanchang,
      nav: "free-Panchang-online",
      alt: "Astropush-Daily Panchang",
    },
  ];
  return (
    <>
      <div className="mt-3 mb-5">
        <div className="">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">Services We Provide</h1>
          </div>
        </div>
        <div className="service_provide">
          {allservice.map((data, index) => (
            <div className="service_provide-container">
              <div className="our_astrologer m-1" style={{ cursor: "pointer" }} onClick={() => navigate(`/${data?.nav}`, { state: data?.pageType })}>
                <a className="ast_team_box">
                  <div className="parent_image_our_Astrologer">
                    <img style={{ width: "100%" }} src={data.img} loading="lazy" alt={data.alt} />
                  </div>
                </a>
              </div>
            </div>
          ))}
        </div>
        {/* <OwlCarousel className="owl-theme " {...options}>
          

            <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/askastrologer")}>
              <a className="ast_team_box">
                <div className="parent_image_our_Astrologer">
                  <img loading="lazy" alt="Ask Questions" src={AskQuestions} />
                </div>
              </a>
            </div>

            <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/free-kundali-matching")}>
              <a className="ast_team_box">
                <div className="parent_image_our_Astrologer">
                  <img loading="lazy" alt="Free MatchMaking" src={FreeMatchMaking} />
                </div>
              </a>
            </div>

            <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/free-kundli-online")}>
              <a className="ast_team_box">
                <div className="parent_image_our_Astrologer">
                  <img loading="lazy" alt="Free Kundli" src={FreeKundli} />
                </div>
              </a>
            </div>

            <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/free-numerology-online")}>
              <a className="ast_team_box">
                <div className="parent_image_our_Astrologer">
                  <img loading="lazy" alt="Free Numerology" src={FreeNumerology} />
                </div>
              </a>
            </div>

            <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/horoscope/daily-horoscope")}>
              <a className="ast_team_box">
                <div className="parent_image_our_Astrologer">
                  <img loading="lazy" alt="Daily Horoscope" src={DailyHoroscope} />
                </div>
              </a>
            </div>

            <div className="our_astrologer m-1 p-2" style={{ cursor: "pointer" }} onClick={() => navigate("/free-Panchang-online")}>
              <a className="ast_team_box">
                <div className="parent_image_our_Astrologer">
                  <img loading="lazy" alt="Daily Panchang" src={DailyPanchang} />
                </div>
              </a>
            </div>
          </OwlCarousel> */}
      </div>
    </>
  );
};

export default Crousal;
