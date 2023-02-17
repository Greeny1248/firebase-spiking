// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore} from "@firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAzql4XX7pJlmaiOQdKtMMi_7FbBEMtDU0",

  authDomain: "fir-with-react-c4cc3.firebaseapp.com",

  projectId: "fir-with-react-c4cc3",

  storageBucket: "fir-with-react-c4cc3.appspot.com",

  messagingSenderId: "454229509146",

  appId: "1:454229509146:web:a69de54339b5a0127f7da3",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app)
