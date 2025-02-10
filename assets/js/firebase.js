

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.18.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALG7u0D-YbR9ZT20vPOgbGSSNkgqosZVc",
  authDomain: "instapsk-22f07.firebaseapp.com",
  databaseURL: "https://instapsk-22f07-default-rtdb.firebaseio.com",
  projectId: "instapsk-22f07",
  storageBucket: "instapsk-22f07.appspot.com",
  messagingSenderId: "832973257215",
  appId: "1:832973257215:web:e7b3b965b62ed33323cfca",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import {
  getDatabase,
  ref,
  set,
  get,
  child,
  update,
  remove,
  onValue,
  push,
} from "https://www.gstatic.com/firebasejs/9.18.0/firebase-database.js";

const db = getDatabase();
var cropfromfire;
var students;

setInterval(function () {
  GetAlldataOnce();
  crop_recommentbtn_click();
}, 5000);

function GetAlldataOnce() {
  const dbRef = ref(db);
  get(child(dbRef, "Sensor")).then((snapshot) => {
    students = [];

    snapshot.forEach((childSnapshot) => {
      students.push(childSnapshot.val());
    });
    console.log(students);
    document.getElementById("nitrogen1").innerHTML = students[3];
    document.getElementById("phosphorus1").innerHTML = students[5];
    document.getElementById("Potassium1").innerHTML = students[6];
    document.getElementById("Humidity1").innerHTML = students[1];
    document.getElementById("Temperature1").innerHTML = students[6];
    document.getElementById("Moisture1").innerHTML = students[2];
    document.getElementById("pH1").innerHTML = students[7];
    cropfromfire = students[0];
  });
}

const myTimeout = setTimeout(crop_recommentbtn_click, 2000);

function crop_recommentbtn_click() {
  $(document).ready(function () {
    $("#recommendcropbtn").click(function () {
      console.log(cropfromfire);

      InsertData();

      $("#mytable tbody").empty();

      $("#mytable").append(
        '<tr id="num"><td>' +
          "Please Wait We Are Processing Your Soil Data..." +
          "</td></tr>"
      );

      const myTimeout = setTimeout(time, 15000);

      function time() {
        $("#mytable tbody").empty();
        $("#mytable").append(
          '<tr id="num"><td>You Should Grow :</td><td>' +
            cropfromfire +
            "</td></tr>"
        );
      }

      setTimeout(Numzeromaker, 20000);
    });
  });
}

function InsertData() {
  const postData = {
    Num: 1,
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), "Sensor")).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  //updates['/Sensor' + newPostKey] = postData;
  updates["Model/"] = postData;

  return update(ref(db), updates);
}

function Numzeromaker() {
  console.log("sonu");
  const postData = {
    Num: 0,
  };

  // Get a key for a new Post.
  const newPostKey = push(child(ref(db), "Sensor")).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  //updates['/Sensor' + newPostKey] = postData;
  updates["Model/"] = postData;

  return update(ref(db), updates);
}

window.onload = GetAlldataOnce();
