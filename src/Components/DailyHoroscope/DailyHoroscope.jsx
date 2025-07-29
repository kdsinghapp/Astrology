import React, { useEffect, useState } from "react";
import { BsShare } from "react-icons/bs";
import s from "./HoroscopeSection.module.css";
import Scorpio from "../../images/rashi/rashi1.png";
import Cancer from "../../images/rashi/rashi2.png";
import Aquarius from "../../images/rashi/rashi3.png";
import Libra from "../../images/rashi/rashi4.png";
import Aries from "../../images/rashi/rashi5.png";
import Leo from "../../images/rashi/rashi6.png";
import Pisces from "../../images/rashi/rashi7.png";
import Virgo from "../../images/rashi/rashi8.png";
import Taurus from "../../images/rashi/rashi9.png";
import Gemini from "../../images/rashi/rashi10.png";
import Sagittarius from "../../images/rashi/rashi11.png";
import Capricorn from "../../images/rashi/rashi12.png";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Expand from "react-expand-animated";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loder from "../Loder/Loder";
import { getHoroscope_api } from "../api/horoscope";
import HOC from "../../Common/HOC";
import SEO from "../Seo/seo";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import FAQ from "../AstroPushFAQ/FAQ";
import BlogCrousal from "../Crousal/BlogCrousal";
const DailyHoroscope = () => {
  const params = useParams();
  const [count, setcount] = useState(1);
  const [expendbox, setexpendbox] = useState(false);
  const [sign, setsign] = useState(params.sign);
  const [period, setperiod] = useState(params.period);
  const [when, setwhen] = useState("current");
  const [isloading, setisloading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const zodicsignArry = [
    {
      sign: Aries,
      title: "Aries",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Taurus,
      title: "Taurus",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Gemini,
      title: "Gemini",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Cancer,
      title: "Cancer",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Leo,
      title: "Leo",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Virgo,
      title: "Virgo",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Scorpio,
      title: "Scorpio",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Libra,
      title: "Libra",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Sagittarius,
      title: "Sagittarius",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Capricorn,
      title: "Capricorn",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Aquarius,
      title: "Aquarius",
      date: "2nd feb - 3rd Mar",
    },
    {
      sign: Pisces,
      title: "Pisces",
      date: "2nd feb - 3rd Mar",
    },
  ];

  const [predictiondata, setpredictiondata] = useState([]);

  useEffect(() => {
    setperiod(params.period);
    setsign(params.sign);
  }, [params]);

  const zodicsignfun = (data) => {
    let title = data.title.toLowerCase();
    setsign(title);
    navigate(`/horoscope/${period}/${title}`);
  };

  useEffect(() => {
    horoscope_api();
  }, [params, sign, when, period]);
  const [luchArry, setluchArry] = useState();

  const horoscope_api = async () => {
    const newperiod =
      period == "todays-horoscope"
        ? "daily"
        : period == "weekly-horoscope"
        ? "weekly"
        : period == "monthly-horoscope"
        ? "monthly"
        : "yearly";
    setisloading(true);
    const temp = {
      sign: sign,
      period: newperiod,
      when: when,
    };
    try {
      const res = await getHoroscope_api(temp);
      if (res.data.status) {
        const newres =
          newperiod == "daily"
            ? res?.data?.data?.prediction
            : newperiod == "weekly"
            ? res?.data?.data?.weekly_horoscope
            : newperiod == "monthly"
            ? res?.data?.data?.monthly_horoscope
            : res?.data?.data?.yearly_horoscope;
        let values = Object.entries(newres);
        let perArr = ["10%", "55%", "80%", "10%", "10%"];
        let arr = [];
        values?.map((data, i) => {
          if (data[0] === "luck") {
          } else {
            let obj = {
              title: data[0],
              per: perArr[i],
              content: data[1],
            };
            arr.push(obj);
          }
        });
        setpredictiondata(arr);
        period == "todays-horoscope"
          ? setluchArry(res?.data?.data?.prediction?.luck)
          : period == "weekly-horoscope"
          ? setluchArry(res?.data?.data?.weekly_horoscope?.luck)
          : period == "monthly-horoscope"
          ? setluchArry(res?.data?.data?.monthly_horoscope?.luck)
          : setluchArry(res?.data?.data?.yearly_horoscope?.luck);
        // toast.success(res.data.message);
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      // toast.error("Network error");horoscope reading free online
      setisloading(false);
    }
  };
  const [horoscopeFaq, sethoroscopeFaq] = useState([
    {
      show: true,
      heading: "<h2>Where can I find free horoscopes online?</h2>",
      desc: "<p>If you're looking to find a free horoscope online, you can visit the Astropush website. They offer a wide range of horoscope readings based on astrological principles. </p>",
    },
    {
      show: true,
      heading: "<h2>How accurate are free horoscopes online?</h2>",
      desc: "<p>The accuracy of free horoscopes online is generally questionable. These horoscopes are often based on generic interpretations of astrological signs and lack personalised insights. </p>",
    },
    {
      show: true,
      heading: "<h2>Can horoscopes predict the future?</h2>",
      desc: "<p>Horoscopes offer general insights, but predicting the future accurately requires considering multiple factors and individual circumstances.</p>",
    },
    {
      show: true,
      heading:
        "<h2>Can I rely solely on free horoscopes for decision-making?</h2>",
      desc: "<p>Relying solely on free horoscopes for decision-making is not advisable as they lack personalised accuracy and scientific evidence.</p>",
    },
    {
      show: true,
      heading: "<h2>What is included in this free horoscope report?</h2>",
      desc: "<p>The free horoscope report provides insights on your zodiac sign, personality traits, compatibility, love life, career prospects, and general predictions for the future.</p>",
    },
  ]);

  const getMetaTitle = {
    "todays-horoscope": "Today",
    "weekly-horoscope": "Weekly",
    "monthly-horoscope": "Monthly",
    "yearly-horoscope": "Yearly",
  };

  return (
    <>
      <SEO
        title={`${getMetaTitle[period]} Horoscope, Free kundali Horoscope`}
        description="Get accurate free kundali horoscope and uncover what the stars have in store for you! Explore personalized readings and insights now."
        keywords="free horoscopes online,best horoscopes online,online horoscope reading,horoscope reading free online"
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="Zodiac-section container">
        <div className={s["Zodiac-container"]}>
          <BreadcrumbSection tittle="Horoscope" />
          <div className={s["Zodiac-heading"]}>
            <div className="zodic-title">
              <h4>Your Zodiac sign</h4>
            </div>
            {/* <div className="share-zodic">
              <BsShare />
            </div> */}
          </div>
          <div className={s["zodiac-content-layout"]}>
            {zodicsignArry.map((data, index) => (
              <div
                className={s["Zodiac-content"]}
                onClick={() => zodicsignfun(data)}
              >
                <div className="m-1">
                  <img
                    style={{ width: "70%" }}
                    src={data.sign}
                    alt="Zodiac sign"
                  />
                </div>
                <div
                  className={
                    s[
                      data.title.toUpperCase() == sign.toUpperCase()
                        ? "sign-active"
                        : ""
                    ]
                  }
                >
                  <h5>{data.title}</h5>
                  <p style={{ fontSize: "13px" }}>{data.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={s["predictions-section"]}>
          <div className={s["predictions-heading"]}>
            <h4 style={{ textTransform: "capitalize" }}>
              {sign} predictions for
            </h4>
          </div>
          <div className={s["predictions-btn-layout"]}>
            <div
              onClick={() => {
                setwhen("current");
                navigate(`/horoscope/todays-horoscope/${sign}`);
                setcount(1);
              }}
              className={
                s[
                  period === "todays-horoscope"
                    ? "predictions-btn-active"
                    : "predictions-btn"
                ]
              }
            >
              Today
            </div>
            <div
              onClick={() => {
                setwhen("current");
                navigate(`/horoscope/weekly-horoscope/${sign}`);
                setcount(2);
              }}
              className={
                s[
                  period === "weekly-horoscope"
                    ? "predictions-btn-active"
                    : "predictions-btn"
                ]
              }
            >
              This Week
            </div>
            <div
              onClick={() => {
                setwhen("current");
                navigate(`/horoscope/monthly-horoscope/${sign}`);
                setcount(3);
              }}
              className={
                s[
                  period === "monthly-horoscope"
                    ? "predictions-btn-active"
                    : "predictions-btn"
                ]
              }
            >
              This Month
            </div>
            <div
              onClick={() => {
                setwhen("current");
                navigate(`/horoscope/yearly-horoscope/${sign}`);
                setcount(4);
              }}
              className={
                s[
                  period === "yearly-horoscope"
                    ? "predictions-btn-active"
                    : "predictions-btn"
                ]
              }
            >
              This Year
            </div>
          </div>
        </div>
        <div className={s["predictions-content"]}>
          <div className="predictions-title">
            <h4 style={{ textTransform: "capitalize" }}>Summary for {sign}</h4>
            <p>
              Read <span style={{ textTransform: "capitalize" }}>{sign}</span>{" "}
              horoscope predictions mean for you right here, or check out your{" "}
              {period == "todays-horoscope"
                ? "Daily"
                : period == "weekly-horoscope"
                ? "Weekly"
                : period == "monthly-horoscope"
                ? "Monthly"
                : "Yearly"}{" "}
              horoscopes here.
            </p>
            <div>
              <div className="summery-heading">
                <h4>Summary for</h4>
              </div>
              {period === "todays-horoscope" ? (
                <div className={s["selecter-box"]}>
                  <div>
                    <select
                      style={{ border: "none", outline: "none" }}
                      onChange={(e) => setwhen(e.target.value)}
                    >
                      <option value="current">
                        Today {new Date().toISOString().slice(0, 10)}
                      </option>
                      <option value="prev">
                        Yesterday{" "}
                        {new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
                          .toISOString()
                          .slice(0, 10)}
                      </option>
                      <option value="next">
                        Tomorrow{" "}
                        {new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
                          .toISOString()
                          .slice(0, 10)}{" "}
                      </option>
                    </select>
                  </div>
                </div>
              ) : period === "weekly-horoscope" ? (
                <div className={s["selecter-box"]}>
                  <select
                    style={{ border: "none", outline: "none" }}
                    value={when}
                    onChange={(e) => setwhen(e.target.value)}
                  >
                    <option value="prev">Last Week</option>
                    <option value="current">This Week</option>
                    <option value="next">Next Week</option>
                  </select>
                </div>
              ) : period === "monthly-horoscope" ? (
                <div className={s["selecter-box"]}>
                  <select
                    style={{ border: "none", outline: "none" }}
                    value={when}
                    onChange={(e) => setwhen(e.target.value)}
                  >
                    <option value="prev">Last Month</option>
                    <option value="current">This Month</option>
                    <option value="next">Next Month</option>
                  </select>
                </div>
              ) : (
                <div className={s["selecter-box"]}>
                  <select
                    style={{ border: "none", outline: "none" }}
                    value={when}
                    onChange={(e) => setwhen(e.target.value)}
                  >
                    <option value="prev">Last Year</option>
                    <option value="current">This Year</option>
                    <option value="next">Next Year</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={s["astro-prediction-section"]}>
          <div className={s["astro-prediction-layout"]}>
            <div className="astro-prediction-horoscope">
              <h4>Score Card</h4>
              {predictiondata?.map((data, index) => (
                <div className={s["card-section"]}>
                  <div className={s["prediction-horoscope-title"]}>
                    <div>
                      <h4>
                        {data.title.charAt(0).toUpperCase() +
                          data.title.slice(1)}
                      </h4>
                    </div>
                    {/* <div className={s["predection-precentage"]}>{data.per}</div> */}
                  </div>
                  <div>
                    <p>{data.content}</p>
                  </div>
                </div>
              ))}
              <div className={s["card-section"]}>
                <div className={s["prediction-horoscope-title"]}>
                  <div>
                    <h4>Luck</h4>
                  </div>
                  {/* <div className={s["predection-precentage"]}>70%</div> */}
                </div>
                <ul>
                  {luchArry?.map((data, index) => (
                    <li>{data}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <BlogCrousal />
          {period === "todays-horoscope" && (
            <div className="container faq-section py-3">
              <FAQ data={horoscopeFaq} />
            </div>
          )}
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(DailyHoroscope);
