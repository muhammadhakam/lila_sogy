import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"
//import {getStorage} from "firebase/storage"

const firebaseConfig = {

  apiKey: "AIzaSyA4ulLjf4Jyn4wvuugb_UoO4efJF1eN7-4",

  authDomain: "lila-da027.firebaseapp.com",

  databaseURL: "https://lila-da027-default-rtdb.firebaseio.com",

  projectId: "lila-da027",

  storageBucket: "lila-da027.appspot.com",

  messagingSenderId: "53456226942",

  appId: "1:53456226942:web:91a2279161238c60fa662f",

  measurementId: "G-P2YX734SLZ"

  
  };


  

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const app2 = initializeApp(firebaseConfig);

export const db2 = getDatabase(app2)

export const auth = getAuth()
//export const storage = getStorage()
export {db}