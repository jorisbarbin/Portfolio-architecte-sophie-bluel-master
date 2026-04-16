const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";
const filters = document.querySelector(".filters");
filters.innerHTML = "";


fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {

        let buttonAll = document.createElement("button");
        buttonAll.textContent = "Tous";
        buttonAll.setAttribute("data-category-id", "all");
        filters.appendChild(buttonAll);
        for (let i = 0; i < data.length; i++) {
            let button = document.createElement("button");
            button.textContent = data[i].name;
            button.setAttribute("data-category-id", data[i].id);
            filters.appendChild(button);
            button.addEventListener("click", () => {
            console.log(button.getAttribute("data-category-id"))}
            )
        }
            buttonAll.addEventListener("click", () => {
            console.log(buttonAll.getAttribute("data-category-id"))}
            )



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
