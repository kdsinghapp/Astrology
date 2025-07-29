import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./SEO.css";
import { astrocity_api } from "../Components/api/astrocity";
import { notificationHandler } from "../Components/utils/Notification";
import SEO from "./../Components/Seo/seo";
const SEOPAge = () => {
  const [isloading, setisloading] = useState(false);
  const [Allcities, setAllcities] = useState([]);
  const [International, setInternational] = useState([]);
  const [Categorywise, setCategorywise] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    get_astrocity("India");
    get_astrocity("International");
    get_astrocity("Category");
  }, []);

  const get_astrocity = async (data) => {
    const temp = {
      country: data,
      city: "",
    };
    setisloading(true);
    try {
      const res = await astrocity_api(temp);
      if (res.data.status) {
        if (data === "India") {
          setAllcities(res.data.results);
          return;
        }
        if (data === "International") {
          setInternational(res.data.results);
          return;
        }
        if (data === "Category") {
          setCategorywise(res.data.results);
          return;
        }
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

  const navfun = (data) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const type = data?.meta_link?.split("/");
    const pagetype = window.location.pathname.split("/")[1];
    if (pagetype === "astrologer" || pagetype === "chat-with-astrologer") {
      navigate(`/astrologer/${type[1]}/${type[2]}`);
    }
    if (pagetype === "best-astrologer" || pagetype === "talk-to-astrologer") {
      navigate(`/best-astrologer/${type[1]}/${type[2]}`);
    }
  };

  const navinterfun = (data) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    const type = data?.meta_link?.split("/");
    const pagetype = window.location.pathname.split("/")[1];
    if (pagetype === "astrologer" || pagetype === "chat-with-astrologer") {
      navigate(`/astrologer/${type[1]}`);
    }
    if (pagetype === "best-astrologer" || pagetype === "talk-to-astrologer") {
      navigate(`/best-astrologer/${type[1]}`);
    }
  };
  return (
    <div>
      <section class="find_best_astrologer_section">
        <div class="container">
          <h1 className="service_provide" style={{ textAlign: "center", width: "100%" }}>
            Find Best Astrologers
          </h1>
          <div class="row">
            <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
              <div class="astrologer_city_wise">
                <div class="city_wise_link">
                  <span class="sprite_sign link_consult_astrologer"></span>
                  Consult Astrologer{" "}
                </div>
                <div class="category_link">
                  <div>
                    <span class="sprite_sign link_category_arrow"></span>
                    <a href="/talk-to-astrologer">Talk to Astrologer</a>
                  </div>
                  <div>
                    <span class="sprite_sign link_category_arrow"></span>
                    <a href="/chat-with-astrologer">Chat with Astrologer</a>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
              <div class="astrologer_city_wise">
                <div class="city_wise_link">
                  <span class="sprite_sign link_indian_city "></span> India (City-wise)
                </div>
                <div class="category_link">
                  {Allcities?.map((data, index) => (
                    <div class="" key={index}>
                      <span class="sprite_sign link_category_arrow "></span>{" "}
                      <a onClick={() => navfun(data)} class="" style={{ cursor: "pointer" }}>
                        {data?.sub_title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
              <div class="astrologer_city_wise">
                <div class="city_wise_link">
                  <span class="sprite_sign link_international "></span> International
                </div>
                <div class="category_link">
                  {International?.map((data, index) => (
                    <div class="" key={index}>
                      <span class="sprite_sign link_category_arrow "></span>{" "}
                      <a onClick={() => navinterfun(data)} class="" style={{ cursor: "pointer" }}>
                        {data?.sub_title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div class="col-sm-6 col-md-6 col-lg-4 col-xl-3">
              {/* <div class="astrologer_city_wise">
                <div class="city_wise_link">
                  <span class="category_image_find_best_Astrologer text-center"> <i aria-hidden="true" class="fa fa-bars"></i> </span>
                  Category wise
                </div>  */}

              <div class="astrologer_city_wise">
                <div class="city_wise_link">
                  <span class="sprite_sign link_international "></span> Category wise
                </div>

                <div class="category_link">
                  {Categorywise?.map((data, index) => (
                    <div class="" key={index}>
                      <span class="sprite_sign link_category_arrow "></span>{" "}
                      <a onClick={() => navinterfun(data)} class="" style={{ cursor: "pointer" }}>
                        {data?.sub_title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SEOPAge;
