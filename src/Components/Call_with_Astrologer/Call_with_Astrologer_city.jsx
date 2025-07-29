import React, { useEffect, useState } from "react";
import HOC from "../../Common/HOC";
import Specialoffer from "../../images/Special-offer.png";
import { useNavigate, useParams } from "react-router-dom";
import "./Call_with_Astrologer.css";
// import { Card } from "@material-ui/core";
import { Card } from "@mui/material";
import { notificationHandler } from "../utils/Notification";
import ReactStars from "react-rating-stars-component";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import RechargePopup from "../DialogeBox/RechargePopup";
import Astrologercallstatus from "../DialogeBox/Astrologercallstatus";
import { AiFillStar } from "react-icons/ai";
import { MdCall } from "react-icons/md";
import Cookies from "js-cookie";
import dummy from "../../images/dummy.jpg";
import SEO from "../Seo/seo";
import ListSkeleton, { FilterSkeleton } from "../skeleton/skeletoncard";
import astrologer_list_api, {
  call_initiate_api,
  category_list_api,
  language_list_api,
  notifyme_api,
} from "../api/astrochat";
import { get_profile_api } from "../api/authapi";
import DataNotFound from "../DataNotFound";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import FAQ from "../AstroPushFAQ/FAQ";
import BlogCrousal from "../Crousal/BlogCrousal";
import SEOPAge from "../../Pages/SEOPAge";
import axios from "axios";
const Call_with_Astrologer_city = () => {
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const currency = Cookies.get("country");
  const navigate = useNavigate();
  const [astroArrLoading, setastroArrLoading] = useState(false);
  const [Loginpopup, setLoginpopup] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const [isloading, setisloading] = useState(false);
  const [astrologerdataArry, setastrologerdataArry] = useState([]);
  const [CategoriesListArry, setCategoriesListArry] = useState([]);
  const [AstroLanguageListArry, setAstroLanguageListArry] = useState([]);
  const [walletBalance, setwalletBalance] = useState("");
  const [rechargenow, setrechargenow] = useState(false);
  const [callconnect, setcallconnect] = useState(false);
  const [asrropricepopup, setasrropricepopup] = useState("");
  const [All, setAll] = useState(true);
  const [categoryIdArry, setcategoryIdArry] = useState([]);
  const [AstroskillIdArry, setAstroskillIdArry] = useState([]);
  const [languageIdArry, setlanguageIdArry] = useState([]);
  const [gender, setgender] = useState("");
  const [sortby, setsortby] = useState("");
  const [usernumber, setusernumber] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const params = useParams();
  const [SEOdata, setSEOdata] = useState([]);
  useEffect(() => {
    if (params.country && params.city) {
      get_astrocity_seo(
        `https://admin.astropush.com/web/Astrocity?meta_link=astrologer/${params.country}/${params.city}`
      );
    } else {
      get_astrocity_seo(
        `https://admin.astropush.com/web/Astrocity?meta_link=astrologer/${params.country}`
      );
    }
  }, [params]);
  const get_astrocity_seo = async (url) => {
    let config = {
      method: "get",
      url: url,
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    setisloading(true);
    try {
      const res = await axios(config);
      if (res.data.status) {
        setSEOdata(res.data.results);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      setisloading(false);
      notificationHandler({ type: "danger", msg: "Network error" });
    }
  };

  useEffect(() => {
    Astrologerdata();
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1000);
  }, [isUpdated]);

  useEffect(() => {
    // astroskill();
    category_list();
    language_list();
  }, []);

  useEffect(() => {
    if (auth === "true") {
      get_profile();
    }
  }, []);

  const get_profile = async () => {
    setisloading(true);
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        setwalletBalance(res.data.results_web.wallet);
        setusernumber(res.data.results_web.number);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  /////api integration seacrh astro by name
  const searchbyname = async (e) => {
    setastroArrLoading(true);
    try {
      let temp = {
        token: token,
        is_chat: "",
        currency,
        skill_id: "",
        language_id: "",
        search: e.target.value,
        is_voice_call: "on",
        is_video_call: "",
        is_question: "",
        page: "1",
      };

      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setisUpdated(isUpdated);
        setastroArrLoading(false);
        setastrologerdataArry(res.data.results);
      } else {
        console.log("data response error:::", res);
        setastroArrLoading(false);
        notificationHandler({ type: "danger", msg: res.data.status });
      }
      setastroArrLoading(false);
      setisloading(false);
    } catch (error) {
      setastroArrLoading(false);
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  /////api integration get Astrologer List
  const Astrologerdata = async () => {
    setastroArrLoading(true);
    setAll(true);
    setisloading(true);

    let temp = {
      token: token,
      is_chat: "",
      currency,
      skill_id: "",
      language_id: "",
      search: "",
      is_voice_call: "on",
      is_video_call: "",
      is_question: "",
      page: "1",
    };
    try {
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setastroArrLoading(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        setastroArrLoading(false);
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      setastroArrLoading(false);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  /////api integration get astroskill
  const category_list = async () => {
    setisloading(true);
    try {
      const res = await category_list_api();
      res.data.results.map((item) => {
        item.check = false;
      });
      if (res.data.status) {
        setCategoriesListArry(res.data.results);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  /////api integration get language_list
  const language_list = async () => {
    setisloading(true);
    try {
      const res = await language_list_api();
      if (res.data.status) {
        setAstroLanguageListArry(res.data.results);
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

  const categoryId = (e, data, index) => {
    let i = index;
    CategoriesListArry.map((row, i) => {
      if (data === row) {
        if (e.target.checked) {
          categoryIdArry.push(row.id);
        } else {
          const index = categoryIdArry.indexOf(row.id);
          if (index > -1) {
            categoryIdArry.splice(index, 1);
          }
        }
      }
    });
    filterdatabyCategory();
  };

  /////api integration filter data by categories
  const filterdatabyCategory = async () => {
    setastroArrLoading(true);
    setAll(false);
    setisloading(true);
    let temp = {
      cat_id: categoryIdArry.toString(),
      skill_id: AstroskillIdArry.toString(),
      language_id: languageIdArry.toString(),
      is_chat: "",
      currency,
      is_voice_call: "on",
      is_video_call: "",
      search: "",
      page: "1",
      sort_val: sortby,
      gender: gender,
    };
    try {
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setastroArrLoading(false);
        setisUpdated(false);
      } else {
        setastroArrLoading(false);
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setastroArrLoading(false);
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      setastroArrLoading(false);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  const languageId = (e, data, index) => {
    AstroLanguageListArry.map((row, index) => {
      if (data === row) {
        if (e.target.checked) {
          languageIdArry.push(data.id);
        } else {
          let index = languageIdArry.indexOf(row.id);
          if (index > -1) {
            languageIdArry.splice(index, 1);
          }
        }
      }
    });

    languageIdfilter();
  };

  /////api integration get filter data by categories
  const languageIdfilter = async () => {
    setastroArrLoading(true);
    setAll(false);
    setisloading(true);
    let temp = {
      cat_id: categoryIdArry.toString(),
      skill_id: AstroskillIdArry.toString(),
      language_id: languageIdArry.toString(),
      is_chat: "",
      currency,
      is_voice_call: "on",
      is_video_call: "",
      search: "",
      page: "1",
      sort_val: sortby,
      gender: gender,
    };
    try {
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setisUpdated(false);
        setastroArrLoading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setastroArrLoading(false);
      }
      setisloading(false);
    } catch (error) {
      setastroArrLoading(false);
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
    }
  };

  const findastroId = (data) => {
    setasrropricepopup(data.per_min_voice_call);
    if (auth === "true" && auth) {
      return audiocallfun(data);
    }
    setLoginpopup(true);
  };

  /////call audio api
  const audiocallfun = async (data) => {
    try {
      setisloading(true);
      let temp = {
        astrologer_id: data.id,
        call_type: "audio",
      };

      const res = await call_initiate_api(temp);
      if (res.data.type === "recharge") {
        return setrechargenow(true);
      }
      if (res.data.status === true) {
        setcallconnect(true);
        // setTimeout(() => {
        //   setcallconnect(false);
        // }, 5000);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  const walletrecharge = () => {
    setrechargenow(!rechargenow);
  };

  ///price,gender and experince filter api
  const sortingbyfilter = async (data) => {
    const gender = data.gender;
    const sortby = data.sortby;
    setisloading(true);
    setastroArrLoading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "",
        currency,
        is_voice_call: "on",
        is_video_call: "",
        search: "",
        page: "1",
        sort_val: sortby,
        gender: gender,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        // setisUpdated(false);
        setastroArrLoading(false);
        setisloading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
        setastroArrLoading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      setastroArrLoading(false);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  const user_notify = async (data) => {
    if (auth === "true") {
      const temp = {
        astro_id: data,
      };
      try {
        const res = await notifyme_api(temp);
        if (res.data.status) {
          notificationHandler({ type: "success", msg: res.data.message });
        } else {
          notificationHandler({ type: "success", msg: res.data.message });
          console.log("data response error:::", res);
        }
      } catch (error) {
        console.log("data response error:::", error);
        notificationHandler({ type: "danger", msg: "Network error" });
      }
    } else {
      setLoginpopup(!Loginpopup);
    }
  };
  const clearFilter = () => {
    const arry = [];
    setlanguageIdArry([...arry]);
    setcategoryIdArry([...arry]);
    setgender("");
    setsortby("");
    Astrologerdata();
  };

  const [horoscopeFaq, sethoroscopeFaq] = useState([
    {
      show: true,
      heading: "<h2>Can I choose the astrologer I want to talk to?</h2>",
      desc: "<p>Astropush website, you have the freedom to select the astrologer you wish to engage with. The platform provides a wide range of experienced astrologers, allowing you to choose the one that aligns with your preferences and needs for a personalised and insightful session.</p>",
    },
    {
      show: true,
      heading: "<h2>Why do all the astrologers have such good ratings?</h2>",
      desc: "<p>Astrologers often receive good ratings on websites like Astropush due to several reasons. Firstly, satisfied customers are more likely to leave positive reviews, while dissatisfied ones may be less motivated to do so. </p>",
    },
    {
      show: true,
      heading:
        "<h2>Is my personal information safe when consulting an astrologer online?</h2>",
      desc: "<p>Astropush takes measures to protect user data, ensuring confidentiality and secure transactions. However, it is advisable to review their privacy policy and terms of service to understand their data protection practices fully.</p>",
    },
    {
      show: true,
      heading: "<h2>Are online astrologers qualified and experienced?</h2>",
      desc: "<p>Online astrologers on the Astropush site may vary in qualifications and experience. Seek reviews and credentials for reliable insights.</p>",
    },
    {
      show: true,
      heading:
        "<h2>Are there any preparations before talking to an astrologer online?</h2>",
      desc: "<p>Before consulting an online astrologer, it's beneficial to gather relevant birth information such as date, time, and place of birth. Prepare specific questions or areas of life you'd like to explore, ensuring clarity on your goals. Open-mindedness, honesty, and a willingness to explore the astrologer's insights are also essential for a fruitful session.</p>",
    },
  ]);

  return (
    <>
      <SEO
        title={SEOdata[0]?.meta_title}
        description={SEOdata[0]?.meta_description}
        keywords={SEOdata[0]?.meta_keywords}
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="homepage_padding pb-5">
        <div className="responsive-filter">
          <div
            onClick={() => {
              if (activeTab === "filter") return setActiveTab("");
              setActiveTab("filter");
            }}
          >
            <FiFilter /> Filter
          </div>
          <div
            onClick={() => {
              if (activeTab === "search") return setActiveTab("");
              setActiveTab("search");
            }}
          >
            <IoSearchOutline /> Search
          </div>
        </div>

        <section>
          <div className="container">
            <div
              className={`search_box_astromall_new mt-5 ${
                activeTab !== "search" ? "" : "search-hidden"
              }`}
            >
              <input
                type="search"
                name="productSearch"
                id="productSearch"
                className="mat-autocomplete-trigger ng-valid ng-touched ng-dirty"
                placeholder="Let's find what you're looking for..."
                role="combobox"
                onChange={(e) => searchbyname(e)}
                aria-expanded="false"
                aria-haspopup="true"
              />
              <i className="fa fa-search"></i>
            </div>
            <BreadcrumbSection tittle="Talk To Astrologer" />
            <div className="row">
              <div className="col-md-3">
                <section
                  className={`filter filter-section-left mt-5 ${
                    activeTab !== "filter" ? "filter-hidden" : ""
                  }`}
                >
                  <div className="">
                    <Card className="Card_shadow p-3">
                      <div className="d-flex justify-content-between">
                        <h5 className="productFilter_filterHeading">Skill</h5>
                        <h5
                          className="productFilter_filterHeading"
                          onClick={() => clearFilter()}
                          style={{ cursor: "pointer" }}
                        >
                          Clear
                        </h5>
                      </div>
                      <div className="experties_catagories">
                        {/* <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            onClick={() => Astrologerdata()}
                            checked={All === true ? "checked" : ""}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            All
                          </label>
                        </div> */}
                        {CategoriesListArry && CategoriesListArry.length > 0 ? (
                          <div>
                            {CategoriesListArry.map((data, index) => (
                              <div
                                className="form-check"
                                key={index}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={data.name}
                                  value={data.checkbox}
                                  onClick={(e) => categoryId(e, data, index)}
                                  checked={categoryIdArry.includes(data.id)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={data.name}
                                >
                                  {data.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ width: "100%" }}>
                            <FilterSkeleton
                              listsToRender={1}
                              width="300"
                            />
                          </div>
                        )}
                      </div>

                      <div className="experties_catagories">
                        <div>
                          <h5 className="productFilter_filterHeading">
                            Languages
                          </h5>
                        </div>
                        {AstroLanguageListArry &&
                        AstroLanguageListArry.length > 0 ? (
                          <div>
                            {AstroLanguageListArry.map((data, index) => (
                              <div
                                className="form-check"
                                key={index}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  value=""
                                  id={data.name}
                                  onClick={(e) => languageId(e, data, index)}
                                  checked={languageIdArry.includes(data.id)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={data.name}
                                >
                                  {data.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div style={{ width: "100%" }}>
                            <FilterSkeleton
                              listsToRender={1}
                              width="300"
                            />
                          </div>
                        )}
                      </div>
                      <div className="experties_catagories">
                        <div>
                          <h5 className="productFilter_filterHeading">
                            Gender
                          </h5>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Male"
                            name="gender"
                            id="Male"
                            onClick={(e) => {
                              sortingbyfilter({ gender: "Male", sortby });
                              setgender("Male");
                              setAll(false);
                            }}
                            checked={gender.includes("Male")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Male"
                          >
                            Male
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value="Female"
                            name="gender"
                            id="Female"
                            onClick={(e) => {
                              sortingbyfilter({ gender: "Female", sortby });
                              setgender("Female");
                              setAll(false);
                            }}
                            checked={gender.includes("Female")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="Female"
                          >
                            Female
                          </label>
                        </div>
                      </div>

                      <div className="experties_catagories">
                        <div>
                          <h5 className="productFilter_filterHeading">
                            Sort by
                          </h5>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value=""
                            name="price"
                            id="high_to_low_exp"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "high_to_low_exp",
                              });
                              setsortby("high_to_low_exp");
                              setAll(false);
                            }}
                            checked={sortby.includes("high_to_low_exp")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="high_to_low_exp"
                          >
                            Experience : High to Low
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value=""
                            name="price"
                            id="low_to_high_exp"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "low_to_high_exp",
                              });
                              setsortby("low_to_high_exp");
                              setAll(false);
                            }}
                            checked={sortby.includes("low_to_high_exp")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="low_to_high_exp"
                          >
                            Experience : Low to High
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="price"
                            value=""
                            id="high_to_low"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "high_to_low",
                              });
                              setsortby("high_to_low");
                              setAll(false);
                            }}
                            checked={sortby == "high_to_low"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="high_to_low"
                          >
                            Price : High to Low
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value=""
                            name="price"
                            id="low_to_high"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "low_to_high",
                              });
                              setsortby("low_to_high");
                              setAll(false);
                            }}
                            checked={sortby == "low_to_high"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="low_to_high"
                          >
                            Price : Low to High
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value=""
                            name="price"
                            id="high_to_low_rating"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "high_to_low_rating",
                              });
                              setsortby("high_to_low_rating");
                              setAll(false);
                            }}
                            checked={sortby == "high_to_low_rating"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="high_to_low_rating"
                          >
                            Rating : High to Low
                          </label>
                        </div>

                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value=""
                            name="price"
                            id="low_to_high_rating"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "low_to_high_rating",
                              });
                              setsortby("low_to_high_rating");
                              setAll(false);
                            }}
                            checked={sortby == "low_to_high_rating"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="low_to_high_rating"
                          >
                            Rating : Low to high
                          </label>
                        </div>
                      </div>
                    </Card>
                  </div>
                </section>
              </div>

              <div className="col-md-9">
                <div className="astro_card_new mt-5 mb-5">
                  <div classNames="seo-content">
                    <h1 style={{ textTransform: "capitalize" }}>
                      {SEOdata[0]?.title}
                    </h1>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: SEOdata[0]?.short_description,
                      }}
                    ></p>
                  </div>

                  {!astroArrLoading > 0 ? (
                    <div className="row">
                      {astrologerdataArry && astrologerdataArry.length > 0 ? (
                        astrologerdataArry.map((data, index) => (
                          <div
                            className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3"
                            key={index}
                            style={{ paddingRight: "0" }}
                          >
                            <Card
                              className="Card_shadow card_div p-2"
                              style={{ position: "relative" }}
                            >
                              <div className="astro-card-container">
                                <div
                                  id="card"
                                  style={{ height: "auto" }}
                                  onClick={() =>
                                    navigate(`/astrologer_profile/${data.id}`, {
                                      state: data,
                                    })
                                  }
                                >
                                  <div className="card_top">
                                    <div className="top_left">
                                      <div className="left">
                                        {data.profile_img === "" ? (
                                          <img
                                            src={dummy}
                                            alt="image"
                                          />
                                        ) : (
                                          <img
                                            src={data?.profile_img}
                                            alt={`Best Astrologer in Astropush -${data?.name}`}
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <div className="top_right">
                                      <div className="astro_detail">
                                        <div className="name">
                                          {data.name.substring(0, 12)}
                                          {data.name.length > 12 && "..."}
                                        </div>
                                        <div className="exp">
                                          {data?.experience} Yr Exp.
                                        </div>
                                      </div>
                                      <div className="prof">
                                        {data?.category
                                          .slice(0, 3)
                                          .map((row, index) => (
                                            <span key={index}>
                                              {row?.name.substring(0, 40) + ","}{" "}
                                            </span>
                                          ))}
                                      </div>
                                      <div className="lang">
                                        {data?.language
                                          .slice(0, 2)
                                          .map((row, index) => (
                                            <span key={index}>
                                              {row?.name + ", "}
                                            </span>
                                          ))}
                                      </div>
                                      {data.offer == "false" &&
                                      data.eligible_offer == "true" ? (
                                        <div
                                          className="lang"
                                          style={{ color: "red" }}
                                        >
                                          4 Mins Free for New User
                                          <img
                                            style={{
                                              width: "40px",
                                              width: "40px",
                                            }}
                                            src={Specialoffer}
                                          />
                                        </div>
                                      ) : (
                                        <div
                                          className="lang"
                                          style={{ color: "white" }}
                                        >
                                          Exp: {data?.experience} Years
                                        </div>
                                      )}
                                      <div className="star">
                                        <div className="star_container">
                                          <ReactStars
                                            style={{ justifyContent: "center" }}
                                            count={5}
                                            value={data.rating}
                                            size={20}
                                            activeColor="#FFB450"
                                            color="#ABABAB"
                                            isHalf={true}
                                            edit={false}
                                            classNames="star_class"
                                            emptyIcon={<AiFillStar />}
                                            halfIcon={
                                              <i className="fa fa-star-half-alt"></i>
                                            }
                                            fullIcon={<AiFillStar />}
                                          />
                                        </div>
                                        {/* <div style={{ fontSize: "0.7rem" }}>
                                          {data.rating}.0 (2548 Reviews){" "}
                                        </div> */}
                                        {data.is_chat_online === "off" ? (
                                          ""
                                        ) : (
                                          <div
                                            style={{
                                              color: "#ff0000",
                                              fontSize: "0.7rem",
                                            }}
                                          >
                                            {data.is_busy === 1 ? (
                                              <span>
                                                • ({data.watting_time} min
                                                waiting)
                                              </span>
                                            ) : (
                                              ""
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>

                                  <div className="card_bottom">
                                    {data.per_min_chat_offer > 0 ? (
                                      <div style={{ fontWeight: "500" }}>
                                        <span
                                          style={{
                                            textDecoration: "line-through",
                                            color: "gray",
                                          }}
                                        >
                                          {data.currency === "INR" ? "₹" : "$"}
                                          {data?.per_min_voice_call?.toFixed(2)}
                                          /min
                                        </span>
                                        {data.offer == "true" &&
                                        data.eligible_offer == "true" ? (
                                          <>
                                            {" "}
                                            only{" "}
                                            {data.currency === "INR"
                                              ? "₹"
                                              : "$"}{" "}
                                            1 /-
                                          </>
                                        ) : (
                                          <>
                                            {" "}
                                            {data.currency === "INR"
                                              ? "₹"
                                              : "$"}{" "}
                                            {(
                                              data?.per_min_voice_call -
                                              (data?.per_min_voice_call *
                                                data?.per_min_chat_offer) /
                                                100
                                            )?.toFixed(2)}
                                            /min
                                          </>
                                        )}{" "}
                                      </div>
                                    ) : (
                                      <div style={{ fontWeight: "500" }}>
                                        {data.offer == "true" &&
                                        data.eligible_offer == "true" ? (
                                          <>
                                            <span
                                              style={{
                                                textDecoration: "line-through",
                                                color: "gray",
                                              }}
                                            >
                                              {data.currency === "INR"
                                                ? "₹"
                                                : "$"}
                                              {data?.per_min_voice_call?.toFixed(
                                                2
                                              )}
                                              /min
                                            </span>{" "}
                                            only{" "}
                                            {data.currency === "INR"
                                              ? "₹"
                                              : "$"}{" "}
                                            1 /-
                                          </>
                                        ) : (
                                          <>
                                            {data.currency === "INR"
                                              ? "₹"
                                              : "$"}
                                            {data?.per_min_voice_call?.toFixed(
                                              2
                                            )}
                                            /min
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="btn astro-meet-btn-call">
                                {data.is_voice_online === "off" ? (
                                  <button className="btn_chat offline-status">
                                    <span>
                                      <MdCall /> <span>Offline</span>
                                    </span>
                                  </button>
                                ) : data.is_busy === 1 ? (
                                  <>
                                    <button className="btn_chat busy-status">
                                      <span>
                                        <MdCall /> Busy
                                      </span>
                                    </button>
                                    <button
                                      className="btn_chat online-status mr-1"
                                      onClick={() => user_notify(data.id)}
                                    >
                                      <span>
                                        <MdCall />
                                        <span>Notify</span>
                                      </span>
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    className="btn_chat online-status"
                                    onClick={() => findastroId(data)}
                                  >
                                    <span>
                                      <MdCall /> Call
                                    </span>
                                  </button>
                                )}
                              </div>
                              {/* {data.offer == "false" && data.eligible_offer == "true" ? (
                                <div className="chat-free-div">
                                  <div className="chat-free-golden">
                                    <span>Top Choice</span>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )} */}
                            </Card>
                          </div>
                        ))
                      ) : (
                        <DataNotFound />
                      )}
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex">
                        <ListSkeleton listsToRender={2} />
                      </div>
                      <div className="d-flex">
                        <ListSkeleton listsToRender={2} />
                      </div>
                      <div className="d-flex">
                        <ListSkeleton listsToRender={2} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <SEOPAge />
            <div className="seo-container mt-4">
              <p
                dangerouslySetInnerHTML={{ __html: SEOdata[0]?.description }}
              ></p>
            </div>
            <BlogCrousal />
            <div className="container faq-section py-3">
              <FAQ data={horoscopeFaq} />
            </div>
          </div>
        </section>
      </div>
      <UserLogin
        open={Loginpopup}
        close={() => logindialogbox()}
      />
      <RechargePopup
        open={rechargenow}
        close={() => setrechargenow(!rechargenow)}
        walletBalance={walletBalance}
        price={asrropricepopup}
      />
      <Astrologercallstatus
        open={callconnect}
        close={() => setcallconnect(!callconnect)}
        walletBalance={walletBalance}
        price={asrropricepopup}
        number={usernumber}
      />
    </>
  );
};

export default HOC(Call_with_Astrologer_city);
