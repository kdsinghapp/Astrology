import React, { useState } from "react";
import s from "./faq.module.css";
import Expand from "react-expand-animated";
import { GrAdd } from "react-icons/gr";
import { AiOutlineMinus } from "react-icons/ai";
import chevron from "../../images/Icons/chevron-tp.svg";
import chevronn from "../../images/Icons/chevron-tb.svg";
const FAQ = ({ data, onsubmit }) => {
  return (
    <>
      <div className={["termsof-service"]}>
        <div className="termsof-container">
          <div className={s["termsof-heading"]} style={{ textAlign: "center" }}>
            <h1 className="service_provide" style={{ textAlign: "center" }}>
              Frequently Asked Questions
            </h1>
          </div>

          <div className={s["terms-content"]}>
            {data.map((data, index) => (
              <>
                <div className={s["terms-data"]}>
                  <div className={s["faq-title"]}>
                    <div dangerouslySetInnerHTML={{ __html: data.heading }}></div>
                    {/* <div>{data.show == true ? <img src={chevron} /> : <img src={chevronn} />}</div> */}
                  </div>

                  <Expand open={data.show}>
                    <div dangerouslySetInnerHTML={{ __html: data.desc }}></div>
                  </Expand>
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
