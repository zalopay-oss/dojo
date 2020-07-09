import firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyAz-GPfA-hN74oFh3XvXsF9vQrlE5xpU10",
  authDomain: "wieldy-4f59c.firebaseapp.com",
  databaseURL: "https://wieldy-4f59c.firebaseio.com",
  projectId: "wieldy-4f59c",
  storageBucket: "wieldy-4f59c.appspot.com",
  messagingSenderId: "81949884261",
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const githubAuthProvider = new firebase.auth.GithubAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

const database = firebase.database();

export {
  database,
  auth,
  googleAuthProvider,
  githubAuthProvider,
  facebookAuthProvider,
  twitterAuthProvider,
};
