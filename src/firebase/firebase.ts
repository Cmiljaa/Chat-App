import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCxKoo5GhPLoDynSwb_fK3ikr_Lpf_cTsg",
  authDomain: "chat-app-33b9c.firebaseapp.com",
  projectId: "chat-app-33b9c",
  storageBucket: "chat-app-33b9c.firebasestorage.app",
  messagingSenderId: "26125830552",
  appId: "1:26125830552:web:9c8a96c4127153abfc03ed",
  databaseURL: "https://chat-app-33b9c-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export { app };