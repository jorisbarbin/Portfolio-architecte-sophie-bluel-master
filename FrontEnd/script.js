let gallery = document.querySelector(".gallery");
gallery.innerHTML = "";
const filters = document.querySelector(".filters");
filters.innerHTML = "";
const loginLink = document.querySelector("#login-link");
const EditionMode = document.querySelector("#EditionMode");
EditionMode.style.display = "none";
const ModifierBlock = document.querySelector(".modifier-block")
ModifierBlock.style.display = "none"
const ModaleEdition = document.querySelector("#ModaleEdition")

let dataWorks = [];
let dataFilters = [];


fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        dataWorks = data;
        AfficherGallery(dataWorks);
    })
        function AfficherGallery(dataWorks) {
        gallery.innerHTML = "";
        for (let i = 0; i < dataWorks.length; i++) {
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        image.setAttribute("src", dataWorks[i].imageUrl);
        image.setAttribute("alt", dataWorks[i].title);
        let figcaption = document.createElement("figcaption");
        figcaption.textContent = dataWorks[i].title;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }}

fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
        dataFilters = data;
        filters.innerHTML = "";
        if (sessionStorage.getItem("token")) {
            loginLink.textContent = "Logout";
console.log(sessionStorage)
            EditionMode.textContent = "Mode édition";
            EditionMode.style.display = "block";
            ModifierBlock.style.display = "flex";
            
console.log("connecté");
        loginLink.addEventListener("click", (event) => {
            event.preventDefault();
            sessionStorage.removeItem("token");
            window.location.reload();
        })
        ModifierBlock.addEventListener("click", (event) => {
            event.preventDefault()
            ModaleEdition.style.display = "block";
            ModaleEdition.textContent = "Galerie photo"
            console.log(ModaleEdition)
        })
        } else {
            AfficherFilters(dataFilters);
            console.log("non connecté");
    }})
        function AfficherFilters(dataFilters) {
        let buttonAll = document.createElement("button");
        buttonAll.textContent = "Tous";
        buttonAll.setAttribute("data-category-id", "all");
        filters.appendChild(buttonAll);

        for (let i = 0; i < dataFilters.length; i++) {
            let button = document.createElement("button");
            button.textContent = dataFilters[i].name;
            button.setAttribute("data-category-id", dataFilters[i].id);
            filters.appendChild(button);

        button.addEventListener("click", () => {
            let categoryId = button.getAttribute("data-category-id");
            AfficherGallery(dataWorks.filter(work => work.categoryId == categoryId));})
        }


        buttonAll.addEventListener("click", () => {
            AfficherGallery(dataWorks);
        })
    }



