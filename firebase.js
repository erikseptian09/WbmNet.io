// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJ2m4MOTQxw9VgY4IdIO9_E6fiX-9G9VY",
  authDomain: "paymentpelanggan.firebaseapp.com",
  databaseURL: "https://paymentpelanggan-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "paymentpelanggan",
  storageBucket: "paymentpelanggan.firebasestorage.app",
  messagingSenderId: "788101237037",
  appId: "1:788101237037:web:5206ab2fe12a958fa42ba4",
  measurementId: "G-PJCYE6RDZJ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
