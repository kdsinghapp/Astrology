import React, { useState, useEffect, useCallback } from "react";
import { call_initiate_api, call_initiate_status_api } from "../api/astrochat";
import { notificationHandler } from "../utils/Notification";
import Cookies from "js-cookie";
import UserLogin from "../DialogeBox/UserLogin";
import RechargePopup from "../DialogeBox/RechargePopup";
import { get_profile_api } from "../api/authapi";
import { useNavigate } from "react-router-dom";
import Chatform from "../DialogeBox/Chatform";
import Chatform1 from "../DialogeBox/Chatform1";
import { AiOutlineMessage } from "react-icons/ai";
import Chatform2 from "../DialogeBox/Chatform2";
import ChatDisconnected from "../DialogeBox/ChatDisconnected";

const Chatfunction = ({
  astroID,
  astrodata,
  type,
  profileData,
  locationData,
}) => {
  const [chatInfo, setchatInfo] = useState(false);
  const [userConnecting, setuserConnecting] = useState(false);
  const [astrodisconeted, setastrodisconeted] = useState(false);
  const [FormSubmitDetails, setFormSubmitDetails] = useState("");
  const [isloading, setisloading] = useState(false);
  const [channelID, setchannelID] = useState("");
  const [loginPopup, setloginPopup] = useState(false);
  const [rechargePopup, setrechargePopup] = useState(false);
  const [walletBalance, setwalletBalance] = useState("");
  const [getProfile, setgetProfile] = useState("");
  const [cllEndAstro, setcllEndAstro] = useState(false);
  const navigate = useNavigate();
  const userID = Cookies.get("userID");
  const auth = Cookies.get("auth");

  const get_profile = useCallback(async () => {
    if (auth === "true") {
      setisloading(true);
      try {
        const res = await get_profile_api();
        if (res.data.status) {
          setwalletBalance(res?.data?.results_web?.wallet);
          const data = res?.data?.results_web;
          setgetProfile(data);

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
    }
  }, [auth]);

  useEffect(() => {
    if (Object.keys(profileData)?.length) {
      setwalletBalance(profileData?.results_web?.wallet);
      setgetProfile(profileData?.results_web);
    }
  }, [auth, profileData]);

  const userChatInfo = () => {
    if (auth === "true" && auth) {
      return setchatInfo(true);
    }
    setloginPopup(true);
  };

  const findastroId = (chatUserDetails) => {
    if (auth === "true" && auth) {
      return callInitiate(chatUserDetails);
    }
    setloginPopup(true);
  };

  const callInitiate = async (chatUserDetails) => {
    const date = chatUserDetails?.date_m?.split("-");
    const time = chatUserDetails?.time_m?.split(":");
    const s = time[0] == "00" ? "12" : time[0];
    setisloading(true);
    const channel_id = `${userID}_${astroID}_${Date.now()}`;
    setchannelID(channel_id);

    try {
      let temp = {
        astrologer_id: astroID,
        call_type: "chat",
        channel_id: channel_id,
        kundli: JSON.stringify({
          name: chatUserDetails.name_m,
          gender: chatUserDetails.gender_m,
          place: chatUserDetails.m_birthplace,
          yy: date[0],
          mm: date[1],
          dd: date[2],
          hh_time: time[0] == "00" ? "12" : time[0],
          mm_time: time[1],
          latitude: chatUserDetails.latitude?.toString(),
          longitude: chatUserDetails.longitude?.toString(),
        }),
      };
      const res = await call_initiate_api(temp);
      if (res.data.type === "recharge") {
        setisloading(false);
        setrechargePopup(true);
        return;
      }

      if (res.data.status) {
        callInitiateStatus(channel_id, chatUserDetails, res.data.room_id);
        setuserConnecting(true);
      }
      notificationHandler({ type: "success", msg: res.data.message });
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  const callInitiateStatus = async (id, chatUserDetails, room) => {
    let temp = {
      channel_id: id,
    };
    try {
      const res = await call_initiate_status_api(temp);
      let interval;
      if (res.data.results.status === "initiate") {
        setTimeout(() => {
          callInitiateStatus(id, chatUserDetails, room);
        }, 2000);
        return;
      }
      if (res.data.results.status === "reject_astro") {
        setuserConnecting(false);
        setTimeout(() => {
          setcllEndAstro(true);
        }, 4000);
        return;
      }
      if (res.data.results.status === "disconnect_user") {
        // alert("Disconnect");
        setastrodisconeted(true);
        return;
      }
      if (res.data.results.status === "accept_astro") {
        localStorage.removeItem("timerHours");
        localStorage.removeItem("timerMinutes");
        localStorage.removeItem("timerSeconds");
        localStorage.setItem("firstMsg", true);
        setuserConnecting(false);
        navigate("/chat", {
          state: {
            currentUser: {
              id: getProfile.id,
              name: getProfile.name,
              profile_img: getProfile.profile_img,
            },
            astroUser: {
              id: astrodata.id,
              name: astrodata.name,
              profile_img: astrodata.profile_img,
            },
            channelId: id,
            roomId: room,
            userFirstMsg: chatUserDetails,
          },
        });

        return;
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  function chatFormSubmit(data) {
    setFormSubmitDetails({ ...data });
    setchatInfo(false);
    findastroId({ ...data });
  }

  function astrostatus(data) {
    // setastrodisconeted(true);
  }
  // function dd(data) {
  //   // callInitiate(FormSubmitDetails);
  // }

  const dd = (data) => {
    callInitiate(FormSubmitDetails);
  };

  return (
    <>
      <div>
        <div>
          {type === "profile" ? (
            <button
              className="btn_chat_profile online-status"
              onClick={() => {
                userChatInfo();
              }}
            >
              <div>
                <AiOutlineMessage /> Chat Now
              </div>
              <div className="card_bottom">
                {astrodata.price_off > 0 ? (
                  <div style={{ fontWeight: "500" }}>
                    <span
                      style={{
                        textDecoration: "line-through",
                        color: "gray",
                      }}
                    >
                      {astrodata.currency === "INR" ? "₹" : "$"}
                      {astrodata?.per_min_chat?.toFixed(2)}/min
                    </span>
                    {astrodata.offer === "true" &&
                    astrodata.eligible_offer === "true" ? (
                      <> only {astrodata.currency === "INR" ? "₹" : "$"}1 /-</>
                    ) : (
                      <>
                        {" "}
                        {astrodata.currency === "INR" ? "₹" : "$"}
                        {(
                          astrodata?.per_min_chat -
                          (astrodata?.per_min_chat * astrodata?.price_off) / 100
                        )?.toFixed(2)}
                        /min{" "}
                      </>
                    )}{" "}
                  </div>
                ) : (
                  <div style={{ fontWeight: "500" }}>
                    {astrodata.offer === "true" &&
                    astrodata.eligible_offer === "true" ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "gray",
                          }}
                        >
                          {astrodata.currency === "INR" ? "₹" : "$"}
                          {astrodata?.per_min_chat?.toFixed(2)}/min
                        </span>{" "}
                        only {astrodata.currency === "INR" ? "₹" : "$"}1 /-
                      </>
                    ) : (
                      <>
                        {astrodata.currency === "INR" ? "₹" : "$"}
                        {astrodata?.per_min_chat?.toFixed(2)}/min
                      </>
                    )}
                  </div>
                )}
              </div>
            </button>
          ) : (
            ""
          )}

          {type === "chat" ? (
            <button
              className="btn_chat online-status"
              onClick={() => userChatInfo()}
            >
              <span>
                <AiOutlineMessage /> Chat
              </span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <Chatform
        open={chatInfo}
        close={() => setchatInfo(!chatInfo)}
        getProfile={getProfile}
        onSubmit={chatFormSubmit}
        profileData={profileData}
        locationData={locationData}
      />

      <Chatform1
        open={userConnecting}
        close={() => setuserConnecting(!userConnecting)}
        channal={channelID}
        onsubmit={astrostatus}
      />

      <UserLogin
        open={loginPopup}
        close={() => setloginPopup(!loginPopup)}
      />

      <RechargePopup
        open={rechargePopup}
        close={() => setrechargePopup(!rechargePopup)}
        astroUser={astrodata}
        walletBalance={walletBalance}
        price={astrodata.per_min_chat}
      />

      <Chatform2
        open={cllEndAstro}
        channal={channelID}
        close={() => setcllEndAstro(!cllEndAstro)}
      />
      <ChatDisconnected
        open={astrodisconeted}
        close={() => setastrodisconeted(!astrodisconeted)}
        onsubmit={dd}
      />
    </>
  );
};

export default Chatfunction;
