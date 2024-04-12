import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { getFirestore,collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";

// FireBase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWV6U5BEwsPM4Mi2QHaC8qf0dDERgssAs",
  authDomain: "onodemo-504d1.firebaseapp.com",
  projectId: "onodemo-504d1",
  storageBucket: "onodemo-504d1.appspot.com",
  messagingSenderId: "60463537473",
  appId: "1:60463537473:web:fcae2b1a518f8f2dd695c0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


// login/ signup
const signup = document.getElementById("signup-form");
const login = document.getElementById("login-form");
const showloginForm = document.getElementById("login");
const showsignupForm = document.getElementById("signup");

//collection
let Users = collection(db, "Users");

// user details
let singupEmail = document.getElementById("signup-email");
let signupPass = document.getElementById("signup-password");
let firstName = document.getElementById("firstName");
let lastName = document.getElementById("lastName");
let signupBtn = document.getElementById("signup-button");
let email = document.getElementById("email");
let password = document.getElementById("password");
let loginbtn = document.getElementById("login-button");

function showLoginForm() {
  login.style.display = "block";
  signup.style.display = "none";
  signup.reset();
  document.getElementById("signup-error").innerText = "";
}

function showSignupForm() {
  signup.style.display = "block";
  login.style.display = "none";
  login.reset();
  document.getElementById("login-error").innerText = "";
}

async function signUp(event){
  event.preventDefault();
    await createUserWithEmailAndPassword(auth, singupEmail.value, signupPass.value)
    .then(async function(userCredentional){
        const user = userCredentional.user;
        console.log(user);
        event.preventDefault();
        await addUser();
        window.location.href = "UsersManagement.html";
    })
    .catch((error) => {
      const errorMessage = error.message;
      displaySignupErrorMessage(errorMessage);
    });
}

async function addUser() {
  await addDoc(Users, {
  email: singupEmail.value,
  firstName: firstName.value,
  lastName: lastName.value
  });
}

async function loginUser(event){
  event.preventDefault();
  signInWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    const user = userCredential.user;
    window.location.href = "UsersManagement.html";
  })
  .catch((error) => {
    const errorMessage = error.message;
    displayLoginErrorMessage(errorMessage);
    
  });
}

function displaySignupErrorMessage(message) {
  document.getElementById("signup-error").innerText = message;
}

function displayLoginErrorMessage(message) {
  document.getElementById("login-error").innerText = message;
}

showloginForm.addEventListener("click", showLoginForm);
showsignupForm.addEventListener("click", showSignupForm);
signupBtn.addEventListener("click", signUp);
loginbtn.addEventListener("click", loginUser);


