import "./App.css";
import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/HomePage";
import FreeKundli from "./Components/FreeKundli/FreeKundli";
import KundliMatching from "./Components/KundliMatching/KundliMatching";
import Chat_with_Astrologer from "./Components/Chat_with_ Astrologer/Chat_with_ Astrologer";
import Blog from "./Components/Blog/Blog";
import DailyHoroscope from "./Components/DailyHoroscope/DailyHoroscope";
import AstroMall from "./Components/AstroMall/AstroMall";
import LiveAstrologer from "./Components/LiveAstrologer/LiveAstrologer";
import AddWallet from "./Components/AddWallet/AddWallet";
import Payment from "./Components/AddWallet/Payment";
import Transactions from "./Components/AddWallet/Transactions";
import AstrologerProfile from "./Components/Chat_with_ Astrologer/AstrologerProfile";
import Signup from "./Components/Signup/Signup";
import UserProfile from "./Components/UserProfile/UserProfile";
import { NotificationParent } from "../src/Components/utils/Notification";
import UserChat from "./Components/Chat_with_ Astrologer/UserChat";
import Call_with_Astrologer from "./Components/Call_with_Astrologer/Call_with_Astrologer";
import ProductDetails from "./Components/AstroMall/ProductDetails";
import BlogDetails from "./Components/Blog/BlogDetails";
import AskAstrologer from "./Components/AskAstrologer/AskAstrologer";
import Cart from "./Components/AstroMall/Cart";
import { reducer, initialState } from "./reducer/UserReducer";
import UserAddess from "./Components/AstroMall/UserAddess";
import OrderPlaced from "./Components/AstroMall/OrderPlaced";
import OrderDetails from "./Components/AstroMall/OrderDetails";
import Protected from "./Components/utils/ProtectedRoute";
import Errorpage from "./Components/Errorpage";
import WishList from "./Components/WishList/WishList";
import Freekundlidetail from "./Components/FreeKundli/Freekundlidetail";
import Notify from "./Components/Notify/Notify";
import PartnerSlider from "./Components/Crousal/PartnerSlider";
import About from "./Components/PolicyPages/About";
import PrivacyPolicy from "./Components/PolicyPages/PrivacyPolicy";
import TermsConditions from "./Components/PolicyPages/TermsConditions";
import ContactUs from "./Components/PolicyPages/ContactUs";
import UserWallet from "./Components/AddWallet/UserWallet";
import { get_profile_api } from "./Components/api/authapi";
import Cookies from "js-cookie";
import location_api from "./Components/api/location";
import KundliMatchingdetail from "./Components/KundliMatching/KundliMatchingdetail";
import Panchang from "./Components/Panchang/Panchang";
import Numerology from "./Components/Numerology/Numerology";
import ChatHistory from "./Components/ChatHistory/ChatHistory";
import Chatfunction from "./Components/function/Chatfunction";
import ReportList from "./Components/ReportPage/ReportList";
import AstroReportList from "./Components/ReportPage/AstroReportList";
import { ga1, ga2 } from "./googleAnalytics";
import AstroSignup from "./Components/Astrosignup/AstroSignup";
import AstroTermsCondition from "./Components/PolicyPages/AstroTermsCondition";
import Sitemap from "./Components/Sitemap/Sitemap";
import ScrollPageComponent from "./Components/Chat_with_ Astrologer/ScrollPageComponent";
import VedicAstrology from "./Pages/VedicAstrology";
import HinduHolidaysList from "./Components/HinduHolidaysList/HinduHolidaysList";
import Chat_with_Astrologer_City from "./Components/Chat_with_ Astrologer/Chat_with_Astrologer_City";
import Call_with_Astrologer_city from "./Components/Call_with_Astrologer/Call_with_Astrologer_city";
import RefundPolicy from "./Components/PolicyPages/RefundPolicy";
import io from "socket.io-client";
import Moles from "./Components/Moles";
import ZodiacCompatibility from "./Components/ZodiacCompatibility";
import ZodiacSigns from "./Components/ZodiacSigns";
import { notificationHandler } from "./Components/utils/Notification";
// firebase
import { requestForFCMToken, onFCMMessageListener } from "./firebase";
import YogaInKundali from "./Components/YogaInKundali/YogaInKundali";
import Aarti from "./Components/Aarti/Aarti";
import Temples from "./Components/Temples/Temples";
import Palmistry from "./Components/Palmistry/Palmistry";
import Nakshatra from "./Components/Nakshatra/Nakshatra";
import MarriageBiodata from "./Components/MarriageBiodata/MarriageBiodata";
import HinduCalender from "./Components/HinduCalender/HinduCalender";
import GodAndGoddesses from "./Components/GodAndGoddesses/GodAndGoddesses";

