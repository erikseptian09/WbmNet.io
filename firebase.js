import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAJ2m4MOTQxw9VgY4IdIO9_E6fiX-9G9VY",
  authDomain: "paymentpelanggan.firebaseapp.com",
  databaseURL: "https://paymentpelanggan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "paymentpelanggan",
  storageBucket: "paymentpelanggan.appspot.com",
  messagingSenderId: "788101237037",
  appId: "1:788101237037:web:5206ab2fe12a958fa42ba4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
