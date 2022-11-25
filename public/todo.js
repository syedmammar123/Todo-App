// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth,
    onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase,push,ref,set,onChildAdded,remove,update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
const database= getDatabase(app);
let uid;

setTimeout(function(){getData();},1000)

onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
    } else {
      logout();
    }
  });
  

window.logout=function(){
    signOut(auth)
    .then(() => {
        window.location.replace('index.html')
      }).catch((error) => {
       alert(error)
      });
    
}

var input=document.getElementById('input')
var toDoItems= document.getElementById('to-do-item')

window.sendData=function(){
    var obj={
        task:input.value,
        dateTime:JSON.stringify(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}  ${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`),
    }
    const refKey = ref(database ,`${uid}/todotask/`)
    obj.id=push(refKey).key
    const taskRef = ref(database,`${uid}/todotask/${obj.id}`);
    set(taskRef,obj);
    getData();
}

window.getData=function(){
    toDoItems.innerHTML=""
    const taskRef=ref(database,`${uid}/todotask/`)
    onChildAdded(taskRef,function(data){       
        toDoItems.innerHTML+=`<div class='boss'>
        <div class="item">
        <div class="item1">
            <div>${data.val().task}</div>
        </div>
        <div class="item2"><i class="fa-solid fa-pen-to-square" onclick="edit(this,'${data.val().id}')"></i></div>
        <div class="item3"><i class="fa-solid fa-trash" onclick="removing(this,'${data.val().id}')"></i></div>
    </div>
    <div class="date">${data.val().dateTime}</div>
    </div>` 

});
}



window.submitt=function(){
    if (input.value != "") {
        sendData();
    input.value = ""
    input.placeholder="eg do homework..."
}
else {
    input.placeholder=  "Enter something..."
}
}



window.removing=function(a,id){ 
    const taskRef = ref(database,`${uid}/todotask//${id}`);
    remove(taskRef)
    .then(function (e) {
        getData()
    })
    .catch(function (err) {
        console.log(err)
    });

}


window.edit=function(a,id){
    input.focus()
    a.setAttribute('class',"fa-solid fa-check")
    input.value=a.parentNode.previousElementSibling.textContent
    a.setAttribute('onclick',`save(this,'${id}')`)
}

window.save=function(a,id){
    if(input.value!=""){
    a.setAttribute('class',"fa-solid fa-pen-to-square")
    const taskRef = ref(database,`${uid}/todotask/${id}`);
    var obj={
        task:input.value,
        dateTime:JSON.stringify(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}  ${new Date().getHours()}-${new Date().getMinutes()}-${new Date().getSeconds()}`),
        id:id,
    }
    update(taskRef,obj)
    .then(function (e) {
        getData()
    })
    .catch(function (err) {
        alert(err)
    });

    a.setAttribute('onclick', 'edit(this)')
    input.value=""
    }
}

window.submit2=function(){
    input.focus()
}

window.mode=function(a){
    
    if(a.textContent=="light mode"){
        a.classList.remove("button5")
        a.setAttribute('class','button button4')
        document.body.style.backgroundColor="white"
        document.getElementById('h1').style.color = "black";
        document.getElementById('plus').style.color="rgb(160, 158, 158)"
        document.getElementById('plus1').style.color="rgb(71, 71, 71)"
        a.textContent="dark mode"
        
     }
    
        else if(a.textContent=="dark mode"){
        a.classList.remove("button4")
        a.setAttribute('class','button button5')
        document.body.style.backgroundColor="rgb(20 17 17)"
        document.getElementById('h1').style.color = "white";
        document.getElementById('plus').style.color="rgb(191 188 188)"
        document.getElementById('plus1').style.color="rgb(191 188 188)"
        a.textContent="light mode"

    }
}
