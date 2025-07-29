import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "./../utils";

export const getHoroscope_api = async (data) => {
  let config = {
    method: "get",
    url: `https://admin.astropush.com/user_api/get_horoscope?sign=${data.sign}&&period=${data.period}&&when=${data.when}`,
    headers: { Authorization: `Bearer ${Cookies.get("accessToken")}` },
  };
  try {
    let res = await axios(config);
    return res;
  } catch (error) {
    console.log(error);
    return error.response;
  }
};
