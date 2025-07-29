import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdOutlineArrowBack } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import Cookies from "js-cookie";
import moment from "moment";
// import {
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   DialogContent,
// } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { getBaseUrl } from "../utils";
import UserRating from "../DialogeBox/UserRating";
// import TimerApp from "./TimerApp";
import personImg from "./../../images/person-dummy.jpg";
import "./UserChat.css";

const MSG_STATUS = {
  Sent: "✓",
  Deliver: "✓✓",
  Seen: "✓✓",
};

function calculateRemainingTime(givenTime) {
  const currentTime = new Date();
  const timeDifferenceInMilliseconds = currentTime - givenTime;
  const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (timeDifferenceInMilliseconds % (1000 * 60)) / 1000
  );
  const formattedTime = `${hours > 0 ? hours + ":" : ""}${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
  return formattedTime;
}

const UserChat = ({ socket }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, astroUser, roomId, channelId, userFirstMsg } =
    location.state ?? {};
  const [isAccess, setIsAccess] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [hasMore, setHasMore] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const typingTimeout = useRef(null);
  const messageRefs = useRef([]);

  const [rating, setRating] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [astroChatEnded, setAstroChatEnded] = useState(false);

  // const [hours, setHours] = useState(0);
  // const [minutes, setMinutes] = useState(0);
  // const [seconds, setSeconds] = useState(0);

  const [remainingTime, setRemainingTime] = useState(0);
  const [givenTime, setGivenTime] = useState();

  const token = Cookies.get("token");

  const USER = "user";

  useEffect(() => {
    const { currentUser, astroUser, roomId, channelId } = location.state ?? {};
    if (!currentUser || !astroUser || !roomId || !channelId) {
      navigate(-1);
    } else {
      setIsAccess(true);
    }
  }, [navigate, location.state]);

  useEffect(() => {
    socket.emit("join", roomId);
    return () => {
      socket.disconnect();
      socket.off();
      socket.close();
    };
  }, [socket, roomId]);

  const getFirstMsg = useCallback(async () => {
    const currentMessage =
      userFirstMsg &&
      `Name: ${userFirstMsg?.name_m}, D.O.B: ${
        userFirstMsg?.date_m
          ? moment(userFirstMsg?.date_m).format("DD/MM/YYYY")
          : "__/__/____"
      }, Time: ${
        userFirstMsg?.time_m
          ? moment(userFirstMsg?.time_m, "HH:mm:ss").format("hh:mm:ss A")
          : "--/--/--"
      }, Place of Birth: ${
        userFirstMsg?.m_birthplace ? userFirstMsg?.m_birthplace : "_______"
      }`;
    const send_by = USER;
    const messageData = {
      sender_id: currentUser.id,
      senderNickname: currentUser.name,
      messageContent: currentMessage,
      receiver_id: astroUser.id,
      Room_id: roomId,
      channel: channelId,
      send_by,
      status: "Sent",
      Created_date: moment(),
    };
    await socket.emit(
      "messagedetection",
      currentUser.name,
      currentMessage,
      currentUser.id,
      astroUser.id,
      roomId,
      channelId,
      send_by
    );
    setMessageList((list) => [messageData, ...list]);
    scrollToBottom();
    localStorage.removeItem("firstMsg");
  }, [
    userFirstMsg,
    astroUser?.id,
    channelId,
    currentUser?.id,
    currentUser?.name,
    roomId,
    socket,
  ]);

  useEffect(() => {
    if (localStorage.getItem("firstMsg")) {
      getFirstMsg();
    }
  }, [getFirstMsg]);

  useEffect(() => {
    socket.on("user_offline", (user) => {
      setIsOnline(!user);
    });
    socket.on("message", (message) => {
      setMessageList((list) => {
        const existingMessage = list.find(
          (msg) => msg.message_id === message.message_id
        );
        return existingMessage
          ? list
          : [{ ...message, Created_date: moment() }, ...list];
      });
      socket.emit("markDelever", roomId, message.message_id, true);
    });

    socket.on("display", (data) => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      typingTimeout.current = setTimeout(() => {
        setIsTyping(false);
      }, 500);
      setIsTyping(true);
    });

    socket.on("sendDelever", (data) => {
      setMessageList((list) => {
        const updatedList = list.map((message, index) => {
          if (index === list.length - 1) {
            return {
              ...message,
              status: "Deliver",
            };
          }
          return message;
        });
        return updatedList;
      });
    });

    socket.on("sendSeen", (data) => {
      setMessageList((list) => {
        const updatedList = list.map((message) => ({
          ...message,
          status: "Seen",
        }));
        return updatedList;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, roomId]);

  useEffect(() => {
    const options = {};
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const messageId = entry.target.getAttribute("data-message-id");
        const messageToUpdate = messageList[messageId];
        if (messageToUpdate?.message_id && messageToUpdate?.status !== "Seen") {
          socket.emit("markSeen", roomId, messageToUpdate.message_id, true);
        }
      });
    }, options);
    messageRefs.current?.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
    return () => {
      observer.disconnect();
    };
  }, [socket, roomId, messageList]);

  const fetchUserMessage = useCallback(async () => {
    const url = getBaseUrl() + "user_api/message_list";
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const payload = {
      room_id: roomId,
      channel_id: channelId,
      page: page,
      limit: limit,
    };
    setLoading(true);
    try {
      const resp = await axios.post(url, payload, config);
      const data = (resp.data.results || []).map((item) => ({
        ...item,
        sender_id: item.user_id,
        receiver_id: item.astro_id,
        messageContent: item.message,
      }));
      setMessageList((prev) => [...prev, ...data]);
      setMessageCount(resp.data.dec_data);
      setLoading(false);
    } catch (error) {
      console.error("err", error);
      setLoading(false);
    }
  }, [roomId, channelId, page, limit]);

  useEffect(() => {
    if (localStorage.getItem("firstMsg")) {
      return;
    }
    fetchUserMessage();
  }, [fetchUserMessage]);

  useEffect(() => {
    if (messageCount === messageList.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [messageCount, messageList]);

  const scrollToBottom = () => {
    const el = document.getElementById("chat-scroll");
    if (el) {
      el.scrollTop = el.scrollHeight + "20";
    }
  };

  useEffect(() => {
    if (page === 1 && messageCount) {
      scrollToBottom();
    }
  }, [page, messageCount]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const send_by = USER;
      const messageData = {
        sender_id: currentUser.id,
        senderNickname: currentUser.name,
        messageContent: currentMessage,
        receiver_id: astroUser.id,
        Room_id: roomId,
        channel: channelId,
        send_by,
        status: "Sent",
        Created_date: moment(),
      };
      await socket.emit(
        "messagedetection",
        currentUser.name,
        currentMessage,
        currentUser.id,
        astroUser.id,
        roomId,
        channelId,
        send_by
      );
      setMessageList((list) => [messageData, ...list]);
      setCurrentMessage("");
      scrollToBottom();
    }
  };

  const handleTyping = () => {
    socket.emit("typing", true);
  };

  const callInitiateStatus = useCallback(() => {
    const url = getBaseUrl() + "user_api/call_initiate_status";
    const temp = {
      channel_id: channelId,
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(url, temp, config)
      .then(
        (res) => {
          if (res.data.results?.status === "accept_astro") {
            if (!givenTime) {
              setGivenTime(new Date(res.data.results?.start_time));
            }
            setTimeout(() => {
              callInitiateStatus();
            }, 2000);
          }
          if (res.data.results?.status === "end_astro") {
            setAstroChatEnded(true);
          }
          if (res.data.results?.status === "disconnect_user") {
            setAstroChatEnded(true);
          }
        },
        (error) => {
          console.error("data response error:::", error);
        }
      )
      .catch((e) => {
        console.error("data response error:::", e);
      });
  }, [token, channelId]);

  useEffect(() => {
    callInitiateStatus();
  }, [callInitiateStatus]);

  useEffect(() => {
    if (!givenTime) {
      return;
    }
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime(givenTime));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [givenTime]);

  const chatEndddd = () => {
    const url = getBaseUrl() + "/user_api/call_status_update";
    const temp = {
      channel_id: channelId,
      status: "end_user",
    };
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(url, temp, config)
      .then(
        (res) => {
          callInitiateStatus();
          if (res.data?.status) {
            const [minutes, seconds] = remainingTime.split(":");
            if (parseInt(minutes) >= 4 && parseInt(seconds) > 0) {
              setChatEnded(false);
              setRating(true);
            } else {
              setChatEnded(false);
              navigate("/chat-with-astrologer");
              setTimeout(() => {
                window.location.reload();
              }, 100);
            }
          }
        },
        (error) => {
          console.error("data response error:::", error);
        }
      )
      .catch((e) => {
        console.error("data response error:::", e);
      });
  };

  const astrooooo = () => {
    callInitiateStatus();
    const [minutes, seconds] = remainingTime.split(":");
    if (parseInt(minutes) >= 4 && parseInt(seconds) > 0) {
      setRating(true);
    } else {
      navigate("/chat-with-astrologer");
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  };

  const cc = () => {
    setChatEnded(!chatEnded);
  };

  const ccc = () => {
    setAstroChatEnded(!astroChatEnded);
  };

  const handleEndChat = () => {
    setChatEnded(true);
  };

  if (!isAccess) {
    return null;
  }

  return (
    <>
      <div id="chat_container">
        <div className="chat_box">
          <div className="chat_header">
            <div className="chat_counter">
              <div
                className="header_icon"
                onClick={() => handleEndChat()}
              >
                <MdOutlineArrowBack />
              </div>
              <div
                className="astro_name"
                style={{ marginRight: "auto" }}
              >
                <span className="astro_profile_pic">
                  <img
                    src={astroUser?.profile_img}
                    alt="Astro"
                  />
                </span>
                {astroUser?.name} {isOnline ? "(Online)" : "(Offline)"}
              </div>
              <div
                style={{ cursor: "pointer" }}
                className="end_chat_btn"
                onClick={() => handleEndChat()}
              >
                End
              </div>
            </div>
            {remainingTime ? (
              <div className="time">{!astroChatEnded && remainingTime}</div>
            ) : (
              ""
            )}
          </div>

          <div className="chat_messages">
            <div
              id="chat-scroll"
              className="chat_container"
            >
              <div
                id="scrollableDiv"
                style={{
                  height: "100vh",
                  overflow: "auto",
                  display: "flex",
                  flexDirection: "column-reverse",
                }}
              >
                <InfiniteScroll
                  dataLength={messageList.length}
                  next={loadMore}
                  hasMore={hasMore}
                  inverse={true}
                  loader={
                    loading && <p className="text-center py-2">Loading...</p>
                  }
                  endMessage={<p className="text-center"></p>}
                  scrollableTarget="scrollableDiv"
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                >
                  {messageList.map((message, index) => {
                    const messageRef = React.createRef();
                    messageRefs.current[index] = messageRef;
                    return (
                      <div
                        key={message?.message_id ?? index}
                        ref={messageRef}
                        data-message-id={index}
                      >
                        <div
                          className={`single_msg ${
                            message.send_by === USER ? "me" : "other"
                          }`}
                        >
                          <div className="msg_text">
                            <p>{message.messageContent}</p>
                            {message.Created_date && (
                              <div className="msg_time">
                                <small>
                                  {moment(
                                    new Date(message.Created_date)
                                  ).format("LT")}
                                </small>
                                {USER === message.send_by && (
                                  <span
                                    style={{
                                      textAlign: "end",
                                      margin: "0 5px",
                                      color:
                                        message.status === "Seen"
                                          ? "blue"
                                          : "gray",
                                    }}
                                  >
                                    {MSG_STATUS[message.status]}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="msg_img">
                            <img
                              src={`${
                                USER === message.send_by
                                  ? currentUser?.profile_img || personImg
                                  : astroUser?.profile_img
                              }`}
                              alt="img"
                              style={{ height: "2.5rem", width: "2.5rem" }}
                            />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </InfiniteScroll>
              </div>
            </div>
          </div>

          {isTyping && (
            <div className="mx-3 my-1">{`${astroUser?.name} is typing...`}</div>
          )}
          <div className="chat-bottom-input-box">
            <input
              spellCheck="false"
              className="btm_input"
              type="text"
              placeholder="Enter your chat"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                } else {
                  handleTyping();
                }
              }}
            />
            <div
              className="send-chat-btn"
              onClick={() => sendMessage()}
            >
              <IoSend />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={chatEnded}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        fullWidth={100}
        onClose={() => cc()}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            End Chat
          </span>

          <span
            className="float-right icon_color"
            onClick={() => cc()}
          >
            <i
              className="fa fa-times hover_cursor"
              aria-hidden="true"
            ></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  <p>Are you sure, you want to End Chat?</p>
                </div>
              </div>
              <button
                type="submit"
                className="get_otp_btn mt-4"
                onClick={() => chatEndddd()}
              >
                Ok
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>

      <Dialog
        open={astroChatEnded}
        aria-labelledby="form-dialog-title"
        maxWidth="xs"
        onClose={() => ccc()}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            {astroUser?.name}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  <p>Chat has been ended.</p>
                </div>
              </div>
              <button
                type="submit"
                className="get_otp_btn mt-4"
                onClick={() => astrooooo()}
              >
                Ok
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>

      <UserRating
        open={rating}
        astroUser={{ ...astroUser, channelId }}
        close={() => setRating(!rating)}
        type="Chat"
      />
    </>
  );
};

export default UserChat;
