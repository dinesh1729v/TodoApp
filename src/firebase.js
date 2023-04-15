import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCINZn_z--Rsm7JijiA3La4dfJZ_fT2u3w",
  authDomain: "todo-list-9e19e.firebaseapp.com",
  databaseURL: "https://todo-list-9e19e-default-rtdb.firebaseio.com",
  projectId: "todo-list-9e19e",
  storageBucket: "todo-list-9e19e.appspot.com",
  messagingSenderId: "503337931780",
  appId: "1:503337931780:web:8cfec1bd5ae6e33067d151",
  measurementId: "G-JKHTCCHS0C"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
