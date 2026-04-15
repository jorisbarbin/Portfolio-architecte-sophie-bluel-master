const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";

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







