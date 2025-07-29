import React from "react";
import OwlCarousel from "react-owl-carousel";
import "./Crousal.css";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
// import { Card, Avatar } from "@material-ui/core";
import { Avatar, Card, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { MdOutlineVerified } from "react-icons/md";

const OurAstrologerCrousal = (props) => {
  const navigate = useNavigate();
  const options = {
    loop: true,
    nav: true,
    navText: ["<i className='fa fa-chevron-left arrow_right_expert'></i>", "<i className='fa fa-chevron-right arrow_left_expert '></i>"],
    autoplay: true,
    autoplayHoverPause: true,
    mouseDrag: true,
    margin: 20,
    center: false,
    dots: false,

    smartSpeed: 1500,
    responsive: {
      0: {
        items: 2,
      },
      528: {
        items: 2,
      },
      768: {
        items: 3,
      },
      992: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  };

  const ListSkeleton = ({ listsToRender }) => {
    return (
      <>
        {Array(listsToRender)
          .fill(1)
          .map((card, index) => (
            <div style={{ width: "40%", margin: "5px" }} key={index}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Skeleton variant="circular">
                  <Avatar />
                </Skeleton>
                <Skeleton style={{ width: "100%", marginLeft: "2px" }} />
              </Box>
              <Skeleton />
              <Skeleton />
              <Skeleton variant="rectangular" width="100%">
                <div style={{ paddingTop: "37%" }} />
              </Skeleton>
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div className=" mb-3">
        <div className="">
          <div className="ourastologer_content text-center">
            <h1 className="service_provide text-center">Talk to Our Expert Astrologers </h1>
          </div>
        </div>
        {props?.astro && props.astro.length > 0 ? (
          <OwlCarousel className="owl-theme" {...options}>
            {props?.astro.map((data, index) => (
              <Card
                className="Card_shadoww  p-2"
                key={index}
                style={{ cursor: "pointer", height: "auto", margin: ".5rem" }}
                onClick={() => navigate(`/astrologer_profile/${data.id}`, { state: data })}
              >
                <div className="best_astro_live d-flex justify-content-center">
                  <img className="" loading="lazy" alt="" src={data?.profile_img} />
                  <MdOutlineVerified size={20} color="green" />
                </div>
                <div className="text-center">
                  <div className="astro_exprence">Exp {data?.experience}+ Yrs</div>
                  <div>
                    <h5 className="astro_name_home_crousal">
                      {data.name.substring(0, 12)}
                      {data.name.length > 12 && "..."}
                    </h5>
                  </div>
                  {data?.language.map((row, index) => (
                    <span className="astro_language" key={index}>
                      {row?.name + ","}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </OwlCarousel>
        ) : (
          <div className="d-flex mb-5">
            <ListSkeleton listsToRender={3} />
          </div>
        )}
      </div>
      <div className="text-center mt-3 mb-4">
        <span className="view_all_btn" onClick={() => navigate("/talk-to-astrologer")}>
          View All
        </span>
      </div>
    </>
  );
};

export default OurAstrologerCrousal;
