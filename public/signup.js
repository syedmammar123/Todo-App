 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
 import { getAuth ,signInWithEmailAndPassword,createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

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

var  firstName=document.getElementById('fname');
var  lastName=document.getElementById('lname');
var  password=document.getElementById('password');
var  email=document.getElementById('email');

window.signup = function (e) {
  e.preventDefault()
  if(firstName.value=="" || lastName.value=="" || password.value=="" || email.value==""){
    alert("fill all fields!")
  }
else{
  var obj = {
    firstName: firstName.value,
    lastName: lastName.value,
    email: email.value,
    password: password.value,
  };

  createUserWithEmailAndPassword(auth, obj.email, obj.password)
  .then(function(success){
    console.log(success.user.uid)
    window.location.replace('index.html')
  })
  .catch(function(err){
    console.log(err)
    alert(err)
  });
}
};









// function submition(){
//   if(fname.value=="" || lname.value=="" || zip.value=="" || number.value=="" || email.value=="" )
//   {
//     alert("Fill all fields")
//   }

// };
// function fnamevalid(){
//   if(fname.value=="")
//   {
//     alert("Must enter First Name ")
//   }
// else{
//   var counter=0;
//   for(var i=0; i<(fname.value).length;i++)
//   {
//     if (isNaN((fname.value).charAt(i))){
//       // if alphabet then it is executed or it will go to else
//     }
//     else {counter++}
//   }

//   if(counter>0){
//     alert("You cannot enter a number in Name");
//     fname.placeholder="Enter Text Only";
//     fname.value=""
//   }
// }
// }
// function lnamevalid(){
//   if(lname.value=="")
//   {
//     alert("Must enter Last Name ")
//   }
// else{
//   var counter=0;
//   for(var i=0; i<(lname.value).length;i++)
//   {
//     if (isNaN((lname.value).charAt(i))){
//       // if alphabet then it is executed or it will go to else
//     }
//     else {counter++}
//   }

//   if(counter>0){
//     alert("You cannot enter a number in Name");
//     lname.placeholder="Enter Text Only";
//     lname.value=""
//   }
// }
// }
// function emailvalid(){
//   if(email.value=="")
//   {
//     alert("Must enter an email")
//   }
// else{
//   var counter=0;
//   for(var i=0; i<(email.value).length;i++)
//   {
//     if ((email.value).charAt(i)==='@'){
//       counter++;
//     }
   
//   }
//   if(counter==1){
   
//   }
//   else{
//     alert("There must be an '@' in an email");
//     email.placeholder="Enter email with 1 '@' sign";
//     email.value=""
//   }
// }
// }