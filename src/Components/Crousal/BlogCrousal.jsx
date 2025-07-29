import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListSkeleton from "../skeleton/skeletoncard";
import OwlCarousel from "react-owl-carousel";
import "./Crousal.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import homeapi from "../api/homeapi";
import { notificationHandler } from "../utils/Notification";
const BlogCrousal = () => {
  const [BlogSectionArry, setBlogSectionArry] = useState([]);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  const options = {
    loop: true,
    nav: true,
    autoplay: false,
    navText: ["<i className='fa fa-chevron-left '></i>", "<i className='fa fa-chevron-right '></i>"],
    autoplayHoverPause: true,
    mouseDrag: true,
    margin: 10,
    center: false,
    dots: false,
    smartSpeed: 1500,
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
  useEffect(() => {
    BlogSection_api();
  }, []);

  const BlogSection_api = async () => {
    setisloading(true);
    try {
      const res = await homeapi();
      if (res.data.status) {
        setBlogSectionArry(res?.data?.blog);

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

  return (
    <div>
      <section className="blog container mt-3 mb-5">
        <div className="blogcard">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">What's new on the blog</h1>
          </div>

          {BlogSectionArry && BlogSectionArry.length > 0 ? (
            <div className="">
              <OwlCarousel className="owl-theme" {...options}>
                {BlogSectionArry?.slice(0, 3).map((data, index) => (
                  <div
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(`/blog/${data.meta_link}`, {
                        state: {
                          categoryid: data.category_id,
                          id: data.id,
                          meta_link: data.meta_link,
                        },
                      })
                    }
                  >
                    <div className="blog_box_content m-2 ">
                      <div className="blog_section_image">
                        <img src={data.img} alt="blog" />
                      </div>
                      <div className="p-2">
                        <h5>{data?.title}</h5>
                        <span
                          id="converthtml"
                          className=""
                          dangerouslySetInnerHTML={{
                            __html: data?.description.slice(0, 100) + "...",
                          }}
                        ></span>
                      </div>
                      <div className="d-flex p-2" style={{ justifyContent: "space-between" }}>
                        <div className="" style={{ color: "#777" }}>
                          {data?.auther}
                        </div>
                        <div style={{ color: "#777" }}>{data?.Created_date.substring(0, 10)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </OwlCarousel>
            </div>
          ) : (
            <div className="d-flex mb-5">
              <ListSkeleton listsToRender={3} />
            </div>
          )}
        </div>
        <div className="text-center mt-5 mb-5 " onClick={() => navigate("/blog")}>
          <span className="view_all_btn">View All</span>
        </div>
      </section>
    </div>
  );
};

export default BlogCrousal;
