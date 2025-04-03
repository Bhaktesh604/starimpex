
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

const firebaseConfig = {
  "apiKey": "AIzaSyBoE2wDiRW2cYWBxmBskAPKKO510hWVly8",
  "authDomain": "motibagems-f9bdb.firebaseapp.com",
  "projectId": "motibagems-f9bdb",
  "storageBucket": "motibagems-f9bdb.appspot.com",
  "messagingSenderId": "237655731457",
  "appId": "1:237655731457:web:ca4bb406b56ff7e8433f00"
}

firebase.initializeApp(firebaseConfig);
firebase.messaging();
