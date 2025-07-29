import React, { useState } from "react";
import Cookies from "js-cookie";
import authapi, {
  user_status_api,
  loginWithPhoneApi,
  authLoginApi,
} from "../api/authapi";
import Timer from "../timer/Timer";
import { blankValidator } from "../utils/Validation";
import { useNavigate } from "react-router-dom";
import { notificationHandler } from "../utils/Notification";
// import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

function getPlatform() {
  const userAgent = navigator.userAgent.toLowerCase();
  if (userAgent.includes("macintosh")) {
    return "Mac";
  } else if (userAgent.includes("windows")) {
    return "Windows";
  } else if (userAgent.includes("iphone") || userAgent.includes("ipad")) {
    return "iOS";
  } else if (userAgent.includes("android")) {
    return "Android";
  } else {
    return "Unknown";
  }
}

const LoginForm = ({ open, close, countryCode, phone, onsubmit }) => {
  const [loginotpError, setloginotpError] = useState(false);
  const navigate = useNavigate();
  const [timerShow, settimerShow] = useState(false);
  const [loginotp, setloginotp] = useState("");
  const [isloading, setisloading] = useState(false);
  // const [isUpdated, setisUpdated] = useState(false);

  /////api integration user Login
  const userLogin = async () => {
    if (!blankValidator(loginotp)) {
      setloginotpError(true);
      return;
    }
    try {
      setisloading(true);
      const payload = {
        country_code: countryCode,
        number: phone,
        otp: loginotp,
        // otp: loginotp,
        // number: phone,
        // country: Cookies.get("country"),
        // country_code: countryCode,
        // deviceType: "web",
        // deviceID: "123",
        // deviceToken: "123",
      };
      const resp = await loginWithPhoneApi(payload);
      console.log("resp", resp.data);
      // if (res.data.type === "block") {
      //   setisloading(false);
      //   notificationHandler({ type: "danger", msg: res.data.message });
      //   return console.log("block res", res.data.type);
      // }
      if (resp.data.status) {
        const platform = getPlatform();
        const payload = {
          deviceType: "web",
          deviceID: platform,
          deviceToken: Cookies.get("fcmToken"),
          number: phone,
          country: Cookies.get("country"),
          country_code: countryCode,
        };
        try {
          const resp = await authLoginApi(payload);
          Cookies.set(
            "auth",
            "true",
            { secure: true },
            { sameSite: "strict" },
            { expires: 365 }
          );
          Cookies.set(
            "token",
            resp.data.token,
            { secure: true },
            { sameSite: "strict" },
            { expires: 365 }
          );
          setisloading(false);
          notificationHandler({ type: "success", msg: resp.data.message });
          setloginotp("");
          statusUpdate();
        } catch (error) {
          setisloading(false);
          notificationHandler({ type: "danger", msg: resp.data.message });
        }
        // Cookies.set(
        //   "auth",
        //   "true",
        //   { secure: true },
        //   { sameSite: "strict" },
        //   { expires: 365 }
        // );
        // Cookies.set(
        //   "token",
        //   res.data.token,
        //   { secure: true },
        //   { sameSite: "strict" },
        //   { expires: 365 }
        // );
        // localStorage.setItem("userphoto", res.data.results[0].profile_img);
        // notificationHandler({ type: "success", msg: res.data.message });
        // statusUpdate();
        // setisUpdated(!isUpdated);
        // setisloading(false);
      } else {
        setisloading(false);
        notificationHandler({ type: "danger", msg: resp.data.message });
      }
    } catch (error) {
      setisloading(false);
      notificationHandler({
        type: "danger",
        msg: "Something went wrong. please try again.",
      });
    }
  };

  const resendOtpLogin = async () => {
    try {
      let temp = {
        number: phone,
        otp: "",
        country_code: countryCode,
      };
      const res = await authapi(temp);
      if (res.data.status) {
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
      }
    } catch (error) {
      console.log("data response error:::", error);
      notificationHandler({ type: "danger", msg: "Network error" });
    }
  };

  // callbackfun
  const statusUpdate = () => {
    onsubmit();
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        // onClose={close}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Continue with Phone
          </span>
          <span
            className="float-right icon_color"
            onClick={() => close()}
          >
            <i
              className="fa fa-times hover_cursor"
              aria-hidden="true"
            ></i>
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <h3>Login</h3>
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  placeholder="Mobile number"
                />
              </div>
              <div className="pt-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter OTP"
                  value={loginotp}
                  onChange={(e) => {
                    setloginotpError(false);
                    if (e.target.value.length <= 4) {
                      setloginotp(e.target.value);
                    }
                  }}
                />
              </div>
              {loginotpError && <span className="text-danger">Enter OTP</span>}
              {timerShow == true ? (
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    resendOtpLogin();
                    settimerShow(false);
                  }}
                >
                  Resend OTP
                </span>
              ) : (
                <div className="d-flex">
                  <span className="pr-1"> Resend OTP available in</span>
                  <Timer
                    time={59}
                    onEnd={() => settimerShow(true)}
                  />
                </div>
              )}
              <button
                type="submit"
                className="get_otp_btn mt-4"
                onClick={userLogin}
                disabled={isloading}
              >
                Verify
              </button>
              <div>
                <p
                  className="text-center mt-2"
                  style={{ width: "100%", margin: "auto", fontSize: "10px" }}
                >
                  By Proceeding, I Agree to{" "}
                  <span
                    className="terms_condition"
                    onClick={() => navigate("/terms")}
                  >
                    {" "}
                    Terms and Conditions
                  </span>{" "}
                  &{" "}
                  <span
                    className="terms_condition"
                    onClick={() => navigate("/privacypolicy")}
                  >
                    Privacy Policy
                  </span>{" "}
                  and receive alerts via emails and text messages
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginForm;
