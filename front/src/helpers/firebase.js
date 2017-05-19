import firebaseui from 'firebaseui';
import firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDSRVxx3kD0VJK_58q7RqRMKVgNM7Kt0L4",
    authDomain: "guess-the-song-454a5.firebaseapp.com",
    databaseURL: "https://guess-the-song-454a5.firebaseio.com",
    storageBucket: "guess-the-song-454a5.appspot.com",
    messagingSenderId: "521165581757"
}

export const app = firebase.initializeApp(firebaseConfig);

export const firebaseAuth = app.auth();
export const firebaseDB = firebase.database();


export function writeUserData(userId, name, email, imageUrl) {
    console.log(userId, name, email, imageUrl);
  firebaseDB.ref('users/' + userId).set({
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}