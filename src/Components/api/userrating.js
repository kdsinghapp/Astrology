import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

const add_rating = getBaseUrl() + "user_api/add_rating";

export const addUserRatingApi = async (data) => {
  console.log(data);
  try {
    return await axios.post(add_rating, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};

export const getUserRatingByIdApi = async (data) => {
  const url = getBaseUrl() + "user_api/review_list_by_channel_id";
  try {
    return await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
  } catch (error) {
    return error.response;
  }
};
