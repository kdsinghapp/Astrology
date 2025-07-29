import React from "react";
import { useNavigate } from "react-router-dom";
import a from "../../images/rashi/rashi1.png";
import b from "../../images/rashi/rashi2.png";
import c from "../../images/rashi/rashi3.png";
import d from "../../images/rashi/rashi4.png";
import e from "../../images/rashi/rashi5.png";
import f from "../../images/rashi/rashi6.png";
import g from "../../images/rashi/rashi7.png";
import h from "../../images/rashi/rashi8.png";
import i from "../../images/rashi/rashi9.png";
import j from "../../images/rashi/rashi10.png";
import k from "../../images/rashi/rashi11.png";
import l from "../../images/rashi/rashi12.png";
import "./../DailyHoroscope/DailyHoroscope.css";
const TodayHoroscope = () => {
  const navigate = useNavigate();

  const dailyhoroscopeArry = [
    {
      name: "Aries",
      subname: "Aries",
      image: e,
      navigate: "horoscope/todays-horoscope/aries",
      pageType: "todays-horoscope/aries",
    },
    {
      name: "Taurus",
      subname: "Taurus",
      image: i,
      navigate: "horoscope/todays-horoscope/taurus",
      pageType: "todays-horoscope/taurus",
    },
    {
      name: "Gemini",
      subname: "Gemini",
      image: j,
      navigate: "horoscope/todays-horoscope/gemini",
      pageType: "todays-horoscope/gemini",
    },
    {
      name: "Cancer",
      subname: "Cancer",
      image: b,
      navigate: "horoscope/todays-horoscope/cancer",
      pageType: "todays-horoscope/cancer",
    },
    {
      name: "Leo",
      subname: "Leo",
      image: f,
      navigate: "horoscope/todays-horoscope/leo",
      pageType: "todays-horoscope/leo",
    },

    {
      name: "Virgo",
      subname: "Virgo",
      image: h,
      navigate: "horoscope/todays-horoscope/virgo",
      pageType: "todays-horoscope/virgo",
    },

    {
      name: "Libra",
      subname: "Libra",
      image: d,
      navigate: "horoscope/todays-horoscope/libra",
      pageType: "todays-horoscope/libra",
    },
    {
      name: "Scorpio",
      subname: "Scorpius",
      image: a,
      navigate: "horoscope/todays-horoscope/scorpio",
      pageType: "todays-horoscope/scorpio",
    },
    {
      name: "Sagittarius",
      subname: "Sagittarius",
      image: k,
      navigate: "horoscope/todays-horoscope/sagittarius",
      pageType: "todays-horoscope/sagittarius",
    },
    {
      name: "Capricorn",
      subname: "Capricorn",
      image: l,
      navigate: "horoscope/todays-horoscope/capricorn",
      pageType: "todays-horoscope/capricorn",
    },
    {
      name: " Cancer",
      subname: "Aquarius",
      image: c,
      navigate: "horoscope/todays-horoscope/cancer",
      pageType: "todays-horoscope/cancer",
    },
    {
      name: "Pisces",
      subname: "Pisces ",
      image: g,
      navigate: "horoscope/todays-horoscope/pisces",
      pageType: "todays-horoscope/pisces",
    },
  ];

  return (
    <>
      <div className="container pt-3">
        <div className="">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">Today’s Horoscope </h1>
          </div>
        </div>
        <section>
          <div className="box_dailay_horo">
            {dailyhoroscopeArry.map((data, index) => (
              <div className="main_card_horobox" style={{ cursor: "pointer" }} key={index}>
                <div onClick={() => navigate(`/${data?.navigate}`, { state: data?.pageType })}>
                  <div className="daly_horo_img">
                    <img className="img" loading="lazy" alt="" src={data.image} />
                  </div>
                  <h6 className="dailyhoroscope_name mt-2">{data.subname}</h6>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default TodayHoroscope;
