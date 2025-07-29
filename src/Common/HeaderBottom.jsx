import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header/Header.css";

const HeaderBottom = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <div className="content_padding-header">
          <nav className="navbar navbar-expand-lg ">
            <div className="container-fluid">
              <div className="navbar-brand" href="#">
                <NavLink className="nav-NavLink" to="/">
                  <img src="images/unnamed.png" alt="" className="img-fluid" />
                </NavLink>
              </div>
              <div className="collapse navbar-collapse  justify-content-between align-items-center" id="collapsibleNavbar">
                <ul className="navbar-nav  nav_class  w-100 " style={{ justifyContent: "space-between" }}>
                  <li className="nav-item dropdown backcolor">
                    <NavLink className={`${window.location.pathname == "/" ? "dropdown-item active" : "dropdown-item"}`} to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className={`${window.location.pathname == "/chat-with-astrologer" ? "dropdown-item active" : "dropdown-item"}`}
                      to="/chat-with-astrologer"
                    >
                      Chat with Astrologer
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className={`${window.location.pathname == "/talk-to-astrologer" ? "dropdown-item active" : "dropdown-item"}`}
                      to="/talk-to-astrologer"
                    >
                      Talk to Astrologer
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown">
                    <NavLink
                      className={`${window.location.pathname == "/free-kundli-online" ? "dropdown-item active" : "dropdown-item"}`}
                      to="/free-kundli-online"
                    >
                      {" "}
                      Free Kundli
                    </NavLink>
                  </li>
                  <li className="nav-item dropdown" onClick={() => navigate("/horoscope/todays-horoscope/aries", { state: "todays-horoscope/aries" })}>
                    <NavLink
                      className={`${window.location.pathname === "/horoscope/todays-horoscope/aries" ? "dropdown-item active" : "dropdown-item"}`}
                      to="/horoscope/todays-horoscope/aries"
                    >
                      Horoscopes
                    </NavLink>
                  </li>

                  <li className="nav-item dropdown">
                    <NavLink
                      className={`${window.location.pathname == "/free-kundali-matching" ? "dropdown-item active" : "dropdown-item"}`}
                      to="/free-kundali-matching"
                    >
                      Kundli Matching
                    </NavLink>
                  </li>

                  <li className="nav-item dropdown moreNavBtn">
                    <div className={`${window.location.pathname == "#" ? "dropdown-item active" : "dropdown-item"}`}>More ￬</div>
                    <ul className="moreNavList">
                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "/astroshop" ? "dropdown-item active" : "dropdown-item"}`}
                          to="/astroshop"
                          style={{ margin: "4px 0px" }}
                        >
                          Astroshop
                        </NavLink>
                      </li>

                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "free-numerology-online" ? "dropdown-item active" : "dropdown-item"}`}
                          style={{ marginTop: "0px" }}
                          to="/free-numerology-online"
                        >
                          Numerology
                        </NavLink>
                      </li>

                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "free-Panchang-online" ? "dropdown-item active" : "dropdown-item"}`}
                          to="/free-Panchang-online"
                          style={{ margin: "4px 0px" }}
                        >
                          Panchang
                        </NavLink>
                      </li>
                      <li className="nav-item dropdown">
                        <NavLink
                          className={`${window.location.pathname == "/blog" ? "dropdown-item active" : "dropdown-item"}`}
                          to="/blog"
                          style={{ margin: "4px 0px" }}
                        >
                          Blog
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default HeaderBottom;
