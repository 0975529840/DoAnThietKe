// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBEMp3hmdw-yOSPwF2fxldzcq2BBnhAxnQ",
    authDomain: "doanthietke-fa770.firebaseapp.com",
    databaseURL: "https://doanthietke-fa770-default-rtdb.firebaseio.com",
    projectId: "doanthietke-fa770",
    storageBucket: "doanthietke-fa770.appspot.com",
    messagingSenderId: "705537552585",
    appId: "1:705537552585:web:9029a690f32fa0ccb51d18",
    measurementId: "G-R0QVM20Q1W"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
import { getDatabase, ref, get, set, child, update, remove }
    from "https://www.gstatic.com/firebasejs/9.7.0/firebase-database.js"
const db = getDatabase();

//SELEC DATA

function SelectData(categories) {
    const dbref = ref(db);
    get(child(dbref, "Data/ID")).then((snapshot) => {
        if (snapshot.exists()) {
            //                 var dataND = [snap, 0];

            //                 var dataMN = [0, 0];

            document.getElementById("t1").innerHTML = snapshot.val()[1].humi;
            
            document.getElementById("h1").innerHTML = snapshot.val()[1].humi;
            document.getElementById("p1").innerHTML = snapshot.val()[1].pres;
            document.getElementById("g1").innerHTML = snapshot.val()[1].gas;
            document.getElementById("u1").innerHTML = snapshot.val()[1].uv;
        }
        else {
            alert("No data found");
        }
    })
        .catch((error) => {
            alert("unsuccessful, error" + error);
        });
        // console.log(document.getElementById("hello").value);
        // categories = [document.getElementById("hello").value, 1];
        // console.log(categories);
}

//Update data

function UpdateData() {
    update(ref(db, "TheStudents/" + rollbox.value), {
        NameOfStd: namebox.value,
        Section: secbox.value,
        Gender: genbox.value
    })
        .then(() => {
            alert("data update successfully");
        })
        .catch((error) => {
            alert("unsuccesful, error" + error);
        });
}
SelectData();