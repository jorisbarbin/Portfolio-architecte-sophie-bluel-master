const loginForm = document.querySelector('.style-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
let emailValue = "";
let passwordValue = "";

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    emailValue = emailInput.value;
    passwordValue = passwordInput.value;

    console.log(emailValue);
    console.log(passwordValue);
});

