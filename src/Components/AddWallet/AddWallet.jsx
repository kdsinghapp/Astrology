import React, { useState, useEffect } from "react";
import HOC from "../../Common/HOC";
import "./AddWallet.css";
import { useNavigate } from "react-router-dom";
import { get_profile_api } from "../api/authapi";
import Cookies from "js-cookie";
import Wallet_amount_list_api from "../api/payment";
import Loder from "../Loder/Loder";
import UserLogin from "../DialogeBox/UserLogin";
import SEO from "../Seo/seo";
const AddtoWallet = () => {
  const [balance, setbalance] = useState(0);
  const [isloading, setisloading] = useState(false);
  const [wallet_offer_id, setwallet_offer_id] = useState("");
  const [offeramount, setofferamount] = useState("");
  const currency = Cookies.get("country");
  const auth = Cookies.get("auth");
  const [loginPopup, setloginPopup] = useState(false);
  const [amountArry, setamountArry] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    get_profile();
    wallet_amount_list();
  }, []);

  const wallet_amount_list = async () => {
    setisloading(true);
    try {
      let temp = {
        currency: currency,
      };
      const res = await Wallet_amount_list_api(temp);
      if (res.data.status) {
        setamountArry(res?.data?.results);
      } else {
        console.log("data response error:::", res);
      }
      setisloading(false);
    } catch (error) {
      console.log("data response error:::", error);
      setisloading(false);
    }
  };

  const get_profile = async () => {
    try {
      const res = await get_profile_api();
      if (res.data.status) {
        setbalance(res.data.results_web.wallet || 0);
      } else {
        console.log("data response error:::", res);
      }
    } catch (error) {
      console.log("data response error:::", error);
    }
  };

  const [amount, setamount] = useState("");
  const navigate = useNavigate();
  const processRecharge = () => {
    if (auth === "undefined" || auth === undefined) {
      setloginPopup(true);
      return;
    }
    if (amount < 1) {
      return alert("Please add more than 1 ruppess ");
    }
    navigate("/payment", {
      state: {
        amount: amount,
        wallet_offer_id: wallet_offer_id,
        offeramount: offeramount,
      },
    });
  };

  const offerammout = (data) => {
    setwallet_offer_id(data._id);
    if (data.type == "percentage") {
      const amount = (data.amount * data.extra_amount) / 100;
      setofferamount(amount);
    }
    if (data.type == "fixed") {
      setofferamount(data.extra_amount);
    }
  };
  return (
    <>
      <SEO
        title="Astroshop - Free Online Astrology Predictions by Best Astrologer"
        description="AstroPush is the best astrology website for online astrology predictions from the best astrologers of India"
        keywords="Daily Horoscope ,Chat with Astrologer Live ,Talk to Astrologer online,online horoscope,Best astrologers near me,Live Events,Free Kundli,Astroshop"
        url="https://astropush.com/static/media/astropushlogo.f965aa0eb4f9ff946091.png"
      />
      <div className="Contact_Page_padding">
        <div className="wallet_bg">
          <div className="container content_paddingg wallet_class">
            <div className="">
              <h2 className="heading_money_wallet text-center">
                Add Money to Wallet
              </h2>

              {!balance ? (
                <div
                  className="text-center mb-5"
                  style={{ color: "green" }}
                >
                  Available balance: {currency === "INR" ? "₹" : "$"} {balance}
                </div>
              ) : (
                <div
                  className="text-center mb-5"
                  style={{ color: "green" }}
                >
                  Available balance: {currency === "INR" ? "₹" : "$"}
                  {balance?.toFixed(2)}
                </div>
              )}
            </div>
            <div
              className="container Card_shadow form-walet-align p-3 mb-5"
              style={{ justifyContent: "space-around", alignItems: "center" }}
            >
              <div>
                <input
                  className="amount_input"
                  type="number"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                  placeholder={`${
                    currency === "INR" ? "₹ Enter Amount" : "$ Enter Amount"
                  }`}
                />
                {offeramount ? (
                  <div className="pt-1">
                    <p
                      className="amount_save"
                      style={{ fontSize: "14px" }}
                    >
                      You will get {currency === "INR" ? "₹" : "$"}
                      {offeramount} Extra on this wallet recharge
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="procced_recharge">
                <div
                  className="mt-1 mb-3 "
                  style={{ justifyContent: "center" }}
                >
                  <button
                    onClick={() => processRecharge()}
                    type="button"
                    style={{ width: "100%" }}
                    className="btn btn_add_wallet"
                  >
                    Proceed to Recharge
                  </button>
                </div>
              </div>
            </div>

            <div>
              <div className="currency-card-main">
                {amountArry
                  .sort((a, b) => a.amount - b.amount)
                  .map((data, index) => (
                    <div className="currency-card">
                      <div
                        class="rupees_wallet"
                        onClick={() => {
                          offerammout(data);
                          setamount(data.amount);
                        }}
                      >
                        {data.extra_amount == "" ? (
                          <>
                            {data?.type == "fixed" ? (
                              <div
                                class="extra-discount"
                                style={{
                                  backgroundColor: "white",
                                  color: "#fff",
                                  fontSize: "19px",
                                  fontWeight: "normal",
                                }}
                              >
                                ₹ {data?.extra_amount} Extra
                              </div>
                            ) : (
                              <div
                                class="extra-discount"
                                style={{
                                  backgroundColor: "white",
                                  color: "#fff",
                                  fontSize: "19px",
                                  fontWeight: "normal",
                                }}
                              >
                                {data?.extra_amount}% Extra
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            {data?.type == "fixed" ? (
                              <div
                                class="extra-discount"
                                style={{
                                  backgroundColor: "blue",
                                  color: "#fff",
                                  fontSize: "19px",
                                  fontWeight: "normal",
                                }}
                              >
                                ₹ {data?.extra_amount} Extra
                              </div>
                            ) : (
                              <div
                                class="extra-discount"
                                style={{
                                  backgroundColor: "blue",
                                  color: "#fff",
                                  fontSize: "19px",
                                  fontWeight: "normal",
                                }}
                              >
                                {data?.extra_amount}% Extra
                              </div>
                            )}
                          </>
                        )}

                        <div class="price-rate">
                          {currency === "INR" ? "₹" : "$"}
                          {data.amount}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Loder loading={isloading} />
      <UserLogin
        open={loginPopup}
        close={() => setloginPopup(!loginPopup)}
      />
    </>
  );
};

export default HOC(AddtoWallet);
