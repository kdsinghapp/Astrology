import React, { useEffect, useState, useContext } from "react";
import HOC from "../../Common/HOC";
import Specialoffer from "../../images/Special-offer.png";
import { useNavigate, useParams } from "react-router-dom";
// import { Card } from "@material-ui/core";
import { Card } from "@mui/material";
import { notificationHandler } from "../utils/Notification";
import ReactStars from "react-rating-stars-component";
import RechargePopup from "../DialogeBox/RechargePopup";
import SEO from "../Seo/seo";
import "./Chat_with_ Astrologer.css";
import { AiOutlineMessage, AiFillStar } from "react-icons/ai";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import AstroStatus from "../DialogeBox/AstroStatus";
import { UserContext } from "../../App";
import Cookies from "js-cookie";
import dummy from "../../images/dummy.jpg";
import { get_profile_api } from "../api/authapi";
import astrologer_list_api, {
  call_initiate_api,
  call_initiate_status_api,
  category_list_api,
  language_list_api,
  notifyme_api,
} from "../api/astrochat";
import ListSkeleton, { FilterSkeleton } from "../skeleton/skeletoncard";
import Chatfunction from "../function/Chatfunction";
import DataNotFound from "../DataNotFound";
import { IoSearchOutline } from "react-icons/io5";
import { FiFilter } from "react-icons/fi";
import BreadcrumbSection from "../BreadcrumbSection/BreadcrumbSection";
import FAQ from "../AstroPushFAQ/FAQ";
import SEOPAge from "../../Pages/SEOPAge";
import BlogCrousal from "../Crousal/BlogCrousal";
import { astrocity_api } from "../api/astrocity";
import { getBaseUrl } from "../utils";
import axios from "axios";
import { get_latLong } from "../api/location";

