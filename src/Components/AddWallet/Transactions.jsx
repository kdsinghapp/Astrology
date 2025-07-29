import React, { useState, useEffect } from "react";
import HOC from "../../Common/HOC";
import "./Transactions.css";
import { Navigate, useNavigate } from "react-router-dom";
// import { Card } from "@material-ui/core";
import { Card } from "@mui/material";
import { notificationHandler } from "../utils/Notification";
import Expand from "react-expand-animated";
import Loder from "../Loder/Loder";
import { FcSms, FcCallback, FcFaq } from "react-icons/fc";
import { RiArrowRightSLine } from "react-icons/ri";
import { GrTransaction } from "react-icons/gr";
import { MdKeyboardArrowDown, MdPictureAsPdf } from "react-icons/md";
import { get_profile_api } from "../api/authapi";
import Cookies from "js-cookie";
import d from "./../../images/Icons/transation.png";

import call_list_api, {
  transaction_api,
  user_question_api,
} from "../api/transationapi";
import DataNotFound from "../DataNotFound";
import { AiFillFilePdf, AiFillStar } from "react-icons/ai";
import ReactStars from "react-rating-stars-component";
import reportlist from "../api/reportlist";
import TransactionsLogs from "./TransactionsLogs";

const Transactions = () => {
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  const currency = Cookies.get("country");
  const [questiondataArry, setquestiondataArry] = useState([]);
  const [chatHistoryData, setchatHistoryData] = useState([]);
  const [transationArry, settransationArry] = useState([]);
  const [callHistoryData, setcallHistoryData] = useState([]);
  const [reportListArry, setreportListArry] = useState([]);
  const [tabIndex, settabIndex] = useState(1);
  const [reportshow, setreportshow] = useState(false);
  const navigate = useNavigate();
  const [currentUser, setCurrentuser] = useState({
    name: "",
    email: "",
    number: "",
    wallete: "",
    dob: "",
    image: "",
    tob: "",
    pob: "",
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    get_profile();
    // transationhistory();
    chatHistoryFunc("audio");
    Askquestionstatus();
    reportlist_api();
  }, []);

  const get_profile = async () => {
    setisloading(true);
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        setCurrentuser(res?.data);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  const chatHistoryFunc = async (data) => {
    setisloading(true);
    let temp = {
      type: data,
      page: "1",
    };
    try {
      const res = await transaction_api(temp);
      if (res.data.result) {
        if (data === "audio") {
          setcallHistoryData(res?.data?.transactions?.data);
        }
        if (data === "chat") {
          setchatHistoryData(res?.data?.transactions?.data);
        }
        if (data === "wallet") {
          settransationArry(res?.data?.transactions?.data);
        }
        setisUpdated(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  const Askquestionstatus = async () => {
    setisloading(true);
    try {
      const res = await user_question_api();
      if (res.data.status) {
        res.data.results.map((item) => {
          item.show = false;
        });
        setquestiondataArry(res.data.results);
        setisUpdated(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
      setisloading(false);
    } catch (error) {
      notificationHandler({ type: "danger", msg: "Network error" });
    }
  };

  // const transationhistory = async () => {
  //   try {
  //     let temp = {
  //       type: "",
  //       page: "1",
  //     };
  //     const res = await transaction_api(temp);
  //     if (res.data.result) {
  //       settransationArry(res.data.transactions.data);
  //       setisUpdated(false);
  //     } else {
  //       notificationHandler({ type: "danger", msg: res.data.message });
  //     }

  //     setisloading(false);
  //   } catch (error) {
  //     notificationHandler({ type: "danger", msg: "Network error" });
  //   }
  // };

  const showmore = (data, index) => {
    questiondataArry[index].show = !data.show;
    setquestiondataArry([...questiondataArry]);
  };
  const reportlistdata = (data, index) => {
    reportListArry[index].show = !data.show;
    setreportListArry([...reportListArry]);
  };

  const reportlist_api = async () => {
    try {
      let temp = {
        token: Cookies.get("token"),
      };
      const res = await reportlist(temp);
      if (res.data.result) {
        const data = res?.data?.report_intake_form?.map((item) => ({
          ...item,
          show: false,
        }));
        setreportListArry(data || []);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }

      setisloading(false);
    } catch (error) {
      notificationHandler({ type: "danger", msg: "Network error" });
    }
  };

  return (
    <>
      <section id="section">
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <section className="filter mt-5">
                <div className="">
                  <Card className="Card_shadow p-3">
                    <div className="tab_items">
                      <div
                        className={`${tabIndex === 1 ? "active" : ""}`}
                        onClick={() => {
                          settabIndex(1);
                          chatHistoryFunc("audio");
                        }}
                      >
                        Call
                      </div>
                      <div
                        className={`${tabIndex === 2 ? "active" : ""}`}
                        onClick={() => {
                          settabIndex(2);
                          chatHistoryFunc("chat");
                        }}
                      >
                        Chat
                      </div>

                      <div
                        className={`${tabIndex === 3 ? "active" : ""}`}
                        onClick={() => {
                          settabIndex(3);
                          chatHistoryFunc("wallet");
                        }}
                      >
                        Wallet
                      </div>

                      <div
                        className={`${tabIndex === 6 ? "active" : ""}`}
                        onClick={() => {
                          settabIndex(6);
                        }}
                      >
                        Payment Logs
                      </div>

                      <div
                        className={`${tabIndex === 4 ? "active" : ""}`}
                        onClick={() => {
                          settabIndex(4);
                        }}
                      >
                        Others
                      </div>
                      <div
                        className={`${tabIndex === 5 ? "active" : ""}`}
                        onClick={() => {
                          settabIndex(5);
                        }}
                      >
                        Report
                      </div>
                    </div>
                  </Card>
                </div>
              </section>
            </div>

            <div className="col-md-9">
              <div className="astro_card_new mt-5 mb-5">
                <>
                  {tabIndex === 1 && (
                    <div className="row">
                      {callHistoryData?.length > 0 ? (
                        callHistoryData.map((data, index) => (
                          <div
                            className="col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-3"
                            key={index}
                            style={{ paddingRight: "0" }}
                          >
                            <Card className="Card_shadow card_div p-2">
                              <div
                                id="card"
                                style={{ height: "auto" }}
                              >
                                <div className="card_top">
                                  <div className="transactions_top_left">
                                    <div className="left">
                                      <FcCallback
                                        style={{ fontSize: "2.5rem" }}
                                      />
                                    </div>
                                  </div>
                                  <div className="transactions_top_right">
                                    <div className="astro_detail">
                                      <div className="name">
                                        {data?.astro_name}
                                      </div>
                                      <div className="transactions_user_id">
                                        Order ID {data?.order_id}
                                      </div>
                                    </div>
                                    <div className="transactions_details">
                                      <div className="call_history">
                                        {data?.t?.split(" ")[0]} (Call for{" "}
                                        {data.time}min)
                                      </div>
                                      <div className="call_price">
                                        {currency === "INR" ? "₹" : "$"}
                                        {parseFloat(data?.amount).toFixed(
                                          2
                                        )}{" "}
                                        {`(${currency === "INR" ? "₹" : "$"} ${
                                          data?.per_min_charge_audio
                                            ? parseFloat(
                                                data?.per_min_charge_audio
                                              ).toFixed(2)
                                            : 0
                                        }/min)`}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="transactions_top_bottom">
                                  <div style={{ fontWeight: "500" }}>
                                    Paid by Wallet
                                  </div>
                                </div>
                                {/* <div className="status">
                                  Status:{" "}
                                  {data.status === "initiate"
                                    ? "Not Connected"
                                    : data.status === "Connected"
                                    ? data.status
                                    : data.status}
                                </div> */}
                                {/* <div className="d-flex">
                                  <div className="chat-history-rating">
                                    <ReactStars
                                      style={{ justifyContent: "center" }}
                                      count={5}
                                      value={data.ratings}
                                      size={20}
                                      activeColor="#FFB450"
                                      color="#ABABAB"
                                      isHalf={true}
                                      edit={false}
                                      classNames="star_class"
                                      emptyIcon={<AiFillStar />}
                                      halfIcon={
                                        <i className="fa fa-star-half-alt"></i>
                                      }
                                      fullIcon={<AiFillStar />}
                                    />
                                  </div>
                                </div> */}
                              </div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <>
                          <DataNotFound />
                        </>
                      )}
                    </div>
                  )}
                  {tabIndex === 2 && (
                    <div className="row">
                      {chatHistoryData?.length > 0 ? (
                        chatHistoryData.map((data, index) => (
                          <div
                            className="col-sm-12 col-md-12 col-lg-12 col-xl-6 mb-3"
                            key={index}
                            style={{ paddingRight: "0" }}
                          >
                            <Card className="Card_shadow card_div p-2">
                              <div id="card">
                                <div className="card_top">
                                  <div className="transactions_top_left">
                                    <div className="left">
                                      <FcSms style={{ fontSize: "2.5rem" }} />
                                    </div>
                                  </div>
                                  <div className="transactions_top_right">
                                    <div className="astro_detail">
                                      <div className="name">
                                        {data?.astro_name.slice(0, 18)}
                                      </div>
                                      <div className="transactions_user_id">
                                        Order ID {data?.order_id}
                                      </div>
                                    </div>
                                    <div className="transactions_details">
                                      <div className="call_history">
                                        {data?.t?.split(" ")[0]} (Chat for{" "}
                                        {data?.time}min)
                                      </div>
                                      <div className="call_price">
                                        {currency === "INR" ? "₹" : "$"}
                                        {parseFloat(data?.amount)?.toFixed(
                                          2
                                        )}{" "}
                                        {`(${currency === "INR" ? "₹" : "$"} ${
                                          data?.per_min_charge
                                            ? parseFloat(
                                                data?.per_min_charge
                                              )?.toFixed(2)
                                            : 0
                                        }/min)`}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="transactions_top_bottom">
                                  <div style={{ fontWeight: "500" }}>
                                    Paid by Wallet
                                  </div>
                                </div>
                                <div className="status d-flex justify-content-between">
                                  <div>
                                    {data.note}
                                    {/* {" "}
                                    Status:{" "}
                                    {data.status === "end_user"
                                      ? "End By User"
                                      : data.status === "end_astro"
                                      ? "End By Astrologer"
                                      : "Not Connected"} */}
                                  </div>
                                  {data.total_amount === 0 ? (
                                    ""
                                  ) : (
                                    <div
                                      className="chat_history"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        navigate("/chat-history", {
                                          state: {
                                            currentUser: {
                                              name: data.name,
                                              profile_img:
                                                currentUser.results_web
                                                  ?.profile_img,
                                            },
                                            astroUser: {
                                              name: data.astro_name,
                                              profile_img: data.astro_image,
                                            },
                                            channelId: data.channel_id,
                                          },
                                        })
                                      }
                                    >
                                      View Chat
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <>
                          <DataNotFound />
                        </>
                      )}
                    </div>
                  )}
                  {tabIndex === 3 && (
                    <div className="row">
                      {transationArry?.length > 0 ? (
                        transationArry.map((data, index) => (
                          <div
                            className="col-sm-12 col-md-12 col-lg-6 col-xl-6 mb-3"
                            key={index}
                            style={{ paddingRight: "0" }}
                          >
                            <Card className="Card_shadow card_div p-2">
                              <div
                                id="card"
                                style={{ height: "140px", fontSize: "15px" }}
                              >
                                <div className="card_top">
                                  <div className="transactions_top_left">
                                    <div className="">
                                      <img
                                        src={d}
                                        alt=""
                                      />
                                    </div>
                                  </div>
                                  <div className="transactions_top_right">
                                    <div className="astro_detail">
                                      <div className="name">{data?.name}</div>
                                      {/* <div className="transactions_user_id">
                                        Order ID {data?.order_id}
                                      </div> */}
                                    </div>
                                    <div className="transactions_details">
                                      <div
                                        className="call_history"
                                        style={{ width: "80%" }}
                                      >
                                        <h6>{data.description}</h6>
                                      </div>
                                      {data.amount_type === "Debit" ? (
                                        <div className="text-danger call_price">
                                          - {currency === "INR" ? "₹" : "$"}
                                          {data.amount?.toFixed(2)}
                                        </div>
                                      ) : (
                                        <div className="text-success call_price">
                                          + {currency === "INR" ? "₹" : "$"}
                                          {data.amount?.toFixed(2)}
                                        </div>
                                      )}
                                    </div>
                                    {/* <div>({data.type})</div> */}
                                  </div>
                                </div>

                                <div className="d-flex justify-content-between px-2">
                                  <div className="font-weight-normal">
                                    Transactions Id
                                  </div>
                                  <div className="font-weight-normal">
                                    {data.transaction_id}
                                  </div>
                                </div>

                                <div className="transactions_top_bottom mt-2">
                                  {data.amount_type === "Debit" ? (
                                    <div className="transation_data">
                                      <div
                                        className="text-danger"
                                        style={{ fontWeight: "500" }}
                                      >
                                        {data.amount_type}
                                      </div>
                                      <div>{data.transaction_date}</div>
                                    </div>
                                  ) : (
                                    <div className="transation_data">
                                      <div
                                        className="text-success"
                                        style={{ fontWeight: "500" }}
                                      >
                                        {data.amount_type}
                                      </div>
                                      <div>{data.transaction_date}</div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <>
                          <DataNotFound />
                        </>
                      )}
                    </div>
                  )}
                  {tabIndex === 4 && (
                    <div className="row">
                      {questiondataArry?.length > 0 ? (
                        questiondataArry.map((data, index) => (
                          <div
                            className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-3"
                            key={index}
                            style={{ paddingRight: "0" }}
                          >
                            <Card className="Card_shadow card_div p-2">
                              <div
                                id="card"
                                style={{ cursor: "pointer", height: "90px" }}
                                onClick={() => showmore(data, index)}
                              >
                                <div className="card_top">
                                  <div className="transactions_top_left">
                                    <div className="left">
                                      <FcFaq style={{ fontSize: "2.5rem" }} />
                                    </div>
                                  </div>
                                  <div className="transactions_top_right">
                                    <div className="astro_detail">
                                      <div className="name">
                                        {data?.astro_name}
                                      </div>
                                      <div
                                        className="transactions_user_id"
                                        style={{ color: "forestGreen" }}
                                      >
                                        Status : {data?.status}
                                      </div>
                                    </div>
                                    <div className="astro_detail">
                                      <div
                                        className="transactions_user_id"
                                        style={{
                                          color: "gray",
                                          fontSize: "1rem",
                                        }}
                                      >
                                        Order ID : {data?.id}
                                      </div>
                                      <div
                                        className="transactions_user_id"
                                        style={{ color: "red" }}
                                      >
                                        Deduction : {data?.price}
                                      </div>
                                    </div>
                                    <div className="transactions_details">
                                      <div
                                        className="call_history"
                                        style={{
                                          color: "gray",
                                          fontSize: "1rem",
                                        }}
                                      >
                                        ({data?.name}) {data?.created_at}
                                      </div>
                                      <div className="call_price">
                                        {data.show === true ? (
                                          <MdKeyboardArrowDown />
                                        ) : (
                                          <RiArrowRightSLine />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Expand open={data.show}>
                                <b>
                                  {" "}
                                  <p>
                                    Q{index + 1} - {data?.question}
                                  </p>
                                </b>
                                {data?.reply === "" ? (
                                  <p className="text-danger">
                                    Ans - Pending...
                                  </p>
                                ) : (
                                  <p>Ans - {data?.reply}</p>
                                )}
                              </Expand>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <>
                          <DataNotFound />
                        </>
                      )}
                    </div>
                  )}
                  {tabIndex === 5 && (
                    <div className="row">
                      {reportListArry?.length > 0 ? (
                        reportListArry.map((data, index) => (
                          <div
                            className="col-sm-12 col-md-12 col-lg-12 col-xl-12 mb-3"
                            key={index}
                            style={{ paddingRight: "0" }}
                          >
                            <Card className="Card_shadow card_div p-2">
                              <div
                                id="card"
                                style={{ cursor: "pointer", height: "90px" }}
                                onClick={() => reportlistdata(data, index)}
                              >
                                <div className="card_top">
                                  <div className="transactions_top_left">
                                    <div className="left icons-color">
                                      <AiFillFilePdf
                                        style={{ fontSize: "2rem" }}
                                      />
                                    </div>
                                  </div>
                                  <div className="transactions_top_right">
                                    <div className="astro_detail">
                                      <div className="name">
                                        {data?.report_type_name}
                                      </div>
                                      <div>
                                        {data.file && (
                                          <a
                                            target="_blank"
                                            href={data.file}
                                            rel="noopener noreferrer"
                                          >
                                            <div
                                              className="chat_history"
                                              style={{ cursor: "pointer" }}
                                            >
                                              <MdPictureAsPdf /> Download
                                            </div>
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                    <div className="transactions_details">
                                      <div
                                        className="call_history"
                                        style={{
                                          color: "gray",
                                          fontSize: "1rem",
                                        }}
                                      >
                                        ({data?.first_name}) {data?.created_at}
                                      </div>
                                      <div className="call_price">
                                        {data.show === true ? (
                                          <MdKeyboardArrowDown />
                                        ) : (
                                          <RiArrowRightSLine />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <Expand open={data.show}>
                                <div className="card_top pl-3 pr-3 pb-3">
                                  <div className="report_card">
                                    <div className="report_detail_text mt-2">
                                      <div className="report_text">
                                        <div>
                                          <b>Name :</b>
                                        </div>
                                        <div
                                          className="ml-1"
                                          style={{ flexGrow: "1" }}
                                        >
                                          {data?.first_name}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="report_detail_text mt-2">
                                      <div className="report_text">
                                        <div>
                                          <b>Place of Birth:</b>
                                        </div>
                                        <div
                                          className="ml-1"
                                          style={{ flexGrow: "1" }}
                                        >
                                          {data?.pob}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="report_detail_text mt-2">
                                      <div className="report_text">
                                        <div>
                                          <b>Time of Birth:</b>
                                        </div>
                                        <div
                                          className="ml-1"
                                          style={{ flexGrow: "1" }}
                                        >
                                          {data?.dob}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="report_detail_text mt-2">
                                      <div className="report_text">
                                        <div>
                                          <b>Marital status :</b>
                                        </div>
                                        <div
                                          className="ml-1"
                                          style={{ flexGrow: "1" }}
                                        >
                                          {data?.marital_status}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="report_detail_text mt-2">
                                      <div className="report_text">
                                        <div>
                                          <b>Gender :</b>
                                        </div>
                                        <div
                                          className="ml-1"
                                          style={{ flexGrow: "1" }}
                                        >
                                          {data?.gender}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="report_detail_text mt-2">
                                      <div className="report_text">
                                        <div>
                                          <b>comments :</b>
                                        </div>
                                        <div
                                          className="ml-1"
                                          style={{ flexGrow: "1" }}
                                        >
                                          {data?.any_comments}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="report_detail_text mt-2">
                                      <div className="report_text">
                                        <div>
                                          <b>Reply :</b>
                                        </div>
                                        <div
                                          className="ml-1"
                                          style={{ flexGrow: "1" }}
                                        >
                                          {data?.reply}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Expand>
                            </Card>
                          </div>
                        ))
                      ) : (
                        <>
                          <DataNotFound />
                        </>
                      )}
                    </div>
                  )}
                  {tabIndex === 6 && <TransactionsLogs currency={currency} />}
                </>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Loder loading={isloading} />
    </>
  );
};

export default HOC(Transactions);
