// Comprobar si la inicion está iniciada
if(localStorage.getItem("logged") === "true")
    window.location.href = "./private.html"
else
    localStorage.setItem("logged", "false"); 

const username = document.getElementById("inputUsername");
const password = document.getElementById("inputPassword");

const form = document.querySelector("form")

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(username.value.trim() !== "" && password.value.trim() !== ""){
        localStorage.setItem("logged", "true")
    }

    const isLoggedIn = localStorage.getItem("logged");

    if(isLoggedIn === "true") { 
        window.location.href = "./private.html";
    } else {
        alert("Por favor, introduce usuario y contraseña válidos.");
    }
})