const Chat_with_Astrologer_City = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  const [callendedId, setcallendedId] = useState("");
  const userID = Cookies.get("userID");
  const auth = Cookies.get("auth");
  const token = Cookies.get("token");
  const currency = Cookies.get("country");
  const [isloading, setisloading] = useState(false);
  const [astrologerdataArry, setastrologerdataArry] = useState([]);
  const [walletBalance, setwalletBalance] = useState("");
  const [CategoriesListArry, setCategoriesListArry] = useState([]);
  const [AstroLanguageListArry, setAstroLanguageListArry] = useState([]);
  const [search, setsearch] = useState("");
  const [Astrores, setAstrores] = useState(false);
  const [astrostatus, setastrostatus] = useState("initiate");
  const [rechargenow, setrechargenow] = useState(false);
  const [All, setAll] = useState(true);
  const [asrropricepopup, setasrropricepopup] = useState("");
  const [categoryIdArry, setcategoryIdArry] = useState([]);
  const [AstroskillIdArry, setAstroskillIdArry] = useState([]);
  const [languageIdArry, setlanguageIdArry] = useState([]);
  const [gender, setgender] = useState("");
  const [sortby, setsortby] = useState("");
  const [Loginpopup, setLoginpopup] = useState(false);
  const [astroArrLoading, setastroArrLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const params = useParams();
  const [SEOdata, setSEOdata] = useState([]);
  const [profileData, setProfileData] = useState({});
  const [locationData, setLocationData] = useState({
    lat: "",
    lng: "",
  });

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
    if (auth === "true" && !userID) {
      setisloading(true);
    }

    category_list();
    language_list();
  }, []);

  useEffect(() => {
    if (auth === "true") {
      get_profile();
    }
  }, [auth]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, 1000);

    Astrologerdata();
  }, []);

  const get_profile = async () => {
    setisloading(true);
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        setwalletBalance(res.data.results_web.wallet);
        setProfileData(res?.data);
        dispatch({
          type: "USER",
          payload: {
            ...state,
            results_web: res.data.results_web,
            wallet: res.data.results_web.wallet,
          },
        });
        setisloading(false);
        const latlngResp = await get_latLong(res?.data?.results_web.pob);
        if (latlngResp.status === 200) {
          const { lat, lng } = latlngResp.data;
          setLocationData({
            lat: lat || "",
            lng: lng || "",
          });
        }
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

  const searchbykey = async (e) => {
    setsearch(e.target.search);
    setastroArrLoading(true);
    try {
      let temp = {
        token: token,
        is_chat: "on",
        skill_id: "",
        currency,
        language_id: "",
        search: e.target.value,
        is_voice_call: "",
        is_video_call: "",
        is_question: "",
        page: "1",
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setisloading(false);
        setastroArrLoading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
        setastroArrLoading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
      setastroArrLoading(false);
    }
  };

  const Astrologerdata = async () => {
    setastroArrLoading(true);
    setAll(true);
    try {
      let temp = {
        token: token,
        is_chat: "on",
        currency,
        skill_id: "",
        language_id: "",
        search: search,
        is_voice_call: "",
        is_video_call: "",
        is_question: "",
        page: "1",
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setisloading(false);
        setastroArrLoading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        setastroArrLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      setisloading(false);
      setastroArrLoading(false);
    }
  };

  const category_list = async () => {
    setisloading(true);
    try {
      const res = await category_list_api();
      if (res.data.status) {
        res.data.results.map((item) => {
          item.check = false;
        });
        setCategoriesListArry(res.data.results);
        setisloading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const language_list = async () => {
    setisloading(true);
    try {
      const res = await language_list_api();
      if (res.data.status) {
        setAstroLanguageListArry(res.data.results);
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

  const filterdatabyCategory = async () => {
    setAll(false);
    setastroArrLoading(true);
    setisloading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "on",
        currency,
        is_voice_call: "",
        is_video_call: "",
        search: "",
        page: "1",
        sort_val: sortby,
        gender: gender,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setisloading(false);
        setastroArrLoading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        setastroArrLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
      setastroArrLoading(false);
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
  const languageIdfilter = async () => {
    setAll(false);
    setisloading(true);
    setastroArrLoading(true);
    try {
      let temp = {
        cat_id: categoryIdArry.toString(),
        skill_id: AstroskillIdArry.toString(),
        language_id: languageIdArry.toString(),
        is_chat: "on",
        currency,
        is_voice_call: "",
        is_video_call: "",
        search: "",
        page: "1",
        sort_val: sortby,
        gender: gender,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setisloading(false);
        setastroArrLoading(false);
      } else {
        console.log("data response error:::", res);
        setisloading(false);
        setastroArrLoading(false);
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
      setastroArrLoading(false);
    }
  };

  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
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
        is_chat: "on",
        currency,
        is_voice_call: "",
        is_video_call: "",
        search: "",
        page: "1",
        sort_val: sortby,
        gender: gender,
      };
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        setastrologerdataArry(res.data.results);
        setisloading(false);
        setastroArrLoading(false);
      } else {
        console.log("data response error:::", res);
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
        setastroArrLoading(false);
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
      setastroArrLoading(false);
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
      heading:
        "<h2>Is It safe to enter my payment details on astropush Site?</h2>",
      desc: "<p>Yes it is completely safe.</p>",
    },
    {
      show: true,
      heading:
        "<h2>Can I speak to the same astrologer, if I call the second time?</h2>",
      desc: "<p>When calling the second time depends on several factors. It primarily relies on the availability of the astrologer and their scheduling. If the astrologer is available and you specifically request to speak to them, Yes, you can speak to the same astrologer if you call the second time.</p>",
    },
    {
      show: true,
      heading: "<h2>How can I connect with an astrologer on chat?</h2>",
      desc: "<p>Visit the Asropush site and create an account, Navigate to the chat section and browse available astrologers, Select an astrologer and initiate a chat session, Ask specific questions or provide necessary details for accurate readings, Engage in a conversation with the astrologer to receive personalised astrological guidance.</p>",
    },
    {
      show: true,
      heading: "<h2>Why are some astrologers on the app so expensive?</h2>",
      desc: "<p>Some astrologers on Astropush app may charge high prices due to their expertise, experience, demand, and the value they provide.</p>",
    },
    {
      show: true,
      heading:
        "<h2>Why should I choose Astropush site for chat with astrologer?</h2>",
      desc: "<p>Astropush is a premier site for connecting with experienced astrologers, offering a unique and personalised chat experience. With a vast pool of knowledgeable astrologers, Astropush ensures accurate and insightful readings. Its user-friendly interface, secure platform, and affordable pricing make it the ideal choice for those seeking reliable astrological guidance.</p>",
    },
    {
      show: true,
      heading:
        "<h2>Can I ask for a refund if I am not satisfied with the service?</h2>",
      desc: "<p>Yes, you can generally ask for a refund if you are not satisfied with a service. The specific refund policy will depend on the terms and conditions set by the service provider. It's advisable to review the refund policy before making a purchase or entering into an agreement to understand your rights and the conditions for requesting a refund.</p>",
    },
  ]);

  const showfaqfun = (index) => {
    horoscopeFaq[index].show = !horoscopeFaq[index].show;
    sethoroscopeFaq([...horoscopeFaq]);
  };

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
                aria-expanded="false"
                aria-haspopup="true"
                onChange={(e) => searchbykey(e)}
              />
              <i className="fa fa-search"></i>
            </div>
            <BreadcrumbSection tittle="Chat with Astrologer" />
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
                                className="form-check filter_categories_color"
                                key={index}
                              >
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  id={data?.name}
                                  value={data.checkbox}
                                  onClick={(e) => categoryId(e, data, index)}
                                  checked={categoryIdArry.includes(data.id)}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={data?.name}
                                >
                                  {data?.name}
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
                                className="form-check "
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
                            name="gender"
                            value=""
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
                            name="gender"
                            value=""
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
                            name="price"
                            value=""
                            id="flexCheckChecked"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "high_to_low_exp",
                              });
                              setsortby("high_to_low_exp");
                              setAll(false);
                            }}
                            checked={sortby == "high_to_low_exp"}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckChecked"
                          >
                            Experience : High to Low
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="price"
                            value=""
                            id="low_to_high_exp"
                            onClick={(e) => {
                              sortingbyfilter({
                                gender,
                                sortby: "low_to_high_exp",
                              });
                              setsortby("low_to_high_exp");
                              setAll(false);
                            }}
                            checked={sortby == "low_to_high_exp"}
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
                            name="price"
                            value=""
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
                            name="price"
                            value=""
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
                            name="price"
                            value=""
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
                            Rating : Low to High
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

                  {!astroArrLoading ? (
                    <div className="row">
                      {astrologerdataArry.length > 0 ? (
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
                                  onClick={(e) => {
                                    navigate(`/astrologer_profile/${data.id}`, {
                                      state: data,
                                    });
                                  }}
                                >
                                  <div className="card_top">
                                    <div className="top_left">
                                      <div className="left">
                                        {data?.profile_img === "" ? (
                                          <img src={dummy} />
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
                                              {row?.name.substring(0, 40) + ","}
                                            </span>
                                          ))}
                                      </div>
                                      <div className="lang">
                                        {data?.language
                                          .slice(0, 4)
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
                                        <div
                                          className="reviews_data"
                                          style={{
                                            color: "#ff0000",
                                            fontSize: "0.7rem",
                                          }}
                                        >
                                          {/* {data.is_busy === 1 ? (
                                            <>
                                              ({data.watting_time}/min waiting)
                                            </>
                                          ) : (
                                            ""
                                          )} */}
                                        </div>
                                        {data.is_chat_online === "off" ? (
                                          <div
                                            style={{
                                              color: "#ff0000",
                                              fontSize: "0.7rem",
                                            }}
                                          ></div>
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
                                          {data?.per_min_chat?.toFixed(2)}/min
                                        </span>
                                        {data.offer === "true" &&
                                        data.eligible_offer === "true" ? (
                                          <>
                                            {" "}
                                            only{" "}
                                            {data.currency === "INR"
                                              ? "₹"
                                              : "$"}
                                            1 /-
                                          </>
                                        ) : (
                                          <>
                                            {" "}
                                            {data.currency === "INR"
                                              ? "₹"
                                              : "$"}
                                            {(
                                              data?.per_min_chat -
                                              (data?.per_min_chat *
                                                data?.per_min_chat_offer) /
                                                100
                                            )?.toFixed(2)}
                                            /min{" "}
                                          </>
                                        )}{" "}
                                      </div>
                                    ) : (
                                      <div style={{ fontWeight: "500" }}>
                                        {data.offer === "true" &&
                                        data.eligible_offer === "true" ? (
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
                                              {data?.per_min_chat?.toFixed(2)}
                                              /min
                                            </span>{" "}
                                            only{" "}
                                            {data.currency === "INR"
                                              ? "₹"
                                              : "$"}
                                            1 /-
                                          </>
                                        ) : (
                                          <>
                                            {data.currency === "INR"
                                              ? "₹"
                                              : "$"}
                                            {data?.per_min_chat?.toFixed(2)}/min
                                          </>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="btn astro-meet-btn">
                                  {data.is_chat_online === "off" ? (
                                    <button className="btn_chat offline-status">
                                      <span>
                                        <AiOutlineMessage />{" "}
                                        <span>Offline</span>
                                      </span>
                                    </button>
                                  ) : data.is_busy === 1 ? (
                                    <>
                                      <button className="btn_chat busy-status">
                                        <span>
                                          <AiOutlineMessage /> <span>Busy</span>
                                        </span>
                                      </button>
                                      <button
                                        className="btn_chat online-status mr-1"
                                        onClick={() => user_notify(data.id)}
                                      >
                                        <span>
                                          <AiOutlineMessage />
                                          <span>Notify</span>
                                        </span>
                                      </button>
                                    </>
                                  ) : (
                                    <Chatfunction
                                      astroID={data.id}
                                      astrodata={data}
                                      type="chat"
                                      profileData={profileData}
                                      locationData={locationData}
                                    />
                                  )}
                                </div>
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
      <AstroStatus
        open={Astrores}
        status={astrostatus}
        channal={callendedId}
        close={() => setAstrores(!Astrores)}
      />
      <RechargePopup
        open={rechargenow}
        close={() => setrechargenow(!rechargenow)}
        walletBalance={walletBalance}
        price={asrropricepopup}
      />
    </>
  );
};

export default HOC(Chat_with_Astrologer_City);
