const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";
const filters = document.querySelector(".filters");
filters.innerHTML = "";

fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
        let buttonAll = document.createElement("button");
        buttonAll.textContent = "Tous";
        buttonAll.setAttribute("category-data-id", "all");
        filters.appendChild(buttonAll);
        for (let i = 0; i < data.length; i++) {
            let button = document.createElement("button");
            button.textContent = data[i].name;
            button.setAttribute("category-data-id", data[i].id);
            filters.appendChild(button);
        }
        console.log("Categories ok:", data);
    })


fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        image.setAttribute("src", data[i].imageUrl);
        image.setAttribute("alt", data[i].title);
        let figcaption = document.createElement("figcaption");
        figcaption.textContent = data[i].title;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }})
