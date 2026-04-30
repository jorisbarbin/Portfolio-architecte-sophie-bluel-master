let gallery = document.querySelector("#gallery");
gallery.innerHTML = "";
let GalleryModale = document.querySelector("#GalleryModale");
GalleryModale.innerHTML = "";
const filters = document.querySelector(".filters");
filters.innerHTML = "";
const DeleteConfirmBox = document.querySelector("#DeleteConfirmBox");
const CancelDelete = document.querySelector("#CancelDelete");
const ConfirmDelete = document.querySelector("#ConfirmDelete");
let workIdToDelete = null;
let dataWorks = [];
let dataFilters = [];


fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        dataWorks = data;
        AfficherGallery(dataWorks);
        AfficherGalleryModale(dataWorks)
    })
        function AfficherGallery(works) {
            gallery.innerHTML = "";
            for (let i = 0; i < works.length; i++) {
                let figure = document.createElement("figure");
                let image = document.createElement("img");
                image.setAttribute("src", works[i].imageUrl);
                image.setAttribute("alt", works[i].title);
                let figcaption = document.createElement("figcaption");
                figcaption.textContent = works[i].title;
                figure.appendChild(image);
                figure.appendChild(figcaption);
                gallery.appendChild(figure);
            }
        }
        function AfficherGalleryModale(works) {
            GalleryModale.innerHTML = "";
            for (let i = 0; i < works.length; i++) {
                let figureModale = document.createElement("figure");
                let imageModale = document.createElement("img");
                imageModale.setAttribute("src", works[i].imageUrl);
                imageModale.setAttribute("alt", works[i].title);
                let trashIcon = document.createElement("i");
                trashIcon.classList.add("fa-solid", "fa-trash-can", "modal-trash");
                figureModale.appendChild(trashIcon);
                figureModale.appendChild(imageModale);
                GalleryModale.appendChild(figureModale);

                trashIcon.addEventListener("click", (event) => {
                    event.preventDefault();
                    workIdToDelete = works[i].id;
                    DeleteConfirmBox.style.display = "block";
                });
            }
        }

        ConfirmDelete.addEventListener("click", () => {
            const token = sessionStorage.getItem("token");

            fetch(`http://localhost:5678/api/works/${workIdToDelete}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de la suppression.");
                }

                dataWorks = dataWorks.filter(work => work.id !== workIdToDelete);

                AfficherGallery(dataWorks);
                AfficherGalleryModale(dataWorks);

                workIdToDelete = null;
                DeleteConfirmBox.style.display = "none";
            })
            .catch((error) => {
                console.error(error);
            });
        });

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

        CancelDelete.addEventListener("click", () => {
            workIdToDelete = null;
            DeleteConfirmBox.style.display = "none";
        });
    