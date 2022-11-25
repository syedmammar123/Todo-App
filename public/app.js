// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWSySzPc5SeepWf1YAwP1QD2dWZ8uCdBc",
    authDomain: "dear-doit.firebaseapp.com",
    databaseURL: "https://dear-doit-default-rtdb.firebaseio.com",
    projectId: "dear-doit",
    storageBucket: "dear-doit.appspot.com",
    messagingSenderId: "788506128217",
    appId: "1:788506128217:web:19c517c808cb5a8874e648",
    measurementId: "G-4850DE4YC3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

var email = document.getElementById('email');
var password = document.getElementById('password');
window.login = function (e) {
    e.preventDefault()
    var obj = {
        email: email.value,
        password: password.value,
    }
    signInWithEmailAndPassword(auth, obj.email, obj.password)
        .then(function (success) {
            console.log(success.user.uid)
            window.location.replace('todo.html')
        })
        .catch(function (err) {
            console.log(err)
        });

    
};
