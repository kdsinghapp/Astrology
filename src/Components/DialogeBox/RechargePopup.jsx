import React from "react";
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   DialogContent,
// } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const RechargePopup = (props) => {
  const navigate = useNavigate();
  const currency = Cookies.get("country");
  const { walletBalance, price, astroUser } = props;
  const dd = Math.trunc(walletBalance / price);
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        onClose={props.close}
      >
        <DialogTitle className="text-center">
          <span className="main_heading_mobile_number_registration">
            Recharge
          </span>
          <span
            className="float-right icon_color"
            onClick={props.close}
          >
            <i
              className="fa fa-times hover_cursor"
              aria-hidden="true"
            ></i>{" "}
          </span>
        </DialogTitle>
        <DialogContent className="px-5">
          <div className="padding_desktop_view">
            <div className="pl-1">
              <div>
                <div className="">
                  <h6>
                    Wallet Balance{" "}
                    <span>
                      {" "}
                      {currency === "INR" ? "₹" : "$"} {parseFloat(walletBalance)?.toFixed(2)}
                    </span>
                  </h6>
                  <h6>
                    Max Duration <span>{dd} min</span>
                  </h6>
                </div>
                {astroUser?.offer === "true" &&
                astroUser?.eligible_offer === "true" ? (
                  <h6 className="text-danger">
                    Please recharge minimum {currency === "INR" ? "₹" : "$"} 1
                    to initiate a 4 minutes free call.
                  </h6>
                ) : (
                  <h6>
                    Please ensure that your balance is above for{" "}
                    {currency === "INR" ? "₹" : "$"}{" "}
                    {(props?.price * 5)?.toFixed(2)}
                  </h6>
                )}
              </div>
              <button
                type="submit"
                className="get_otp_btn mt-4"
                onClick={() => navigate("/add_wallet")}
              >
                RECHARGE
              </button>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default RechargePopup;
