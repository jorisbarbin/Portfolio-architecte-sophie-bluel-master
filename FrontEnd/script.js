fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        console.log("Ça fonctionne:", data);
    })
    .catch((error) => {
        console.error("Ça ne fonctionne pas:", error);
    });

const gallery = document.querySelector(".gallery");

gallery.innerHTML = "";

console.log(gallery);