import React, { useState, useContext, useEffect } from "react";
// import AppBar from "@material-ui/core/AppBar";
// import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
// import { Badge } from "@material-ui/core";
// import Toolbar from "@material-ui/core/Toolbar";
import { useNavigate } from "react-router-dom";
import logo from "../../images/astropushlogo.png";
import { BiDollar, BiRupee } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgLogIn } from "react-icons/cg";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosNotifications, IoLogoWhatsapp } from "react-icons/io";
import { UserContext } from "../../App";
import "./Header.css";
import UserLogin from "../../Components/DialogeBox/UserLogin";
import support from "../../images/Icons/support_image.png";
import Cookies from "js-cookie";
import Avatar from "@mui/material/Avatar";
import { IoWalletOutline, IoWalletSharp } from "react-icons/io5";
import { getLastCallStatus } from "../../Components/api/authapi";
import location_api from "../../Components/api/location";
import CanonicalTag from "../../Common/CanonicalTag";
// firebase
import { requestForFCMToken } from "../../firebase";
import { AppBar, Badge, Toolbar } from "@mui/material";

const Header = () => {
  const [Sidebar, setSidebar] = useState(false);
  const [Loginpopup, setLoginpopup] = useState(false);
  const navigate = useNavigate();
  const { state } = useContext(UserContext);
  const currency = Cookies.get("country");
  const [lastCallStatus, setLastCallStatus] = useState(null);

  useEffect(() => {
    // google analytics code here
    const scriptEl1 = document.createElement("script");
    scriptEl1.type = "text/javascript";
    scriptEl1.async = true;
    scriptEl1.src = "https://www.googletagmanager.com/gtag/js?id=G-HC5Y4849VK";
    document.body.appendChild(scriptEl1);

    const scriptEl2 = document.createElement("script");
    scriptEl2.type = "text/javascript";
    scriptEl2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag() {
           dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-HC5Y4849VK");`;
    document.body.appendChild(scriptEl2);

    const scriptEl3 = document.createElement("script");
    scriptEl3.type = "text/javascript";
    scriptEl3.innerHTML = `
      (function (c, l, a, r, i, t, y) {
        c[a] =
          c[a] ||
          function () {
            (c[a].q = c[a].q || []).push(arguments);
          };
        t = l.createElement(r);
        t.async = 1;
        t.src = "https://www.clarity.ms/tag/" + i;
        y = l.getElementsByTagName(r)[0];
        y.parentNode.insertBefore(t, y);
             })(window, document, "clarity", "script", "fd29s0h3zn");  
  `;
    document.body.appendChild(scriptEl3);
  }, []);

  const data = state?.results_web?.profile_img ?? "";
  const auth = Cookies.get("auth");

  const loadLastCallStatus = async () => {
    try {
      const resp = await getLastCallStatus();
      setLastCallStatus(resp.data?.data2);
    } catch (error) {
      console.error("err", error);
    }
  };

  useEffect(() => {
    if (auth === "true") {
      loadLastCallStatus();
    }
  }, [auth]);

  const setLoadingnewside = () => {
    document.getElementById("mySidenav").style.width = "250px";
    setSidebar(true);
  };

  /*function to close a sidebar */
  const Closesidebar = () => {
    document.getElementById("mySidenav").style.width = "0px";
    setSidebar(false);
  };

  const logindialogbox = () => {
    setLoginpopup(!Loginpopup);
  };

  const logoutfunction = () => {
    localStorage.removeItem("userphoto");
    Cookies.remove("auth");
    Cookies.remove("token");
    Cookies.remove("country");
    Cookies.remove("fcmToken");
    user_location_api();
    getFCMToken();
    navigate("/");
  };

  const getFCMToken = async () => {
    try {
      const resp = await requestForFCMToken();
      if (resp) {
        Cookies.set("fcmToken", resp);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    } catch (error) {
      console.error("An error occurred while retrieving token. ", error);
    }
  };

  const user_location_api = async () => {
    const res = await location_api();
    const country = res.data.country;
    if (country === "IN") {
      Cookies.set(
        "country",
        "INR",
        { secure: true },
        { sameSite: "strict" },
        { expires: 365 }
      );
    } else {
      Cookies.set(
        "country",
        "USD",
        { secure: true },
        { sameSite: "strict" },
        { expires: 365 }
      );
    }
  };

  const goToExistingChat = () => {
    navigate("/chat", {
      state: {
        currentUser: {
          id: state.results_web.id,
          name: state.results_web.name,
          profile_img: state.results_web.profile_img,
        },
        astroUser: {
          id: lastCallStatus.astro_id,
          name: lastCallStatus.astro_name,
          profile_img: lastCallStatus.astro_profile_img,
        },
        channelId: lastCallStatus.channel_id,
        roomId: lastCallStatus.room_id,
        userFirstMsg: null,
      },
    });
  };

  return (
    <>
      <CanonicalTag />
      <div className="topheader">
        <AppBar
          position="fixed"
          className="MainHeader"
        >
          <Toolbar className="header_padding">
            <div
              className="header_link_color"
              onClick={() => navigate("/")}
            >
              <img
                src={logo}
                alt=""
                className="header_logo"
              />
            </div>
            <div className="header_grow" />
            <div
              className=""
              style={{ width: "60%" }}
            >
              <div className="header_links">
                {lastCallStatus?.status === "accept_astro" && (
                  <span
                    className="text-dark"
                    style={{ cursor: "pointer" }}
                    onClick={() => goToExistingChat()}
                  >
                    Ongoing Chat
                  </span>
                )}
                <span className="header_link_color ">
                  <span
                    className="d-flex"
                    style={{ gap: "0.2rem" }}
                  >
                    <span>
                      <a
                        style={{ color: "rgb(37,211,102)" }}
                        href="https://api.whatsapp.com/send/?phone=7710026371&text&type=phone_number&app_absent=0"
                        target="_blank"
                      >
                        <IoLogoWhatsapp size={26} />
                      </a>
                    </span>
                    <span>
                      <a
                        style={{
                          color: "#000",
                          fontSize: "17px",
                          textDecoration: "none",
                        }}
                        href="https://api.whatsapp.com/send/?phone=7710026371&text&type=phone_number&app_absent=0"
                        target="_blank"
                      >
                        Chat Support
                      </a>
                    </span>
                  </span>
                </span>
                {auth === "true" ? (
                  <span className="header_link_color header_fontSize">
                    <span onClick={() => navigate("/add_wallet")}>
                      {currency === "INR" ? (
                        <span className="header_currency">
                          <IoWalletSharp size={23} />
                          <span style={{ fontSize: "16px" }}> Wallet:</span>
                          <span>
                            <BiRupee size={18} />
                            {state?.wallet?.toFixed(2)}
                          </span>
                        </span>
                      ) : (
                        <span className="header_currency">
                          <IoWalletSharp size={23} /> Wallet:
                          <BiDollar size={18} />
                          {state?.wallet?.toFixed(2)}
                        </span>
                      )}
                    </span>
                  </span>
                ) : (
                  ""
                )}
                {auth === "true" ? (
                  <span
                    className="header_link_color header_fontSize"
                    onClick={() => navigate("/notify")}
                    style={{ paddingLeft: "7px" }}
                  >
                    {state?.notification === "0" ? (
                      <Badge
                        style={{ fontSize: "1.5rem", marginTop: "-0.3rem" }}
                        color="primary"
                        overlap="rectangular"
                      >
                        <IoIosNotifications />
                      </Badge>
                    ) : (
                      <Badge
                        badgeContent={state?.notification}
                        style={{ fontSize: "1.5rem", marginTop: "-0.3rem" }}
                        color="primary"
                        overlap="rectangular"
                      >
                        <IoIosNotifications size={28} />
                      </Badge>
                    )}
                  </span>
                ) : (
                  ""
                )}
                {auth === "true" ? (
                  <span
                    className="header_link_color header_fontSize"
                    onClick={() => navigate("/astroshop")}
                    style={{ paddingLeft: 0 }}
                  >
                    <Badge
                      // badgeContent={state?.cartItemsLength}
                      style={{ fontSize: "1.5rem", marginTop: "-0.3rem" }}
                      color="primary"
                      overlap="rectangular"
                    >
                      <AiOutlineShoppingCart />
                    </Badge>
                  </span>
                ) : (
                  ""
                )}
                {auth === "true" ? (
                  <span className="">
                    <div className="dropdown">
                      <div className="">
                        {data === "" ? (
                          <Avatar
                            alt="img"
                            src=""
                            style={{ height: "32px", width: "32px" }}
                          />
                        ) : (
                          <img
                            src={data}
                            style={{
                              height: "40px",
                              width: "40px",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                            alt="img"
                          />
                        )}
                      </div>

                      <div className="dropdown-content menu_hover">
                        <a
                          className="submenu"
                          onClick={() => navigate("/userprofile")}
                        >
                          My Profile
                        </a>

                        <a
                          className="submenu"
                          onClick={() => navigate("/transactions")}
                        >
                          Order History
                        </a>

                        <a
                          className="submenu"
                          onClick={() => navigate("/add_wallet")}
                        >
                          My Wallet{" "}
                          {currency === "INR" ? (
                            <BiRupee size={18} />
                          ) : (
                            <BiDollar size={18} />
                          )}
                          {state?.wallet?.toFixed(2)}
                        </a>

                        {/* <a
                          className="submenu"
                          onClick={() => navigate("/OrderDetails")}
                        >
                          My Orders
                        </a>

                        <a
                          className="submenu"
                          onClick={() => navigate("/wishlist")}
                        >
                          WishList
                        </a> */}
                        <a
                          className="submenu"
                          onClick={() => logoutfunction()}
                        >
                          Logout
                        </a>
                      </div>
                    </div>
                  </span>
                ) : (
                  <span
                    className="header_link_color header_fontSize header_login_btn"
                    onClick={logindialogbox}
                  >
                    <i
                      className="fa fa-user mr-1"
                      style={{ color: "#fff", fontSize: "26px" }}
                      aria-hidden="true"
                    ></i>
                    Login
                  </span>
                )}
              </div>
            </div>

            <div className="mobile_Burger_Menu">
              <span
                className="d-flex"
                style={{
                  marginInline: "auto",
                  alignItems: "baseline",
                  gap: "1rem",
                }}
              >
                <span className="icons-color logout_Pointer_cursor subbort_img  text-right mt-1">
                  <a
                    className=""
                    href="https://api.whatsapp.com/send/?phone=7710026371&text&type=phone_number&app_absent=0"
                    target="_blank"
                    style={{ color: "rgb(37,211,102)" }}
                  >
                    <IoLogoWhatsapp size={23} />
                  </a>
                </span>

                <span className="logout_Pointer_cursor subbort_img  text-right mt-1">
                  {auth === "true" ? (
                    <span className="icons-color">
                      <IoWalletOutline
                        size={23}
                        onClick={() => navigate("/add_wallet")}
                      />
                    </span>
                  ) : (
                    <span className="icons-color">
                      <IoWalletOutline
                        size={23}
                        onClick={logindialogbox}
                      />
                    </span>
                  )}
                </span>
                <span className="logout_Pointer_cursor subbort_img  text-right mt-1">
                  {auth === "true" ? (
                    <span className="">
                      <div className="">
                        {data === "" ? (
                          <i
                            className="fa fa-user-circle-o"
                            style={{
                              color: "#000",
                              height: "30px",
                              width: "30px",
                            }}
                            aria-hidden="true"
                          ></i>
                        ) : (
                          <>
                            <div className="dropdown">
                              <img
                                src={data}
                                style={{
                                  height: "30px",
                                  width: "30px",
                                  borderRadius: "50%",
                                }}
                                alt="img"
                              />

                              <div
                                className="dropdown-content dropdown-content_mobile menu_hover"
                                style={{ textAlign: "left" }}
                              >
                                <a
                                  className=""
                                  onClick={() => navigate("/userprofile")}
                                >
                                  My Profile
                                </a>
                                <a
                                  className="submenu"
                                  onClick={() => navigate("/transactions")}
                                >
                                  Order History
                                </a>

                                <a
                                  className="submenu"
                                  onClick={() => navigate("/add_wallet")}
                                >
                                  My Wallet
                                </a>
                                <a
                                  className="submenu"
                                  onClick={() => logoutfunction()}
                                >
                                  Logout
                                </a>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </span>
                  ) : (
                    <span
                      className="icons-color"
                      onClick={logindialogbox}
                    >
                      <CgLogIn size={23} />
                    </span>
                  )}
                </span>
              </span>
              <span
                className="logout_Pointer_cursor hamburg_left  mr-3 text-right mt-2"
                onClick={!Sidebar ? setLoadingnewside : Closesidebar}
              >
                {/* <i className="fa fa-bars"></i> */}
                <GiHamburgerMenu size={23} />
              </span>

              <div
                id="mySidenav"
                className="sidenav"
              >
                <div className="d-flex justify-content-between px-3 my-2">
                  <div>
                    {auth === "true" ? (
                      <span
                        className=""
                        style={{ padding: "0px" }}
                      >
                        <div className="dropdown">
                          <div className="">
                            {data === "" ? (
                              <i
                                className="fa fa-user-circle-o"
                                style={{ color: "#000", fontSize: "26px" }}
                                aria-hidden="true"
                              ></i>
                            ) : (
                              <div>
                                <img
                                  src={data}
                                  style={{
                                    height: "60px",
                                    width: "60px",
                                    borderRadius: "50%",
                                    margin: "auto",
                                  }}
                                  alt="img"
                                />
                              </div>
                            )}
                          </div>

                          <div className="dropdown-content_sidebar">
                            <a
                              className="profile_pic_color_res"
                              onClick={() => navigate("/userprofile")}
                            >
                              Profile
                            </a>
                            <a
                              className="profile_pic_color_res"
                              onClick={() => navigate("/transactions")}
                            >
                              Transaction History
                            </a>

                            <a
                              className="submenu profile_pic_color_res"
                              onClick={() => navigate("/add_wallet")}
                            >
                              Wallet Recharge
                            </a>
                            {/* <a
                          className="submenu"
                          onClick={() => navigate("/OrderDetails")}
                        >
                          My Orders
                        </a> */}
                            {/* <a
                          className="submenu"
                          onClick={() => navigate("/wishlist")}
                        >
                          WishList
                        </a> */}
                            <a
                              className="submenu profile_pic_color_res"
                              onClick={() => logoutfunction()}
                            >
                              Logout
                            </a>
                          </div>
                        </div>
                      </span>
                    ) : (
                      <span
                        className=""
                        style={{ padding: "0px" }}
                        onClick={logindialogbox}
                      >
                        <Avatar
                          alt="img"
                          src=""
                        />
                      </span>
                    )}
                  </div>
                  <div className="cross_icon_style">
                    <i
                      className="fa fa-times cursor"
                      onClick={() => {
                        document.getElementById("mySidenav").style.width =
                          "0px";
                        setSidebar(false);
                      }}
                    ></i>
                  </div>
                </div>

                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/")}
                >
                  Home
                </span>
                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/chat-with-astrologer")}
                >
                  Chat With Astrologers
                </span>
                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/talk-to-astrologer")}
                >
                  Talk to Astrologer
                </span>
                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/free-kundli-online")}
                >
                  Free Kundli
                </span>
                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/horoscope/todays-horoscope/aries")}
                >
                  Horoscopes
                </span>
                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/free-kundali-matching")}
                >
                  Kundli Matching
                </span>
                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/live_astrologer ")}
                >
                  Live Events
                </span>

                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/astroshop")}
                >
                  Astroshop
                </span>

                {/* <span className="logout_Pointer_cursor sidebar_box_style">
                  <a href="https://api.whatsapp.com/send/?phone=7710026371&text&type=phone_number&app_absent=0" target="_blank" style={{ color: "#000" }}>
                    Live support
                  </a>
                </span> */}
                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/free-numerology-online")}
                >
                  Numerology
                </span>

                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/free-Panchang-online")}
                >
                  Today Panchang
                </span>

                <span
                  className="logout_Pointer_cursor sidebar_box_style"
                  onClick={() => navigate("/blog")}
                >
                  Blog
                </span>

                {/* {auth === "true" ? (
                  <span
                    className="logout_Pointer_cursor sidebar_box_style"
                    onClick={() => navigate("/cart")}
                  >
                    Cart Items
                  </span>
                ) : (
                  ""
                )} */}

                {auth === "true" ? (
                  <span
                    className="logout_Pointer_cursor sidebar_box_style"
                    onClick={() => logoutfunction()}
                  >
                    Logout
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      <UserLogin
        open={Loginpopup}
        close={() => logindialogbox()}
      />
    </>
  );
};

export default Header;
