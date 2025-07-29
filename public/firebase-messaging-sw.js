// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
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
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
