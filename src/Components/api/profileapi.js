import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const profile_update = getBaseUrl() + "user_api/profile_update";
const profile_update_img = getBaseUrl() + "user_api/profile_update_img";
const remove_user_profile_pic = getBaseUrl() + "user_api/remove_user_profile_pic";

export const remove_profile_img_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(remove_user_profile_pic, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const profile_update_img_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.post(profile_update_img, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

const profile_update_api = async (data) => {
  try {
    let config = {
      headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    };
    return await axios.put(profile_update, data, config);
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export default profile_update_api;
