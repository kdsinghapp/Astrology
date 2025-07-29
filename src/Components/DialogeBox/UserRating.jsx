import React, { useState } from "react";
// import {
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   DialogContent,
// } from "@material-ui/core";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { addUserRatingApi } from "../api/userrating";
import { notificationHandler } from "../utils/Notification";

const UserRating = ({ open, close, astroUser, type }) => {
  const [rating, setRating] = useState("");
  const [review, setreview] = useState("");
  const navigate = useNavigate();

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  const SubmitRating = async () => {
    try {
      let temp = {
        channel_id: astroUser?.channelId,
        rating: rating,
        review: review,
      };
      const res = await addUserRatingApi(temp);
      notificationHandler({ type: "success", msg: res.data.message });
      if (res.data.status) {
        if (type === "Chat") {
          navigate("/chat-with-astrologer");
          setTimeout(() => {
            window.location.reload();
          }, 100);
        }
        if (type === "Audio") {
          close();
        }
      }
    } catch (error) {
      console.log(error);
      notificationHandler({ type: "danger", msg: "Network error" });
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth={100}
        hideCloseIcon={true}
      >
        <div className="text-center pt-4">
          {astroUser?.profile_img && (
            <div className="astro_rating">
              <img
                src={astroUser?.profile_img}
                alt={astroUser?.name}
              />
            </div>
          )}
          <div className="mt-1">Call Type : {type}</div>
          <h6 className="mt-1">
            Please rate your experience with {astroUser?.name}
          </h6>
        </div>
        <DialogContent className="px-5">
          <div className="padding_desktop_view d-flex justify-content-center">
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={40}
              color2={"#ffd700"}
            />
          </div>
          <textarea
            style={{
              width: "100%",
            }}
            className="form-control"
            placeholder="Share more about your experience"
            rows={5}
            onChange={(e) => setreview(e.target.value)}
          />
          <button
            type="submit"
            className="get_otp_btn mt-4"
            onClick={() => SubmitRating()}
            disabled={!rating}
          >
            Submit
          </button>
        </DialogContent>
        <DialogActions className="px-5 pb-2"></DialogActions>
      </Dialog>
    </div>
  );
};

export default UserRating;
