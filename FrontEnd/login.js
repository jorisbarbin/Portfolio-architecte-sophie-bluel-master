const loginForm = document.querySelector('.style-form');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
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
    },
})

    console.log(emailValue);
    console.log(passwordValue);
});

//Identifiants stockés pour les tests de connexion//
//sophie.bluel@test.tld//
//S0phie//
