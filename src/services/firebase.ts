import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkQe0tqgET22AuM-ZrDSO-Exigu8dPvUU",
  authDomain: "lablnet-86a04.firebaseapp.com",
  projectId: "lablnet-86a04",
  storageBucket: "lablnet-86a04.appspot.com",
  messagingSenderId: "489647771343",
  appId: "1:489647771343:web:f45ec8cbf2e2d22549f1ba"
};

const app = initializeApp(firebaseConfig);

export {
    app
}