export const UserContext = createContext();

const socket = io.connect("https://chat.astropush.com", {
  // autoConnect: true,
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const auth = Cookies.get("auth");

  const userDetail = async () => {
    try {
      const res = await get_profile_api();
      dispatch({
        type: "USER",
        payload: {
          ...state,
          results_web: res.data.results_web,
          wallet: res.data.results_web.wallet,
          notification: res.data.notifications,
          cartItemsLength: res.data.item_total,
        },
      });
      Cookies.set(
        "userID",
        res.data.results_web._id,
        { secure: true },
        { sameSite: "strict" },
        { expires: 365 }
      );
    } catch (error) {}
  };

  const user_location_api = async () => {
    const res = await location_api();
    const country = res.data.country;
    if (country === "IN") {
      Cookies.set(
        "country",
        "INR",
        { secure: true },
        { sameSite: "strict" },
        { expires: 365 }
      );
    } else {
      Cookies.set(
        "country",
        "USD",
        { secure: true },
        { sameSite: "strict" },
        { expires: 365 }
      );
    }
  };

  useEffect(() => {
    if (auth === "true") {
      userDetail();
    }
  }, [auth]);

  useEffect(() => {
    user_location_api();
  }, []);

  const getFCMToken = async () => {
    try {
      const resp = await requestForFCMToken();
      if (resp) {
        Cookies.set("fcmToken", resp);
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    } catch (error) {
      console.error("An error occurred while retrieving token. ", error);
    }
  };

  useEffect(() => {
    getFCMToken();
  }, []);

  onFCMMessageListener()
    .then((payload) => {
      notificationHandler({
        type: "success",
        msg: (
          <div style={{ width: "250px" }}>
            <strong>{payload.notification.title}</strong>
            <br />
            <span>{payload.notification.body}</span>
          </div>
        ),
      });
    })
    .catch((err) => console.error("failed: ", err));

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <NotificationParent timeout={6500} />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          ></Route>
          <Route
            path="/chatfunction"
            element={<Chatfunction />}
          ></Route>
          <Route
            path="/PartnerSlider"
            element={<PartnerSlider />}
          ></Route>
          <Route
            path="/free-kundli-online"
            element={<FreeKundli />}
          ></Route>
          <Route
            path="/free-kundali-matching"
            element={<KundliMatching />}
          ></Route>
          <Route
            path="/chat-with-astrologer"
            element={<Chat_with_Astrologer socket={socket} />}
          ></Route>
          <Route
            path="/astrologer/:country"
            element={<Chat_with_Astrologer_City />}
          ></Route>
          <Route
            path="/astrologer/:country/:city"
            element={<Chat_with_Astrologer_City />}
          ></Route>
          <Route
            path="/best-astrologer/:country"
            element={<Call_with_Astrologer_city />}
          ></Route>
          <Route
            path="/best-astrologer/:country/:city"
            element={<Call_with_Astrologer_city />}
          ></Route>
          <Route
            path="/blog"
            element={<Blog />}
          ></Route>
          <Route
            path="/sitemap"
            element={<Sitemap />}
          ></Route>
          <Route
            path="/ScrollPageComponent"
            element={<ScrollPageComponent />}
          ></Route>
          <Route
            exact
            path="/horoscope/:period/:sign"
            element={<DailyHoroscope />}
          ></Route>
          <Route
            path="/astroshop"
            element={<AstroMall />}
          ></Route>
          <Route
            path="/productdetail/:id"
            element={<ProductDetails />}
          ></Route>
          <Route
            path="/live_astrologer"
            element={<LiveAstrologer />}
          ></Route>
          <Route
            path="/astrologer_profile"
            element={<AstrologerProfile />}
          ></Route>
          <Route
            path="/astrologer_profile/:id"
            element={<AstrologerProfile />}
          ></Route>
          <Route
            path="/signup"
            element={<Signup />}
          ></Route>
          <Route
            path="/talk-to-astrologer"
            element={<Call_with_Astrologer />}
          ></Route>
          <Route
            path="/blog/:slug"
            element={<BlogDetails />}
          ></Route>
          <Route
            path="/askastrologer"
            element={<AskAstrologer />}
          ></Route>
          <Route
            path="/kundlidetail"
            element={<Freekundlidetail />}
          ></Route>
          <Route
            path="/about"
            element={<About />}
          ></Route>
          <Route
            path="/privacypolicy"
            element={<PrivacyPolicy />}
          ></Route>
          <Route
            path="/refundpolicy"
            element={<RefundPolicy />}
          ></Route>
          <Route
            path="/terms"
            element={<TermsConditions />}
          ></Route>
          <Route
            path="/astro-terms"
            element={<AstroTermsCondition />}
          ></Route>
          <Route
            path="/contact"
            element={<ContactUs />}
          ></Route>
          <Route
            path="/free-numerology-online"
            element={<Numerology />}
          ></Route>
          <Route
            path="/free-panchang-online"
            element={<Panchang />}
          ></Route>
          <Route
            path="/reportlist"
            element={<ReportList />}
          ></Route>
          <Route
            path="/astro-report-list"
            element={<AstroReportList />}
          ></Route>
          <Route
            path="/astrologer-signup"
            element={<AstroSignup />}
          ></Route>
          <Route
            path="/vedic-astrology"
            element={<VedicAstrology />}
          ></Route>
          <Route
            path="/hindu-festivals-calendar"
            element={<HinduHolidaysList />}
          ></Route>
          <Route
            path="/moles"
            element={<Moles />}
          ></Route>

          <Route
            path="/zodiac-compatibility"
            element={<ZodiacCompatibility />}
          ></Route>
          <Route
            path="/zodiac-signs"
            element={<ZodiacSigns />}
          ></Route>
          <Route
            path="/yoga-in-kundali"
            element={<YogaInKundali />}
          ></Route>
          <Route
            path="/aarti"
            element={<Aarti />}
          ></Route>
          <Route
            path="/temples"
            element={<Temples />}
          ></Route>
          <Route
            path="/palmistry"
            element={<Palmistry />}
          ></Route>
          <Route
            path="/nakshatra"
            element={<Nakshatra />}
          ></Route>
          <Route
            path="/marriage-biodata"
            element={<MarriageBiodata />}
          ></Route>
          <Route
            path="/hindu-calender"
            element={<HinduCalender />}
          ></Route>
          <Route
            path="/gods-and-goddesses"
            element={<GodAndGoddesses />}
          ></Route>
          {/* Protected Routes */}
          <Route
            path="/add_wallet"
            element={<AddWallet />}
          ></Route>
          <Route
            path="/user_wallet"
            element={
              <Protected>
                <UserWallet />
              </Protected>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <Protected>
                <Payment />
              </Protected>
            }
          ></Route>
          <Route
            path="/chat-history"
            element={
              <Protected>
                <ChatHistory />
              </Protected>
            }
          ></Route>
          <Route
            path="/userprofile"
            element={
              <Protected>
                <UserProfile />
              </Protected>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <Protected>
                <UserChat socket={socket} />
              </Protected>
            }
          ></Route>

          <Route
            path="/cart"
            element={
              <Protected>
                <Cart />
              </Protected>
            }
          ></Route>
          <Route
            path="/transactions"
            element={
              <Protected>
                <Transactions />
              </Protected>
            }
          ></Route>
          <Route
            path="/useraddess"
            element={
              <Protected>
                <UserAddess />
              </Protected>
            }
          ></Route>
          <Route
            path="/Order"
            element={
              <Protected>
                <OrderPlaced />
              </Protected>
            }
          ></Route>
          <Route
            path="/OrderDetails"
            element={
              <Protected>
                <OrderDetails />
              </Protected>
            }
          ></Route>
          <Route
            path="/wishlist"
            element={
              <Protected>
                <WishList />
              </Protected>
            }
          ></Route>
          <Route
            path="/notify"
            element={
              <Protected>
                <Notify />
              </Protected>
            }
          ></Route>
          <Route
            path="/match-making-details"
            element={<KundliMatchingdetail />}
          ></Route>

          {/* 404 page error */}
          <Route
            path="*"
            element={<Errorpage />}
          ></Route>
        </Routes>
      </UserContext.Provider>
    </>
  );
}

export default App;
