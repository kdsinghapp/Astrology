import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import "./FreeKundli.css";
// import { Grid, Card } from "@material-ui/core";
import { Card, Grid } from "@mui/material";
import { notificationHandler } from "../utils/Notification";
import { blankValidator } from "../utils/Validation";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SEO from "../Seo/seo";
import { get_latLong, get_palces } from "../api/location";

import { IoLocationSharp } from "react-icons/io5";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import FAQ from "../AstroPushFAQ/FAQ";
import CommonCrousal from "../CommonCrousal/CommonCrousal";

const FreeKundli = () => {
  const navigate = useNavigate();
  const [isloading, setisloading] = useState(false);
  const [kundlidetail, setkundlidetail] = useState({
    name: "",
    gender: "Male",
    day: "",
    month: "",
    year: "",
    birthhour: "",
    birthmin: "",
    birthsec: "",
    birthplace: "",
    lat: "28.542294867618875",
    lon: "77.42449198114385",
  });

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1000);
  }, []);

  const [error, setError] = useState({
    name: {
      status: false,
    },
    gender: {
      status: false,
    },
    day: {
      status: false,
    },
    month: {
      status: false,
    },
    year: {
      status: false,
    },
    birthhour: {
      status: false,
    },
    birthmin: {
      status: false,
    },
    birthsec: {
      status: false,
    },
    birthplace: {
      status: false,
    },
  });

  const yeardata = [];
  let date = new Date().getFullYear();
  for (let year = 1928; year <= date; year++) {
    yeardata.push(year);
  }

  const alldays = [];
  for (let day = 1; day <= 31; day++) {
    alldays.push(day);
  }

  const allhours = [];
  for (let hour = 0; hour <= 23; hour++) {
    allhours.push(hour);
  }

  const allminutes = [];
  for (let min = 0; min <= 59; min++) {
    allminutes.push(min);
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const onchange = (e) => {
    setError({
      name: {
        status: false,
      },
      gender: {
        status: false,
      },
      day: {
        status: false,
      },
      month: {
        status: false,
      },
      year: {
        status: false,
      },
      birthhour: {
        status: false,
      },
      birthmin: {
        status: false,
      },
      birthsec: {
        status: false,
      },
      birthplace: {
        status: false,
      },
    });
    setkundlidetail({ ...kundlidetail, [e.target.name]: e.target.value });
  };

  const generatekundli = () => {
    if (!blankValidator(kundlidetail.name)) {
      return setError({
        ...error,
        name: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.day)) {
      return setError({
        ...error,
        day: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.month)) {
      return setError({
        ...error,
        month: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.year)) {
      return setError({
        ...error,
        year: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.birthhour)) {
      return setError({
        ...error,
        birthhour: {
          status: true,
        },
      });
    }
    if (!blankValidator(kundlidetail.birthmin)) {
      return setError({
        ...error,
        birthmin: {
          status: true,
        },
      });
    }

    if (!blankValidator(kundlidetail.birthplace)) {
      return setError({
        ...error,
        birthplace: {
          status: true,
        },
      });
    }
    try {
      let url = getBaseUrl() + "user_api/kunddli";
      setisloading(true);
      let temp = {
        name: kundlidetail.name,
        year: parseInt(kundlidetail.year),
        month: parseInt(kundlidetail.month),
        day: parseInt(kundlidetail.day),
        hour:
          parseInt(kundlidetail.birthhour) != 0
            ? parseInt(kundlidetail.birthhour)
            : "0",
        min:
          parseInt(kundlidetail.birthmin) != 0
            ? parseInt(kundlidetail.birthmin)
            : "0",
        lat: kundlidetail.lat,
        lon: kundlidetail.lon,
        tzone: "5.5",
        planetColor: "black",
        signColor: "black",
        ineColor: "black",
        chartType: "black",
      };

      axios.post(url, temp).then(
        (res) => {
          if (res.status !== 200) {
            return notificationHandler({
              type: "danger",
              msg: "Something went wrong",
            });
          }
          navigate("/kundlidetail", {
            state: {
              data: res.data,
            },
          });
          setisloading(false);
          // notificationHandler({ type: "success", msg: res.data.message });
        },
        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
          notificationHandler({ type: "danger", msg: error.message });
        }
      );
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: error.message });
      return setisloading(false);
    }
  };

  // Manish's changes
  const [places, setplaces] = useState([]);

  const getPlacesAPIFunc = async (e, type) => {
    // console.log(type);

    Object.values(error).map((item) => (item.status = false));
    setkundlidetail({ ...kundlidetail, [e.target.name]: e.target.value });
    try {
      // setTimeout(async () => {
      setplaces([]);
      let res = await get_palces(e.target.value);
      // console.log(res.data)
      if (res.data.status === "OK") {
        res.data.predictions.map((item) => {
          setplaces((places) => [...places, item.description]);
        });
      }
      // }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedPlace = async (value) => {
    try {
      setkundlidetail({ ...kundlidetail, m_birthplace: value });
      setplaces([]);
      let res = await get_latLong(value);
      if (res.status == 200) {
        let { lat, lng } = res.data;
        setkundlidetail({
          ...kundlidetail,
          birthplace: value,
          lat: lat,
          lon: lng,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const [horoscopeFaq, sethoroscopeFaq] = useState([
  //   {
  //     show: true,
  //     heading: "<h2>What does a Kundli contain?</h2>",
  //     desc: "<p>A Kundli, also known as a birth chart in Vedic astrology, contains information about an individual's astrological positions, including the positions of the planets and their influence on various aspects of life. It includes details such as date, time, and place of birth.</p>",
  //   },
  //   {
  //     show: true,
  //     heading: "<h2>How can I get a free Kundli online?</h2>",
  //     desc: "<p>Astropush is a popular website offering free Kundli services online. By visiting their website, you can easily generate a personalised Kundli report without any cost. </p>",
  //   },
  //   {
  //     show: true,
  //     heading: "<h2>What information is needed to generate a Kundli?</h2>",
  //     desc: "<p>To generate a Kundli, commonly known as a birth chart or horoscope in astrology, the following information is typically required: date of birth, time of birth, and place of birth. </p>",
  //   },
  //   {
  //     show: true,
  //     heading: "<h2>Can Kundli predict the future accurately?</h2>",
  //     desc: "<p>The accuracy of Kundli, a traditional astrological chart used in Vedic astrology, in predicting the future is a subject of debate. While some individuals believe it can provide insights and guidance, others view it as a pseudoscience lacking empirical evidence. </p>",
  //   },
  //   {
  //     show: true,
  //     heading: "<h2>Can I generate Kundli for other people?</h2>",
  //     desc: "<p>Yes, you can generate Kundli for other people using astrological software and provide them with unique insights into their lives based on their birth details.</p>",
  //   },
  // ]);

  const [horoscopeFaq, sethoroscopeFaq] = useState([
    {
      show: true,
      heading: "<h2>How to create a free Janam Kundli on AstroPush?</h2>",
      desc: `
        <p>
          In contrast to earlier eras, the process of crafting a Kundli has evolved significantly, rendering it a far more accessible endeavor in contemporary times. The advent of online Kundli preparation has expedited the entire procedure. By inputting the requested information into the software, the generation of a Kundli has been streamlined to the extent that you can obtain it within a matter of minutes.
        </p>
        <p>
         To get started, simply provide the necessary information in the fields below – including your birth date, birth time, and related details. Once these details are accurately entered, you can either proceed by clicking "submit" or opt for a personalized touch by engaging in a live conversation with our expert online astrologers.
        </p>
        <p>
          As you provide these necessary details and embark on this journey, you unlock a realm of self-discovery, guidance, and cosmic wisdom that can empower your choices, enrich your understanding, and forge a deeper connection with the universe.
        </p>
        <p>
          Whether you choose the direct path of submission or prefer to connect with our experienced astrologers, the outcome is an opportunity to gain profound insights from the intricate interplay of celestial bodies.
        </p>
      `,
    },
    {
      show: true,
      heading: "<h2>What is Janam Kundli?</h2>",
      desc: `
        <p>
          At the core of astrological practice lies the concept of the "Horoscope" or "Kundli." The Janam Kundli, often synonymous with a birth chart or horoscope, stands as a fundamental and significant cornerstone of astrology. The Janam Kundli does more than just show where stars and planets were when someone was born. People think it's important in how their life turns out. By looking at the positions of stars and planets, people believe they can understand things about themselves and their future. It's like getting guidance from the universe. The Janam Kundli is like a snapshot of the universe when you were born, and it helps connect you to the big cosmic picture. It's a way of showing how we're connected to everything around us.
        </p>
      `,
    },
    {
      show: true,
      heading:
        "<h2>What advantages do free online horoscopes offer compared to the traditional way?</h2>",
      desc: `
        <p>
          Online Kundli services offer unmatched convenience. You can access them from anywhere with an internet connection, eliminating the need for in-person visits. Generating your Kundli and receiving insights can all be done from the comfort of your home.
        </p>
        <p>
          These online platforms are designed for easy use. You don't need to be an astrology expert to navigate them. In contrast, traditional services might demand a deeper grasp of astrological concepts.
        </p>
        <p>
          The availability factor is a key benefit. Online services are accessible 24/7, allowing you to create your Kundli whenever you prefer. This flexibility stands in contrast to traditional services, which might be limited by specific office hours.
        </p>
        <p>
          Budget-conscious individuals will appreciate the cost-effectiveness of online Kundli services. They are often more affordable compared to traditional astrologer consultations, which can come with higher fees.
        </p>
      `,
    },
    {
      show: true,
      heading: "<h2>What is Dasha in one’s Kundli?</h2>",
      desc: `
        <p>
          A Dasha is a specific time period in astrology when the energy of a particular planet has a strong influence on a person's life. These periods are determined by the positions of planets at birth and have set lengths, ranging from months to years.
        </p>
        <p>
          During a Dasha, the traits of the ruling planet are thought to shape life events, opportunities, challenges, and situations. The interactions of planetary energies in different Dashas are believed to impact various areas of life, including career, relationships, and health.
        </p>
      `,
    },
    {
      show: true,
      heading: "<h2>What information can we gather through our Kundli?</h2>",
      desc: `
        <ul>
        <li>Online Kundli matching service for love, compatibility, and relationships.</li>
        <li>Utilizes profound astrology knowledge to offer in-depth compatibility insights.</li>
        <li>Analyzes birth charts to understand alignment with potential partners.</li>
        <li>Identifies compatibility and potential challenges.</li>
        <li>Offers Kundali matching based on names and birthdates for accuracy.</li>
        <li>Helps make informed decisions about significant relationships.</li>
        <li>Empowers with astrological insights for better relationship choices.</li>
        <li>Enhances understanding and confidence in matters of the heart.</li>
        </ul>
      `,
    },
  ]);

  return (
    <>
      <SEO
        title="Free Kundli - Get Free Kundli Online By Expert Astrologers"
        description="Get your accurate Free Kundli Online now! Discover your destiny and uncover the mysteries of your future with our expert astrological insights."
        keywords="free kundli online,check free kundli online,janam kundali online free,kundli by date of birth"
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding">
        {/* <div className="free_kundli_banner p-5">
          <div className="container">
            <div className="d-flex" style={{ justifyContent: "space-between" }}>
              <div className="freekundli_content" style={{ width: "50%" }}>
                <h1 className="banner_heading pt-4" style={{ color: "#FFF" }}>
                  Free Kundli
                </h1>
                <span className="header_banner pt-5">Get instant & accurate, Janam Kundli</span>
              </div>
              <div className="sing_image" id="myDIV">
                <img src={a} />
              </div>
            </div>
          </div>
        </div> */}
        <section className="container content_section mb-4">
          <BreadcrumbSection tittle="Free Kundli" />
          <div className="get_detail">
            <div>
              <h3 className="mt-5 mb-3">
                Free Kundli Online - Get Your Detailed Birth Chart with
                Predictions
              </h3>
            </div>
            <div>
              {/* <p>
                Kundli is a chart prepared in astrology depending on the precise date, place, and time of birth of an individual. It figures out the placement
                of all the planets and signs, along with the Sun and Moon at the time of your birth. Twelve houses of Kundli show ascendant and planet position
                in various zodiac signs at the time of birth as seen from the place of birth.
              </p> */}
              <p>
                The Kundli chart is a detailed representation of the position of
                planets at the time of your birth. It is used to interpret the
                various aspects of your life, such as career, relationships,
                health, and finances. With a free Kundli online service you can
                get your detailed birth chart with predictions about your life
                path and future.
              </p>
              <p>
                The Kundli chart is divided into 12 houses which represent
                different aspects of life such as love, career, marriage etc.
                Each house has its own set of astrological symbols which signify
                different things. By understanding these symbols and their
                meanings you can gain insight into how these forces will affect
                your life path in the future. With a free Kundli online service
                you can get an interpretation of these symbols and understand
                what they mean for you in terms of your future prospects.
              </p>
            </div>
          </div>
        </section>
        <section className="new_kundli_section mt-4 mb-4">
          <div className=" mt-5 mb-2">
            <div className="container">
              {/* <h3 className="getyourfree_kundley">Get Your Free Kundli</h3> */}
              <Card className="Card_shadow m-2 p-3">
                <Grid className="Component_main_grid">
                  <Grid item md={6} xs={12} sm={12}>
                    <div className="p-2">
                      <label
                        className="requiredLabel"
                        htmlFor="exampleInputEmail1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Name"
                        onChange={(e) => onchange(e)}
                      />
                      {error.name.status && (
                        <p style={{ width: "72%", color: "red" }}>Enter name</p>
                      )}
                    </div>
                  </Grid>
                  <Grid item md={6} xs={12} sm={12}>
                    <div className="p-2">
                      <label className="requiredLabel">Gender</label>
                      <select
                        className="form-control"
                        name="gender"
                        value={kundlidetail.gender || "Male"}
                        onChange={(e) => onchange(e)}
                      >
                        <option selected value="Male">
                          Male
                        </option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </Grid>
                  <Grid item md={12} xs={12} sm={12}>
                    <Grid className="Component_main_grid">
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label
                            className="requiredLabel"
                            htmlFor="exampleInputEmail1"
                          >
                            Birth Day
                          </label>
                          <select
                            className="form-control"
                            name="day"
                            value={kundlidetail.day}
                            onChange={(e) => onchange(e)}
                          >
                            <option value="">Day</option>
                            {alldays.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.day.status && (
                            <p style={{ width: "72%", color: "red" }}>
                              Select Day
                            </p>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label
                            className="requiredLabel"
                            htmlFor="exampleInputEmail1"
                          >
                            Birth Month
                          </label>
                          <select
                            className="form-control"
                            name="month"
                            value={kundlidetail.month}
                            onChange={(e) => onchange(e)}
                          >
                            <option value="">Month</option>
                            {months.map((row, index) => (
                              <option value={index + 1} key={index}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.month.status && (
                            <p style={{ width: "72%", color: "red" }}>
                              Select Month
                            </p>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label
                            className="requiredLabel"
                            htmlFor="exampleInputEmail1"
                          >
                            Birth Year
                          </label>

                          <select
                            className="form-control"
                            name="year"
                            value={kundlidetail.year}
                            onChange={(e) => onchange(e)}
                          >
                            <option value="">Year</option>
                            {yeardata.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.year.status && (
                            <p style={{ width: "72%", color: "red" }}>
                              Select year
                            </p>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid className="Component_main_grid mt-2">
                  <Grid item md={12} xs={12} sm={12}>
                    <Grid className="Component_main_grid">
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label
                            className="requiredLabel"
                            htmlFor="exampleInputEmail1"
                          >
                            Birth Hour
                          </label>
                          <select
                            className="form-control"
                            name="birthhour"
                            value={kundlidetail.birthhour}
                            onChange={(e) => onchange(e)}
                          >
                            <option value="">Hour</option>
                            {allhours.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.birthhour.status && (
                            <p style={{ width: "72%", color: "red" }}>
                              Select hour
                            </p>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label
                            className="requiredLabel"
                            htmlFor="exampleInputEmail1"
                          >
                            Birth Minute
                          </label>
                          <select
                            className="form-control"
                            name="birthmin"
                            value={kundlidetail.birthmin}
                            onChange={(e) => onchange(e)}
                          >
                            <option value="">Minute</option>
                            {allminutes.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.birthmin.status && (
                            <p style={{ width: "72%", color: "red" }}>
                              Select minute
                            </p>
                          )}
                        </div>
                      </Grid>
                      <Grid item md={4} xs={12} sm={12}>
                        <div className="p-2">
                          <label htmlFor="exampleInputEmail1">
                            Birth Second
                          </label>

                          <select
                            className="form-control"
                            name="birthsec"
                            value={kundlidetail.birthsec}
                            onChange={(e) => onchange(e)}
                          >
                            <option value="">Second </option>
                            {allminutes.map((row, index) => (
                              <option key={index} value={row}>
                                {row}
                              </option>
                            ))}
                          </select>
                          {error.birthsec.status && (
                            <p style={{ width: "72%", color: "red" }}>
                              Select seconds
                            </p>
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item md={4} xs={12} sm={12}>
                    <div className="p-2">
                      <label
                        className="requiredLabel"
                        htmlFor="exampleInputEmail1"
                      >
                        Birth Place
                      </label>
                      <div className="input_for_cross">
                        <input
                          type="text"
                          className="form-control getplace_input"
                          placeholder="Enter your birth place"
                          name="birthplace"
                          value={kundlidetail.birthplace}
                          // onChange={(e) => onchange(e)}
                          onChange={getPlacesAPIFunc}
                        />
                        <span
                          onClick={() =>
                            setkundlidetail({ ...kundlidetail, birthplace: "" })
                          }
                          className="cross"
                        >
                          &times;
                        </span>
                      </div>
                      {places.length !== 0 && (
                        <div className="getplace_input_freekundli">
                          {places?.map((place) => (
                            <div
                              onClick={() => selectedPlace(place)}
                              className="getplace_input_div"
                            >
                              <IoLocationSharp /> {place}
                            </div>
                          ))}
                        </div>
                      )}
                      {error.birthplace.status && (
                        <p style={{ width: "72%", color: "red" }}>
                          Enter palace
                        </p>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Grid className="mt-2">
                  <Grid item md={4} xs={12} sm={12} style={{margin:"auto"}}>
                    <button
                      className="free_kundali__submit__btn"
                      onClick={() => generatekundli()}
                    >
                      Submit
                    </button>
                    {/* <div className="p-2">
                      <label htmlFor="exampleInputEmail1"></label>
                      <button
                        type="submit"
                        className="generate_horoscope_btn"
                        onClick={() => generatekundli()}
                      >
                        Generate Horoscope
                      </button>
                    </div> */}
                  </Grid>
                </Grid>
              </Card>
            </div>
            <div></div>
          </div>
        </section>
        <CommonCrousal />
        {/* kundali 2 file content */}
        <section className="container">
          <div className="pb-2">
            <h3 className="pb-2 mt-5">
              Understanding the Significance of the 12 Houses in Kundli Analysis
            </h3>

            <p>
              A Kundali, also known as a birth chart, is a profound
              representation that encompasses 12 distinct houses. Each of these
              houses holds the key to unveiling intricate details and insights
              into various aspects of an individual's life journey.
            </p>
            <p>
              The significance of these houses extends beyond mere symbolism;
              they serve as windows into the complexities that shape a person's
              existence. From physical attributes to personal interests and
              defining characteristics, the 12 houses collectively form a
              comprehensive tapestry that paints a vivid picture of an
              individual's destiny.
            </p>
            <p>
              <strong>
                Delving into the realms of these houses reveals a rich tapestry
                of meanings:
              </strong>
            </p>
            <p>
              <strong>First House:</strong>
            </p>
            <p>
              This house encapsulates the essence of one's being – physical
              attributes, temperament, and self-identity.
            </p>

            <p>
              <strong>Second House:</strong>
            </p>
            <p>
              The realm of wealth, resources, family, and primary education
              comes under the watchful gaze of this house.
            </p>

            <p>
              <strong>Third House:</strong>{" "}
            </p>
            <p>
              Communication skills, interactions with younger siblings, hobbies,
              and efforts find their home here.
            </p>

            <p>
              <strong>Fourth House:</strong>{" "}
            </p>
            <p>
              A sanctuary of emotions, this house governs matters of home,
              motherhood, property, and vehicles.
            </p>

            <p>
              <strong>Fifth House:</strong>
            </p>
            <p>
              The abode of creativity, higher education, love affairs, progeny,
              and the echoes of past experiences resonates within.
            </p>

            <p>
              <strong>Sixth House:</strong>{" "}
            </p>
            <p>
              This house is where the battles against disease, profession,
              advocacy, and debt are waged.
            </p>
            <p>
              <strong>Seventh House:</strong>
            </p>
            <p>
              The domain of partnerships, be it marriage or business, along with
              public image and import-export activities, finds its anchor here.
            </p>

            <p>
              <strong>Eighth House:</strong>
            </p>
            <p>
              Secrets, longevity, unexpected occurrences, and research all
              unfold within the realms of this house.
            </p>
            <p>
              <strong>Ninth House:</strong>
            </p>
            <p>
              The pilgrimage of belief systems, higher education, fortune, long
              journeys, and mentorship embarks from this house.
            </p>

            <p>
              <strong>Tenth House:</strong>{" "}
            </p>
            <p>
              The zenith of one's journey, it governs careers, actions,
              professions, and the shaping of destiny.
            </p>
            <p>
              <strong>Eleventh House:</strong>
            </p>
            <p>
              This house oversees the pursuit of aspirations, the accumulation
              of gains, and relationships with elder siblings.
            </p>

            <p>
              <strong>Twelfth House:</strong>
            </p>
            <p>
              The curtain falls on this cosmic stage with matters of spiritual
              growth, losses, and the intricate web of expenses.
            </p>
          </div>
        </section>
        <section className="container">
          <div className="pb-2">
            <h3 className="pb-2 mt-5">
              The Kundli's Profound Influence on Self, Relationships, and Beyond
            </h3>

            <p>
              The Kundli, also known as the birth chart or horoscope, emerges as
              a dynamic guide that holds significant sway over multiple aspects
              of an individual's life journey. It delves into the intricacies of
              existence, shedding light on various dimensions and influencing
              decision-making across diverse realms.
            </p>
            <p>
              Here's a closer look at the profound role of the Kundli in
              different facets of life:
            </p>
            <p>
              <strong>1. Self-Discovery and Personality Insights</strong>:
            </p>
            <p>
              The Kundli serves as an introspective mirror, reflecting the
              intricate tapestry of one's personality. By analyzing planetary
              placements, it unravels the threads of inherent traits, behaviors,
              and strengths. This self-revelation empowers individuals to
              embrace their authentic selves and navigate life with greater
              self-awareness.
            </p>

            <p>
              <strong>2. Career Path and Vocational Inclinations:</strong>
            </p>
            <p>
              Within the realm of career, the Kundli unveils vocational
              inclinations and preferences. It acts as a compass, guiding
              individuals towards making informed decisions about their
              professional paths. The alignment of planets and signs in specific
              houses can provide valuable indications about suitable career
              choices and avenues for success.
            </p>
            <p>
              <strong>3.Relationships and Compatibility:</strong>
            </p>
            <p>
              The Kundli is a powerful tool in assessing compatibility in
              various relationships, including partnerships, friendships, and
              romantic connections. By comparing and contrasting birth charts,
              astrologers can offer valuable insights into the dynamics of
              relationships, helping individuals foster and maintain harmonious
              connections with others.
            </p>

            <p>
              <strong>4. Marriage and Family Choices</strong>:
            </p>
            <p>
              In the context of marriage and family life, the Kundli offers a
              profound resource. It unveils the compatibility between potential
              life partners, guiding individuals in making well-informed
              decisions about life's most significant alliances. This celestial
              insight paves the way for marital harmony and familial bliss.
            </p>

            <p>
              <strong>5. Health Insights and Well-Being</strong>:
            </p>
            <p>
              Astrological interpretations of the Kundli extend to matters of
              health and well-being. By identifying potential vulnerabilities
              and tendencies within the birth chart, astrologers can offer
              guidance on adopting preventative measures and practices to
              maintain optimal physical and mental well-being.
            </p>

            <p>
              <strong>6. Financial Prospects and Wealth Accumulation</strong>:
            </p>
            <p>
              Through the lens of planetary positions, the Kundli provides
              insights into financial prospects and wealth accumulation. By
              analyzing the celestial configurations related to finances,
              individuals can make informed choices regarding investments,
              financial planning, and prudent resource management.
            </p>
            <p>
              <strong>7.Education and Academic Pursuits</strong>:
            </p>
            <p>
              The Kundli can serve as a guiding beacon in matters of education
              and learning. It highlights areas of interest, potential academic
              strengths, and suitable educational paths. This assists
              individuals in making well-informed decisions about higher
              education and areas of specialization.
            </p>

            <p>
              <strong>8. Spiritual Growth and Inner Exploration</strong>:
            </p>
            <p>
              Beyond worldly matters, the Kundli also offers insights into an
              individual's spiritual inclinations and potential paths of
              spiritual growth. It guides individuals in their quest for higher
              understanding, inner fulfillment, and enlightenment.
            </p>

            <p>
              <strong>
                9.Navigating Challenges and Embracing Opportunities
              </strong>
              :{" "}
            </p>
            <p>
              The Kundli unveils celestial configurations that shed light on
              life's twists and turns. It empowers individuals to navigate
              through adversities with resilience and to seize favorable
              circumstances with wisdom, helping them to evolve and grow.
            </p>
            <p>
              <strong>10. Timings and Life Phases</strong>:
            </p>
            <p>
              One of the Kundli's remarkable attributes is its ability to
              indicate life phases and auspicious timings. Astrologers can
              provide insights into pivotal phases of life and potential turning
              points, assisting individuals in making well-timed decisions and
              planning significant life endeavors.
            </p>
          </div>
        </section>
        <div className="container faq-section py-3">
          <FAQ data={horoscopeFaq} />
        </div>
      </div>
    </>
  );
};

export default HOC(FreeKundli);
