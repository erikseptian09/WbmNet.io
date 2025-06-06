// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXnXCSXhy06eqWBPzYmzxCo_LBzl51DO4",
  authDomain: "wibawamulianetwork.firebaseapp.com",
  databaseURL: "https://wibawamulianetwork-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "wibawamulianetwork",
  storageBucket: "wibawamulianetwork.firebasestorage.app",
  messagingSenderId: "605020393823",
  appId: "1:605020393823:web:e056ed193d9699e64da6ea",
  measurementId: "G-NNY0Y06HNG"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
