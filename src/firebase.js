import firebase from 'firebase';

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBhrgugLuYsqQwv1hISIaqZ7ZYyFb7Zu7c",
    authDomain: "project-five-react-app.firebaseapp.com",
    databaseURL: "https://project-five-react-app.firebaseio.com",
    projectId: "project-five-react-app",
    storageBucket: "project-five-react-app.appspot.com",
    messagingSenderId: "764839463965",
    appId: "1:764839463965:web:a41d6a8afe2c5bba0b8af4"
    };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
