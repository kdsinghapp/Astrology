import React, { useEffect, useState } from "react";
import withHOC from "../../Common/HOC";
import "./astrosignup.module.css";
// import { Grid } from "@material-ui/core";
// import { Card } from "@material-ui/core";
import { Card, Grid } from "@mui/material";
import Select from "react-select";
import { skill_list_api, language_list_api, category_list_api, location_list_api, astrologer_register_api } from "../api/astrosignup";
import { notificationHandler } from "../utils/Notification";
import { Stepper, Step } from "react-form-stepper";
import { useNavigate } from "react-router-dom";
import Loder from "../Loder/Loder";
const AstroSignup = () => {
  const [portalstatus, setportalstatus] = useState(false);
  const [terms, setterms] = useState(false);
  const [isloading, setisloading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const [formdata, setformdata] = useState({
    email: "",
    name: "",
    gst: "",
    displayname: "",
    number: "",
    deviceType: "",
    deviceID: "",
    deviceToken: "",
    gender: "male",
    password: "",
    about: "",
    experience: "",
    address: "",
    country_id: "",
    state_id: "",
    city_id: "",
    language: "",
    skill: "",
    category: "",
    report_type: "",
    account_holder_name: "",
    account_no: "",
    bank: "",
    ifsc: "",
    dob: "",
    aadhar_card_no: "",
    is_chat: "",
    is_voice_call: "",
    is_video_call: "",
    per_min_chat: "",
    per_min_voice_call: "",
    per_min_video_call: "",
    profile_img: "",
    aadhar_card_img: "",
    pan_card_img: "",
  });

  const formdatafunction = (e) => {
    if (e.target.name === "pan_card_img" || e.target.name === "aadhar_card_img" || e.target.name === "profile_img") {
      setformdata({
        ...formdata,
        [e.target.name]: e.target.files[0],
      });
      return;
    }
    setformdata({
      ...formdata,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    all_list_arry();
  }, []);
  const [skillArry, setskillArry] = useState([]);
  const [languageArry, setlanguageArry] = useState([]);
  const [categoryArry, setcategoryArry] = useState([]);
  const [skillArryId, setskillArryId] = useState([]);
  const [languageArryId, setlanguageArryId] = useState([]);
  const [categoryArryId, setcategoryArryId] = useState([]);
  const [Allstate, setAllstate] = useState([]);
  const [Allcity, setAllcity] = useState([]);
  const all_list_arry = async () => {
    try {
      let res = await skill_list_api();
      let res2 = await language_list_api();
      let res3 = await category_list_api();
      if (res.data.status) {
        let skill = res.data.results.map((item) => {
          item = { value: item.id, label: item.name };
          return item;
        });
        setskillArry(skill);
      }
      if (res2.data.status) {
        let language = res2.data.results.map((item) => {
          item = { value: item.id, label: item.name };
          return item;
        });
        setlanguageArry(language);
      }
      if (res3.data.status) {
        let category = res3.data.results.map((item) => {
          item = { value: item.id, label: item.name };
          return item;
        });
        setcategoryArry(category);
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };
  useEffect(() => {
    allcountrylist_arry();
  }, []);
  const [allcountry, setallcountry] = useState([]);
  // country code
  const allcountrylist_arry = async () => {
    let temp = {
      countries_id: "",
      states_id: "",
    };
    try {
      let res = await location_list_api(temp);

      if (res.data.status) {
        setallcountry(res.data.results);
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };

  const statelist_arry = async (id) => {
    let temp = {
      countries_id: id,
      states_id: "",
    };
    try {
      let res = await location_list_api(temp);
      if (res.data.status) {
        setAllstate(res?.data?.results);
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };
  const findcityfunction = async (ID) => {
    let temp = {
      countries_id: formdata.country_id,
      states_id: ID,
    };
    try {
      let res = await location_list_api(temp);

      if (res.data.status) {
        setAllcity(res?.data?.results);
      }
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
    }
  };

  const handleChange = (selected) => {
    setskillArryId(selected);
  };
  const handleChange1 = (selected) => {
    setlanguageArryId(selected);
  };
  const handleChange2 = (selected) => {
    setcategoryArryId(selected);
  };

  const formsubmitfun = async () => {
    setisloading(true);
    const fd = new FormData();
    fd.append("email", formdata.email);
    fd.append("name", formdata.name);
    fd.append("displayname", formdata.displayname);
    fd.append("number", formdata.number);
    fd.append("deviceType", "");
    fd.append("deviceID", "");
    fd.append("status", false);
    fd.append("deviceToken", "");
    fd.append("password", formdata.password);
    fd.append("about", formdata.about);
    fd.append("experience", formdata.experience);
    fd.append("address", formdata.address);
    fd.append("country_id", formdata.country_id);
    fd.append("state_id", formdata.state_id);
    fd.append("city_id", formdata.city_id);
    fd.append("language", languageArryId?.map((item) => item?.value)?.toString());
    fd.append("skill", skillArryId?.map((item) => item?.value)?.toString());
    fd.append("category", categoryArryId?.map((item) => item?.value)?.toString());
    fd.append("report_type", "");
    fd.append("dob", formdata.dob);
    fd.append("gender", formdata.gender);
    fd.append("account_type", "");
    fd.append("account_holder_name", formdata.account_holder_name);
    fd.append("account_no", formdata.account_no);
    fd.append("bank", formdata.bank);
    fd.append("ifsc", formdata.ifsc);
    fd.append("aadhar_card_no", formdata.aadhar_card_no);
    fd.append("profile_img", formdata.profile_img);
    fd.append("aadhar_card_img", formdata.aadhar_card_img);
    fd.append("pan_card_img", formdata.pan_card_img);
    fd.append("gst", formdata.gst);

    try {
      let res = await astrologer_register_api(fd);
      if (res.data.status) {
        setisloading(false);
        notificationHandler({ type: "success", msg: res.data.message });
        return;
      }
      setisloading(false);
      notificationHandler({ type: "danger", msg: res.data.message });
    } catch (error) {
      notificationHandler({ type: "danger", msg: error.message });
      console.log(error);
      setisloading(false);
    }
  };
  const [goSteps, setGoSteps] = useState(0);
  return (
    <>
      <div className="Contact_Page_padding">
        <div className="container">
          <div className="card_section pb-5">
            <Card className="Card_shadow p-3 mt-5">
              <Stepper
                style={{ width: "80%", margin: "auto" }}
                activeStep={goSteps}
                alternativeLabel
                styleConfig={{
                  activeBgColor: "#4285F4",
                  activeTextColor: "#FFFFFF",
                  inactiveBgColor: "#FFFFFF",
                  inactiveTextColor: "#000",
                  completedBgColor: "#4285F4",
                  completedTextColor: "#FFF",
                  size: "2.5em",
                }}
              >
                <Step onClick={() => setGoSteps(0)} label="" />
                <Step onClick={() => setGoSteps(1)} label="" />
                <Step onClick={() => setGoSteps(2)} label="" />
              </Stepper>
              <div className="text-center mt-3 mb-3">
                <h4> Sign up Astrologer</h4>
              </div>
              <div className="card_admissiondetails_height">
                <div className="textfiled_margin">
                  <Grid className="Component_main_grid">
                    {goSteps === 0 && (
                      <>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Display Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="displayname"
                              value={formdata.displayname}
                              onChange={(e) => formdatafunction(e)}
                              placeholder="Display Name"
                            />
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Real Name</label>
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              value={formdata.name}
                              onChange={(e) => formdatafunction(e)}
                              placeholder="Real Name"
                            />
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Email</label>
                            <input
                              type="text"
                              className="form-control"
                              value={formdata.email}
                              onChange={(e) => formdatafunction(e)}
                              name="email"
                              placeholder="Email"
                            />
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Mobile Number</label>
                            <input
                              type="nember"
                              className="form-control"
                              name="number"
                              placeholder="Number"
                              value={formdata.number}
                              onChange={(e) => formdatafunction(e)}
                            />
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Alternative Mobile Number</label>
                            <input type="nember" className="form-control" name="number" placeholder="Alternative Mobile Number" />
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Date of Birth</label>
                            <input
                              type="date"
                              name="dob"
                              value={formdata.dob}
                              onChange={(e) => formdatafunction(e)}
                              max={new Date().toISOString().slice(0, 10)}
                              className="form-control"
                              placeholder="Enter DOB"
                            />
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Gender</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  value={formdata.gender}
                                  onChange={(e) => formdatafunction(e)}
                                  id="exampleFormControlSelect1"
                                  name="gender"
                                >
                                  <option value="male">Male </option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Skills</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <Select isMulti options={skillArry} onChange={handleChange} value={skillArryId} />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Category</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <Select isMulti options={categoryArry} onChange={handleChange2} value={categoryArryId} />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Are you working on any other online portal</label>
                            <div className="d-flex  mr-2">
                              <div class="form-check pr-2">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  checked={portalstatus == true ? true : false}
                                  id="flexRadioDefault1"
                                  onClick={() => setportalstatus(true)}
                                />
                                <label class="form-check-label" for="flexRadioDefault1">
                                  Yes
                                </label>
                              </div>
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  checked={portalstatus == false ? true : false}
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  onClick={() => setportalstatus(false)}
                                />
                                <label class="form-check-label" for="flexRadioDefault2">
                                  No
                                </label>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        {portalstatus ? (
                          <>
                            <Grid item md={6} sm={12} xs={12} className="p-1">
                              <div className="form-group">
                                <label for="exampleInputEmail1">Portal Name</label>
                                <div className="  mr-2">
                                  <div className="form-group">
                                    <input type="text" name="dob" className="form-control" placeholder="Enter the portal name here" />
                                  </div>
                                </div>
                              </div>
                            </Grid>
                            <Grid item md={6} sm={12} xs={12} className="p-1">
                              <div className="form-group">
                                <label for="exampleInputEmail1">Monthly Earn from Astrologer</label>
                                <div className="  mr-2">
                                  <div className="form-group">
                                    <input type="text" name="dob" className="form-control" placeholder="Enter monthly Income" />
                                  </div>
                                </div>
                              </div>
                            </Grid>
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                    {goSteps === 1 && (
                      <>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Experience</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="number"
                                  value={formdata.experience}
                                  name="experience"
                                  onChange={(e) => formdatafunction(e)}
                                  className="form-control"
                                  placeholder="Experience"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Address</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="address"
                                  value={formdata.address}
                                  onChange={(e) => formdatafunction(e)}
                                  className="form-control"
                                  placeholder="Present Address"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Select Language</label>
                            <div className="  mr-2">
                              <Select isMulti options={languageArry} onChange={handleChange1} value={languageArryId} />
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Select Country</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  name="country_id"
                                  value={formdata.country_id}
                                  onChange={(e) => {
                                    setAllcity([]);
                                    formdatafunction(e);
                                    statelist_arry(e.target.value);
                                  }}
                                  id="exampleFormControlSelect1"
                                >
                                  {allcountry.map((data, index) => (
                                    <option key={index} value={data.id}>
                                      {data.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Select State</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  id="exampleFormControlSelect1"
                                  value={formdata.state_id}
                                  name="state_id"
                                  onChange={(e) => {
                                    formdatafunction(e);
                                    findcityfunction(e.target.value);
                                  }}
                                >
                                  {Allstate.map((data, index) => (
                                    <option key={index} value={data.id}>
                                      {data.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Select City</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  id="exampleFormControlSelect1"
                                  value={formdata.city_id}
                                  name="city_id"
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                >
                                  {Allcity.map((data, index) => (
                                    <option key={index} value={data.id}>
                                      {data.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Pincode</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input type="text" name="" className="form-control" placeholder="Pincode" />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">PAN Card Number</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input type="text" name="" className="form-control" placeholder="PAN Card Number" />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Aadhar Number</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="number"
                                  value={formdata.aadhar_card_no}
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                  name="aadhar_card_no"
                                  className="form-control"
                                  placeholder="Aadhar Number"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">GST Number</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="test"
                                  name="gst"
                                  value={formdata.gst}
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                  className="form-control"
                                  placeholder="GST Number"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                      </>
                    )}
                    {goSteps === 2 && (
                      <>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Aadhar Image</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input type="file" className="form-control" name="aadhar_card_img" accept="image/*" onChange={(e) => formdatafunction(e)} />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">PAN Image</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="file"
                                  name="pan_card_img"
                                  accept="image/*"
                                  onChange={(e) => formdatafunction(e)}
                                  className="form-control"
                                  placeholder=""
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Profile Image</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input type="file" name="profile_img" accept="image/*" onChange={(e) => formdatafunction(e)} className="form-control" />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Password </label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="password"
                                  value={formdata.password}
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                  className="form-control"
                                  placeholder="Enter Password"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>

                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Account Holder Name </label>
                            <div className="mr-2">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="account_holder_name"
                                  placeholder="Account Holder Name"
                                  value={formdata.account_holder_name}
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Bank</label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="bank"
                                  placeholder="Bank Name"
                                  value={formdata.bank}
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Account No </label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="number"
                                  name="account_no"
                                  placeholder="Account No"
                                  value={formdata.account_no}
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={6} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">IFSC Code </label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <input
                                  type="text"
                                  name="ifsc"
                                  placeholder="Enter IFSC"
                                  value={formdata.ifsc}
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <Grid item md={12} sm={12} xs={12} className="p-1">
                          <div className="form-group">
                            <label for="exampleInputEmail1">Short Bio </label>
                            <div className="  mr-2">
                              <div className="form-group">
                                <textarea
                                  rows={3}
                                  type="text"
                                  name="about"
                                  value={formdata.about}
                                  onChange={(e) => {
                                    formdatafunction(e);
                                  }}
                                  className="form-control"
                                  placeholder="Bio"
                                />
                              </div>
                            </div>
                          </div>
                        </Grid>
                        <div className="form-check" style={{ textAlign: "center", margin: "auto", fontSize: "14px" }}>
                          <input className="form-check-input" type="checkbox" value={terms} checked={terms ? true : false} onClick={(e) => setterms(!terms)} />
                          <label className="form-check-label">
                            By Proceeding, I Agree to{" "}
                            <a style={{ cursor: "pointer", color: "var(--clr-primary)" }} href="https://astropush.com/astro-terms" target="_blank">
                              {" "}
                              Terms and Conditions{" "}
                            </a>{" "}
                            &{" "}
                            <a style={{ cursor: "pointer", color: "var(--clr-primary)" }} href="https://astropush.com/privacypolicy" target="_blank">
                              Privacy Policy{" "}
                            </a>{" "}
                            and receive alerts via emails and text messages
                          </label>
                        </div>
                      </>
                    )}
                  </Grid>

                  <div className="text-center-button mt-1 ">
                    {goSteps === 0 && (
                      <button className="intrest_button" onClick={() => setGoSteps(1)}>
                        Next
                      </button>
                    )}
                    {goSteps === 1 && (
                      <button className="intrest_button" onClick={() => setGoSteps(2)}>
                        Next
                      </button>
                    )}
                    {goSteps === 2 && (
                      <button
                        className="intrest_button"
                        onClick={() => {
                          if (!terms) {
                            alert("terms");
                            return;
                          }
                          formsubmitfun();
                        }}
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <Loder loading={isloading} />
    </>
  );
};

export default withHOC(AstroSignup);
