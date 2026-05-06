const loginForm = document.querySelector('.style-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const LoginErrorModal = document.querySelector("#LoginErrorModal");
const CloseLoginError = document.querySelector("#CloseLoginError");
let emailValue = "";
let passwordValue = "";

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    emailValue = emailInput.value;
    passwordValue = passwordInput.value;
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        body: JSON.stringify({
        "email": emailValue,
        "password": passwordValue
    }),
        headers: {
        "Content-Type": "application/json"
    }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.token) {
            console.log("Connexion réussie !");
            sessionStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else {
            LoginErrorModal.style.display = "block";
            CloseLoginError.addEventListener("click", () => {
            LoginErrorModal.style.display = "none";
});

}})})

console.log(sessionStorage)
