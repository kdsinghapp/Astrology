import React, { useState, useEffect } from "react";
import { notificationHandler } from "../utils/Notification";
import astrologer_list_api from "../api/astrochat";
import Cookies from "js-cookie";
import dummy from "../../images/dummy.jpg";
const ScrollPageComponent = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const token = Cookies.get("token");
  const currency = Cookies.get("country");
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    let temp = {
      token: token,
      is_chat: "",
      currency,
      skill_id: "",
      language_id: "",
      search: "",
      is_voice_call: "on",
      is_video_call: "",
      is_question: "",
      page: page,
      limit: "10",
    };
    try {
      const res = await astrologer_list_api(temp);
      if (res.data.status) {
        const newData = await res.data.results;
        setData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setIsLoading(false);
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= fullHeight && !isLoading) {
      fetchData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  return (
    <div>
      {data.map((data, index) => (
        <div key={index}>
          <div className="left">{data.profile_img === "" ? <img src={dummy} alt="image" /> : <img src={data?.profile_img} alt="image" />}</div>
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};

export default ScrollPageComponent;
