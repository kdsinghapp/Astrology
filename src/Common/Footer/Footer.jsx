import React, { useCallback, useState } from "react";
import footerLogo from "../../images/footer_logo_two.png";
import playstore from "../../images/playstore.png";
import ios from "../../images/ios.png";
import "./Footer.css";
import { useNavigate } from "react-router-dom";

import facebookIcon from "../../images/Icons/facebook.png";
import whatsAppIcon from "../../images/Icons/whatsapp.png";
import instagramIcon from "../../images/Icons/instagram.png";
import twitterIcon from "../../images/Icons/twit.png";
import quoraIcon from "../../images/Icons/quora.png";
import youtubeIcon from "../../images/Icons/youtube.png";

import {
  Footer_Astrologers,
  Footer_Important_Links_1,
  Footer_Important_Links_2,
  Footer_Services,
} from "./FooterData";
import { Grid } from "@mui/material";
function Footer(props) {
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    console.log("login result", response);
  };
  const componentClicked = (response) => {
    console.log(response);
  };

  //second login
  const [provider, setProvider] = useState("");
  const [profile, setProfile] = useState("");
  const REDIRECT_URI = "https://astropush.com/";

  const onLoginStart = useCallback(() => {
    alert("login start");
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider("");
    alert("logout success");
  }, []);

  const onLogout = useCallback(() => {}, []);

  const AppLinks = ({ MobileVisible, DesktopVisible }) => {
    return (
      <Grid
        className={`Component_main_grid ${
          MobileVisible
            ? "apps__icons__grid_mobile"
            : "apps__icons__grid__desktop mt-3"
        }`}
      >
        <Grid item lg={6} md={12} sm={6} xs={6}>
          <div className="Footer_heading">
            <h4> User App</h4>
          </div>
          <div className="">
            <a
              href="https://play.google.com/store/apps/details?id=com.user.astropush"
              target="_blank"
            >
              <img src={playstore} className="footer_social_logo" />
            </a>
          </div>
          <div className="mt-2">
            <img src={ios} className="footer_social_logo" />
          </div>
        </Grid>
        <Grid item lg={6} md={12} sm={6} xs={6}>
          <div className="Footer_heading">
            <h4> Astrologer App</h4>
          </div>
          <div className="" style={{ cursor: "pointer" }}>
            <a
              href="https://play.google.com/store/apps/details?id=com.astrologer.astropush"
              target="_blank"
            >
              <img src={playstore} className="footer_social_logo" />
            </a>
          </div>
          <div className="mt-2">
            <img src={ios} className="footer_social_logo" />
          </div>
        </Grid>
      </Grid>
    );
  };
  return (
    <>
      <section className="footer-top  pb-4">
        <div className="container-fluid footer-padding">
          <div className="mt-2 p-3">
            {/* <h4>Lorem, ipsum.</h4> */}
            <div className="header_link_color_footer_logo">
              <img src={footerLogo} className="header_logo_footer" />
            </div>
            <span className="footer_logo_description">
              AstroPush is an online astrology website started with an aim to
              help everyone push their worries out of their life through
              predictions from a group of certified and well-known Astrologers
              in their respective fields around the world.
            </span>
          </div>
          <Grid
            className="Component_main_grid mt-2 p-3"
            style={{ fontWeight: "normal" }}
          >
            <Grid item md={3} sm={6} xs={6}>
              <div className="Footer_heading">
                <h4> Services</h4>
              </div>
              {Footer_Services.map((item) => (
                <div
                  className="Footer_heading_Links"
                  onClick={() => navigate(item.route)}
                  key={item.id}
                >
                  {item.name}
                </div>
              ))}
              <div
                className="Footer_heading_Links"
                onClick={() =>
                  navigate("/horoscope/todays-horoscope/aries", {
                    state: "todays-horoscope/aries",
                  })
                }
              >
                Daily Horoscopes
              </div>
            </Grid>
            <Grid item md={3} sm={6} xs={6}>
              <div className="Footer_heading">
                <h4>Important Links</h4>
              </div>

              {Footer_Important_Links_1.map((items) => (
                <div
                  className="Footer_heading_Links"
                  onClick={() => navigate(items.route)}
                  key={items.id}
                >
                  {items.name}
                </div>
              ))}
              <div className="Footer_heading">
                <h4>Astrologer</h4>
              </div>
              {Footer_Astrologers.map((items) => (
                <div
                  className="Footer_heading_Links"
                  onClick={() => navigate(items.route)}
                  key={items.id}
                >
                  {items.name}
                </div>
              ))}
            </Grid>

            <Grid item md={3} sm={6} xs={6}>
              <div className="Footer_heading">
                <h4>Important Links</h4>
              </div>
              {Footer_Important_Links_2.map((items) => (
                <div
                  className="Footer_heading_Links"
                  onClick={() => navigate(items.route)}
                  key={items.id}
                >
                  {items.name}
                </div>
              ))}
            </Grid>

            <Grid item md={3} sm={6} xs={6}>
              <div>
                {/* <img
                src={headerlogo}
                alt=""
                className="Footer_logo"
                onClick={() => props.history.push("/")}
              /> */}
              </div>
              <div>
                <h4
                  className="Footer_heading ml-1"
                  onClick={() => props.history.push("#")}
                >
                  Contact us
                </h4>
              </div>
              <div className="footer__social_icons__container my-2">
                <a
                  target="_blank"
                  href="https://www.facebook.com/AstroPush"
                  rel="noopener noreferrer"
                >
                  <div className="d-flex mt-1">
                    <img
                      className="footer__socail__icons"
                      src={facebookIcon}
                      alt="facebook"
                    />
                  </div>
                </a>
                <a
                  target="_blank"
                  href="https://twitter.com/astropush"
                  rel="noopener noreferrer"
                >
                  <div className="d-flex mt-1">
                    <img
                      className="footer__socail__icons"
                      src={twitterIcon}
                      alt="twitter"
                    />
                  </div>
                </a>
                <a
                  target="_blank"
                  href="https://youtube.com/@astropush"
                  rel="noopener noreferrer"
                >
                  <div className="d-flex mt-1">
                    <img
                      className="footer__socail__icons"
                      src={youtubeIcon}
                      alt="youtube"
                    />
                  </div>
                </a>
                <a
                  target="_blank"
                  href="https://api.whatsapp.com/send/?phone=7710026371&text&type=phone_number&app_absent=0"
                  rel="noopener noreferrer"
                >
                  <div className="d-flex mt-1">
                    <img
                      className="footer__socail__icons"
                      src={whatsAppIcon}
                      alt="whatsapp"
                    />
                  </div>
                </a>
                <a
                  target="_blank"
                  href="https://www.instagram.com/astropush"
                  rel="noopener noreferrer"
                >
                  <div className="d-flex mt-1">
                    <img
                      className="footer__socail__icons"
                      src={instagramIcon}
                      alt="instagram"
                    />
                  </div>
                </a>
                <a
                  target="_blank"
                  href="https://astropush.quora.com/"
                  rel="noopener noreferrer"
                >
                  <div className="d-flex mt-1">
                    <img
                      className="footer__socail__icons"
                      src={quoraIcon}
                      alt="quora"
                    />
                  </div>
                </a>
              </div>
              <AppLinks DesktopVisible={true} MobileVisible={false} />
              {/* <FacebookLogin appId="560174811925651" autoLoad={true} fields="name,email,picture" onClick={componentClicked} callback={responseFacebook} />,
              <FacebookLogin appId="3558990347713048" autoLoad={true} fields="name,email,picture" onClick={componentClicked} callback={responseFacebook} />, */}
              {/* <a target="_blank" href="https://astropush.quora.com/">
                <div className="d-flex mt-1">
                  <img
                    className="allicons_footer_image_size_quora"
                    src={quora}
                  />
                  <span className="Footer_heading_Links ml-1">Quora</span>
                </div>
              </a> */}
              <div className="mt-3">
                {/* <div className="input">
                  <input
                    type="text"
                    className="button"
                    id="email"
                    name="email"
                    placeholder="NAME@EXAMPLE.COM"
                  />
                  <input
                    type="submit"
                    className="button"
                    id="submit"
                    value="SIGN UP"
                  />
                </div> */}
              </div>
            </Grid>
            <AppLinks DesktopVisible={false} MobileVisible={true} />
          </Grid>
        </div>
      </section>
      <div className="">
        <div className="Footer_heading_link_color text-center pt-3 pb-3">
          Copyright © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>
      {/* <LoginSocialFacebook
        appId="560174811925651"
        fieldsProfile={"id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"}
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }) => {
          console.log(">>>>>", provider, data);
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>

      <LoginSocialFacebook
        appId="3558990347713048"
        fieldsProfile={"id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"}
        onLoginStart={onLoginStart}
        onLogoutSuccess={onLogoutSuccess}
        redirect_uri={REDIRECT_URI}
        onResolve={({ provider, data }) => {
          console.log(">>>>>", provider, data);
          setProvider(provider);
          setProfile(data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook> */}
    </>
  );
}

export default Footer;
