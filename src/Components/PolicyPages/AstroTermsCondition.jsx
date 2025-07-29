import React, { useState, useEffect } from "react";
import HOC from "../../Common/HOC";
import { getBaseUrl } from "../../Components/utils";
import axios from "axios";

const AstroTermsCondition = () => {
  const [privacypolicy, setprivacypolicy] = useState("");
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    policydata();
  }, []);
  /////api integration policy
  const policydata = () => {
    let url = getBaseUrl() + "web/setting";
    setisloading(true);
    let config = {
      //   headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(url, config)
      .then(
        (res) => {
          setprivacypolicy(res.data.results.terms_and_conditions_astro);
          setisloading(false);
        },

        (error) => {
          console.log("data response error:::", error);
          setisloading(false);
        }
      )
      .catch((e) => {
        console.log("data response error:::", e);
        setisloading(false);
      });
  };
  return (
    <div>
      {" "}
      <div className="">
        {/* <section style={{ width: "100%" }}>
          <img src={a} style={{ width: "100%" }} />
        </section> */}
        <section class="about_privacy">
          <div class="container content_fit_div">
            <div>
              <div style={{ textAlign: "left" }}>
                <p dangerouslySetInnerHTML={{ __html: privacypolicy }}></p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HOC(AstroTermsCondition);
