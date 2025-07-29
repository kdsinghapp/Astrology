import React, { useEffect, useState } from 'react'
import BlogCrousal from "../Crousal/BlogCrousal";
import Crousal from "../Crousal/Crousal";
import OurAstrologerCrousal from "../Crousal/OurAstrologerCrousal";
import homeapi from "../api/homeapi";
import { notificationHandler } from "../utils/Notification";


function CommonCrousal() {
  const [AstrologerList, setAstrologerList] = useState("");

  const LiveAstroData = async () => {
    try {
      const res = await homeapi();
      if (res.data.status) {
        setAstrologerList(res?.data?.astrologer);
      } else {
        notificationHandler({ type: "danger", msg: "Network error" });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
    }
  };


  useEffect(()=>{
    LiveAstroData();
  },[])

  return (
    <>
    <section className="container ourastrologer mt-5 mb-4">
          <OurAstrologerCrousal astro={AstrologerList} />
        </section>
        <section className="container">
          <Crousal />
        </section>

        <BlogCrousal />
    </>
  )
}

export default CommonCrousal