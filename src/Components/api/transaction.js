import React from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { getBaseUrl } from "../utils";

export const createOrderApi = async (data) => {
  const url = getBaseUrl() + "user_api/orders_create";
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

export const createTransactionApi = async (data) => {
  const url = getBaseUrl() + "user_api/transaction_initiate";
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
