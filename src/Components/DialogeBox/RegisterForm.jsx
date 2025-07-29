import React, { useState } from "react";
import { blankValidator } from "../utils/Validation";
import { notificationHandler } from "../utils/Notification";
// import { Dialog, DialogActions, DialogTitle, DialogContent } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { otp_register_process } from "../api/authapi";
import { get_palces } from "../api/location";
import { IoLocationSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ open, close, countryCode, phone, onsubmit }) => {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [dob, setdob] = useState("");
  const [pob, setpob] = useState("");
  const [tob, settob] = useState("");
  const [isloading, setisloading] = useState(false);
  const [isUpdated, setisUpdated] = useState(false);
  //error
  const [nameError, setnameError] = useState(false);
  const [emailError, setemailError] = useState(false);
  const [dobError, setdobError] = useState(false);
  const [pobError, setpobError] = useState(false);
  const [tobError, settobError] = useState(false);

  // otp_register_process
  const OTPsend = async () => {
    if (!blankValidator(name)) {
      setnameError(true);
      return;
    }

    if (!blankValidator(email)) {
      setemailError(true);
      return;
    }
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      return alert("Please add valid email address ");
    }
    if (!blankValidator(dob)) {
      setdobError(true);
      return;
    }
    if (!blankValidator(pob)) {
      setpobError(true);
      return;
    }
    if (!blankValidator(tob)) {
      settobError(true);
      return;
    }
    try {
      let temp = {
        number: phone,
        otp: "",
        country_code: countryCode,
      };
      const res = await otp_register_process(temp);
      if (res.data.status) {
        notificationHandler({ type: "success", msg: res.data.message });
        statusUpdate();

        setisUpdated(!isUpdated);
        setisloading(false);
      } else {
        notificationHandler({ type: "danger", msg: res.data.message });
        setisloading(false);
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: "Network error" });
      setisloading(false);
    }
  };

  // callbackfun
  const statusUpdate = () => {
    onsubmit({
      name,
      email,
      dob,
      pob,
      tob,
    });
  };
  const [places, setplaces] = useState([]);
  const getPlacesAPIFunc = async (e, type) => {
    setpob(e.target.value);
    try {
      setplaces([]);
      let res = await get_palces(e.target.value);
      if (res.data.status === "OK") {
        res.data.predictions.map((item) => {
          setplaces((places) => [...places, item.description]);
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={100}>
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">Continue with Phone</span>
          <span className="float-right icon_color" onClick={() => close()}>
            <i className="fa fa-times hover_cursor" aria-hidden="true"></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <h3 className="text-center">Register</h3>
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="name"
                  value={name}
                  onChange={(e) => {
                    setnameError(false);
                    if (!e.target.value.match(/[0-9]/g)) {
                      setname(e.target.value);
                    }
                  }}
                />
              </div>
              {nameError && <span className="text-danger pr-5">Enter name</span>}
              <div className="pt-3">
                <input type="text" className="form-control" placeholder="Enter Number" value={phone} />
              </div>
              <div className="pt-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setemailError(false);
                    setemail(e.target.value);
                  }}
                />
              </div>
              {emailError && <span className="text-danger pr-5">Enter email</span>}

              <div className="pt-3">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  value={dob}
                  max={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => setdob(e.target.value)}
                  // onClick={(e) => (e.target.type = "date")}
                  // onBlur={(e) => {
                  //   setdobError(false)((e.target.type = "text"));
                  // }}
                  className="form-control"
                  placeholder="Date of Birth"
                />
              </div>
              {dobError && <span className="text-danger pr-5">Enter Date of Birth</span>}

              <div className="pt-3">
                <label>Time of Birth</label>
                <input
                  type="time"
                  name="tob"
                  id="appt-time"
                  // onClick={(e) => (e.target.type = "time")}
                  // onBlur={(e) => (e.target.type = "text")}
                  value={tob}
                  onChange={(e) => {
                    settobError(false);
                    settob(e.target.value);
                  }}
                  className="form-control"
                  placeholder="Time of Birth"
                />
              </div>
              {tobError && <span className="text-danger pr-5">Enter Time of Birth</span>}

              <div className="input_for_cross pt-3">
                <input
                  type="text"
                  name="Place of Birth"
                  value={pob}
                  // onChange={(e) => {
                  //   setpobError(false);
                  //   setpob(e.target.value);
                  // }}
                  onChange={getPlacesAPIFunc}
                  className="form-control"
                  placeholder="Place of Birth"
                />
                {places.length !== 0 && (
                  <div className="getplace_input_registerform" style={{ width: "100%" }}>
                    {places?.map((place) => (
                      <div
                        onClick={() => {
                          setpob(place);
                          setplaces("");
                        }}
                        className="getplace_input_div chatform_div"
                      >
                        <IoLocationSharp /> {place}
                      </div>
                    ))}
                  </div>
                )}
                <span onClick={() => setpob("")} className="cross_register ">
                  &times;
                </span>
              </div>
              {pobError && <span className="text-danger pr-5">Enter Place of Birth</span>}

              <button type="submit" className="get_otp_btn mt-4" onClick={OTPsend}>
                Submit
              </button>
              <div>
                <p className="text-center mt-2" style={{ width: "100%", margin: "auto", fontSize: "10px" }}>
                  By Proceeding, I Agree to{" "}
                  <span className="terms_condition" onClick={() => navigate("/terms")}>
                    {" "}
                    Terms and Conditions
                  </span>{" "}
                  &{" "}
                  <span className="terms_condition" onClick={() => navigate("/privacypolicy")}>
                    Privacy Policy
                  </span>{" "}
                  and receive alerts via emails and text messages
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </>
  );
};

export default RegisterForm;
