import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

export const astrocity_api = async (data) => {
  let config = {
    method: "get",
    url: getBaseUrl() + `web/Astrocity?type=${data.country}&type_name=${data.city}`,
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
