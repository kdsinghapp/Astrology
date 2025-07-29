import React, { useState, useEffect, useCallback } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import "./ChatHistory.css";
import { useLocation, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import Cookies from "js-cookie";
import moment from "moment";
import ReactStars from "react-rating-stars-component";
import { AiFillStar } from "react-icons/ai";
import { getBaseUrl } from "../utils";
import { getUserRatingByIdApi } from "../api/userrating";
import personImg from "./../../images/person-dummy.jpg";

const ChatHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, astroUser, channelId } = location.state ?? {};
  const [loading, setLoading] = useState(true);
  const [messageList, setMessageList] = useState([]);
  const [messageCount, setMessageCount] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 50;
  const [hasMore, setHasMore] = useState(true);
  const [rating, setRating] = useState({
    loading: true,
    value: 0,
  });

  const USER = "user";

  const fetchUserMessage = useCallback(async () => {
    const url = getBaseUrl() + "user_api/message_list";
    const token = Cookies.get("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const payload = {
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
      setLoading(false);
    }
  }, [channelId, page, limit]);

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

  const loadUserratingById = useCallback(async () => {
    const payload = {
      channel_id: channelId,
    };
    try {
      const resp = await getUserRatingByIdApi(payload);
      setRating({
        loading: false,
        value: resp.data?.results?.[0]?.rating || 0,
      });
    } catch (error) {
      setRating({
        loading: false,
        value: 0,
      });
    }
  }, [channelId]);

  useEffect(() => {
    loadUserratingById();
  }, [loadUserratingById]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const getLoader = () => {
    if (loading) {
      return <p className="text-center py-2 text-bold">Loading...</p>;
    } else {
      return <p className="text-center py-2 text-bold">No Message Found...</p>;
    }
  };

  return (
    <div id="chat_container">
      <div className="chat_box">
        <div className="chat_header">
          <div className="chat_counter">
            <div
              className="header_icon"
              onClick={() => navigate(-1)}
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
              {astroUser?.name}
            </div>
          </div>
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
              {!messageList.length ? (
                getLoader()
              ) : (
                <InfiniteScroll
                  dataLength={messageList.length}
                  next={loadMore}
                  hasMore={hasMore}
                  inverse={true}
                  loader={<p className="text-center py-2">Loading...</p>}
                  scrollableTarget="scrollableDiv"
                  style={{ display: "flex", flexDirection: "column-reverse" }}
                >
                  {messageList.map((message, index) => {
                    return (
                      <div key={message?.message_id ?? index}>
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
                              </div>
                            )}
                          </div>
                          <span className="msg_img">
                            <img
                              src={`${
                                USER === message.send_by
                                  ? currentUser?.profile_img || personImg
                                  : astroUser?.profile_img || personImg
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
              )}
            </div>
          </div>
        </div>
        <div className="chat-bottom-input-box">
          <div
            className="chat-history-rating"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            {!rating.loading && (
              <ReactStars
                count={5}
                value={rating.value}
                size={30}
                activeColor="#FFB450"
                color="#ABABAB"
                isHalf={true}
                edit={false}
                classNames="star_class"
                emptyIcon={<AiFillStar />}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<AiFillStar />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
