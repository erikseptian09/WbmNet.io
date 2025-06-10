import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"; // ✅ TAMBAH INI
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

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
const auth = getAuth(app);

export { app, getDatabase, auth }; // ✅ EKSPOR app dan getDatabase
