import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { getBaseUrl } from "../utils";
import { useState } from "react";

const Sitemap = () => {
  const [blogsitemap, setblogsitemap] = useState([]);
  useEffect(() => {
    blogdetailspage();
  }, []);
  const blogdetailspage = () => {
    try {
      let url = getBaseUrl() + "web/blog_list?category_id=";
      let config = {
        Authorization: `Bearer ${Cookies.get("token")}`,
      };
      axios.get(url, config).then((res) => {
        console.log(res.data.results);
        setblogsitemap(res.data.results);
      });
    } catch (error) {
      console.log("data response error:::", error);
    }
  };

  return (
    <div className="py-4 px-3">
      <h1 className="text-center">AstroPush</h1>
      <div class="paper">
        <div class="lines">
          <div contenteditable>
            <strong>Site Map</strong>
            <ul>
              <li>
                <a href="https://astropush.com">Home</a>
              </li>
              <li>
                <a href="https://astropush.com/horoscope/todays-horoscope/aries">Horoscope</a>
              </li>
              <li>
                <a href="https://astropush.com/talk-to-astrologer">Talk to Astrologer</a>
              </li>
              <li>
                <a href="https://astropush.com/chat-with-astrologer">Chat with Astrologer</a>
              </li>
              <li>
                <a href="https://astropush.com/free-kundli-online">Kundli</a>
              </li>
              <li>
                <a href="https://astropush.com/free-kundali-matching">Kundli Matching</a>
              </li>
              <li>
                <a href="https://astropush.com/numerology">Numerology</a>
              </li>
              <li>
                <a href="https://astropush.com/panchang">Panchang</a>
              </li>
              <li>
                <a href="https://astropush.com/blog"> Blog</a>
                <ul>
                  {blogsitemap.map((data, index) => (
                    <li>
                      <a href={`https://astropush.com/blog/${data.meta_link}`}>{data.title} </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div class="holes">
          <div class="hole"></div>
          <div class="hole"></div>
          <div class="hole"></div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
