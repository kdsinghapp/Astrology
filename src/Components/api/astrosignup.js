import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const skill_list = getBaseUrl() + "astrologer_api/skill_list";
const language_list = getBaseUrl() + "astrologer_api/language_list";
const category_list = getBaseUrl() + "astrologer_api/category_list";
const location_list = getBaseUrl() + "astrologer_api/location_list";
const astrologer_register = getBaseUrl() + "astrologer_api/astrologer_register";

export const astrologer_register_api = async (data) => {
  let config = {
    method: "post",
    url: astrologer_register,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
export const location_list_api = async (data) => {
  let config = {
    method: "post",
    url: location_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
    data: data,
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const category_list_api = async () => {
  let config = {
    method: "post",
    url: category_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const language_list_api = async () => {
  let config = {
    method: "post",
    url: language_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};

export const skill_list_api = async () => {
  let config = {
    method: "post",
    url: skill_list,
    headers: { Authorization: `Bearer ${Cookies.get("token")}` },
  };

  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
