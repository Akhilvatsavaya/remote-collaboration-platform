    import {initializeApp} from "firebase/app";
    import {getAuth} from "firebase/auth";

    const firebaseConfig = {
      apiKey: "AIzaSyC1WUefNCevbSe5AWoQn7QEdFHuoWhnD1w",
      authDomain: "remote-collaboration-platform.firebaseapp.com",
      projectId: "remote-collaboration-platform",
      storageBucket: "remote-collaboration-platform.appspot.com",
      messagingSenderId: "25736081048",
      appId: "1:25736081048:web:babe7b499952b8dea32aed",
      measurementId: "G-8XDPM89S1X"
    };

    const app = initializeApp(firebaseConfig);
    export const auth = getAuth(app);