fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        let figure = document.createElement("figure");
        let image = document.createElement("img");
        image.setAttribute("src", data[0].imageUrl);
        image.setAttribute("alt", data[0].title);
        let figcaption = document.createElement("figcaption");
        figcaption.textContent = data[0].title;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
        console.log(figure);
        console.log(image);
        console.log(figcaption);
        console.log("Ça fonctionne:", data[0]);
    })
    .catch((error) => {
        console.error("Ça ne fonctionne pas:", error);
    });

const gallery = document.querySelector(".gallery");

gallery.innerHTML = "";

console.log(gallery);



