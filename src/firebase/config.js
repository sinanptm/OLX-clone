import firebase from "firebase/compat/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIRE_BASE_API_KEY,
    authDomain: process.env.REACT_APP_FIRE_AUTH_DOMAIN,
    projectId: "fir-43162",
    storageBucket: "fir-43162.appspot.com",
    messagingSenderId: "474167604272",
    appId: process.env.REACT_APP_FIRE_APP_ID,
    measurementId: process.env.REACT_APP_FIRE_MEASUREMENT_ID
};

export default firebase.initializeApp(firebaseConfig);