import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "MASUKKAN_API_KEY",

  authDomain: "PROJECT-ID.firebaseapp.com",

  projectId: "PROJECT-ID",

  storageBucket: "PROJECT-ID.firebasestorage.app",

  messagingSenderId: "MESSAGING-SENDER-ID",

  appId: "APP-ID",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
