import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiW9wTYZX0KyOJTOhGQHQBapyZ9C2K1I0",
  authDomain: "barbershop-16725.firebaseapp.com",
  projectId: "barbershop-16725",
  storageBucket: "barbershop-16725.appspot.com",
  messagingSenderId: "92312495095",
  appId: "1:92312495095:web:d5e8c40a27a8bffff584f2",
};

initializeApp(firebaseConfig);
export const db = getFirestore();
