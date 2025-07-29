import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import ScrollToBottom from "react-scroll-to-bottom";
import InfiniteScroll from "react-infinite-scroll-component";
// import {
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   DialogContent,
// } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import Cookies from "js-cookie";
import moment from "moment";
import { getBaseUrl } from "../../utils";
import messageTone from "./message-tone.mp3";
import "./style.css";

const MSG_STATUS = {
  Sent: "✓",
  Deliver: "✓✓",
  Seen: "✓✓",
};

const ChatWithAstrologer = ({
  open,
  close,
  currentUser,
  astroUser,
  room,
  channel,
  socket,
}) => {
  // console.log("currentUser-----", currentUser);
  // console.log("astroUser-----", astroUser);
  // const [isOnline, setIsOnline] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [messageList, setMessageList] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const messageRefs = useRef([]);

  const receiver_id = "astro";

  // useEffect(() => {
  //   socket.emit("user_offline", false);
  //   return () => {
  //     socket.emit("user_offline", true);
  //   };
  // }, [socket]);

  useEffect(() => {
    // socket.on("user_offline", (user) => {
    //   console.log("user_offline", user);
    //   setIsOnline(!user);
    // });

    socket.on("message", (data) => {
      const tune = new Audio(messageTone);
      tune.play();
      setMessageList((list) => [...list, data]);
      socket.emit("markDelever", room, data.message_id, true);
    });

    socket.on("display", (data) => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
      typingTimeout.current = setTimeout(() => {
        setIsTyping(false);
      }, 1000);
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
      // socket.emit("disconnect");
      socket.off();
    };
  }, [socket, room]);

  useEffect(() => {
    const options = {};
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const messageId = entry.target.getAttribute("data-message-id");
          const messageToUpdate = messageList[messageId];
          if (
            messageToUpdate?.message_id &&
            messageToUpdate.status !== "Seen"
          ) {
            socket.emit("markSeen", room, messageToUpdate.message_id, true);
          }
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
  }, [socket, room, messageList]);

  const fetchUserMessage = useCallback(async () => {
    const url = getBaseUrl() + "user_api/message_list";
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const payload = {
      room_id: room,
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
      console.log("err", error);
      setLoading(false);
    }
  }, [room, page, limit]);

  useEffect(() => {
    fetchUserMessage();
  }, [fetchUserMessage]);

  useEffect(() => {
    if (messageCount === messageList.length) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }
  }, [messageCount, messageList]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const send_by = "user";
      const messageData = {
        sender_id: currentUser.id,
        senderNickname: currentUser.name,
        messageContent: currentMessage,
        receiver_id,
        Room_id: room,
        channel,
        send_by,
        status: "Sent",
        Created_date: moment(),
      };
      await socket.emit(
        "messagedetection",
        currentUser.name,
        currentMessage,
        currentUser.id,
        receiver_id,
        room,
        channel,
        send_by
      );
      // await socket.emit("typing", false);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleTyping = () => {
    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }
    typingTimeout.current = setTimeout(() => {
      // socket.emit("typing", false);
    }, 1000);
    // socket.emit("typing", true);
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        onClose={close}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Chat With {astroUser.name}
          </span>
          <span
            className="float-right icon_color"
            onClick={close}
            style={{ cursor: "pointer" }}
          >
            <i
              className="fa fa-times hover_cursor"
              aria-hidden="true"
            ></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent>
          <div className="padding_desktop_view">
            <div className="chat-window">
              <div className="chat-body">
                <div
                  id="scrollableDiv"
                  style={{
                    height: 300,
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
                      loading && <p className="text-center">Loading...</p>
                    }
                    endMessage={<p className="text-center"></p>}
                    scrollableTarget="scrollableDiv"
                    style={{ display: "flex", flexDirection: "column-reverse" }}
                  >
                    <ScrollToBottom className="message-container">
                      {messageList.map((message, index) => {
                        const messageRef = React.createRef();
                        messageRefs.current[index] = messageRef;
                        return (
                          <div
                            key={index}
                            ref={messageRef}
                            data-message-id={index}
                            id={
                              currentUser.id === message.sender_id
                                ? "other"
                                : "you"
                            }
                            className="message"
                          >
                            <div>
                              <div className="message-content">
                                <span>{message.messageContent}</span>
                              </div>
                              <div style={{ justifyContent: "flex-end" }}>
                                <div>
                                  {message.Created_date && (
                                    <span>
                                      {moment(message.Created_date).format(
                                        "h:mm A"
                                      )}
                                    </span>
                                  )}
                                  {currentUser.id === message.sender_id && (
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
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </ScrollToBottom>
                  </InfiniteScroll>
                </div>
              </div>
              <div>{isTyping && <p>{`typing...`}</p>}</div>
              <div className="chat-footer">
                <input
                  type="text"
                  value={currentMessage}
                  placeholder="Type a message..."
                  onChange={(event) => {
                    setCurrentMessage(event.target.value);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      sendMessage();
                    } else {
                      // handleTyping();
                    }
                  }}
                />
                <button onClick={sendMessage}>&#9658;</button>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default ChatWithAstrologer;
