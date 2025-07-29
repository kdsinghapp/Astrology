import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyBw4gOvMq9XNjeCe8QQBTO_N5CXuVwG2Uw",
  authDomain: "astropush-36f61.firebaseapp.com",
  databaseURL: "https://astropush-36f61-default-rtdb.firebaseio.com",
  projectId: "astropush-36f61",
  storageBucket: "astropush-36f61.appspot.com",
  messagingSenderId: "533155375750",
  appId: "1:533155375750:web:43e06d213387bb3446ff07",
  measurementId: "G-16NGMRD6RS",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging();

export const auth = getAuth(app);

export const requestForFCMToken = () => {
  return getToken(messaging, { vapidKey: process.env.REACT_APP_VAPID_KEY });
};

export const onFCMMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
