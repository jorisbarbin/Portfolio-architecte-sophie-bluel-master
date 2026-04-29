const loginLink = document.querySelector("#login-link");
const EditionMode = document.querySelector("#EditionMode");
EditionMode.style.display = "none";
const ModifierBlock = document.querySelector(".modifier-block");
ModifierBlock.style.display = "none";
const ModaleEdition = document.querySelector("#ModaleEdition");
ModaleEdition.style.display = "none";
const XmarkGalleryView = document.querySelector("#XmarkGalleryView");
const XmarkModaleForm = document.querySelector("#XmarkModaleForm");
const Overlay = document.querySelector("#Overlay");
Overlay.style.display = "none";
const ModaleForm = document.querySelector("#ModaleForm");
ModaleForm.style.display = "none";
const buttonAddPicture = document.querySelector("#buttonAddPicture");
const ModaleGalleryView = document.querySelector("#ModaleGalleryView");
const ArrowModaleForm = document.querySelector(".fa-arrow-left");
const FormAddPics = document.querySelector("#FormAddPics");
const imageUpload = document.querySelector("#imageUpload");
const titleForm = document.querySelector("#titleForm");
const CategorieForm = document.querySelector("#CategorieForm");



fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((data) => {
        dataFilters = data;
        remplirCategoriesSelect(dataFilters);
        filters.innerHTML = "";
        if (sessionStorage.getItem("token")) {
            loginLink.textContent = "Logout";
            EditionMode.textContent = "Mode édition";
            EditionMode.style.display = "block";
            ModifierBlock.style.display = "flex";
            loginLink.addEventListener("click", (event) => {
            event.preventDefault();
            sessionStorage.removeItem("token");
            window.location.reload();
        })
        ModifierBlock.addEventListener("click", (event) => {
            event.preventDefault()
            ModaleEdition.style.display = "block";
            Overlay.style.display = "block";
            sessionStorage.setItem("modalOpen", "true");
        })
        XmarkGalleryView.addEventListener("click", (event) => {
            event.preventDefault()
            ModaleEdition.style.display = "none";
            Overlay.style.display = "none";
            ModaleForm.style.display = "none";
            ModaleGalleryView.style.display = "block";
            sessionStorage.removeItem("modalOpen");
            console.log(event)
        })
        Overlay.addEventListener("click", (event) => {
            event.preventDefault()
            ModaleEdition.style.display = "none";
            Overlay.style.display = "none";
            ModaleForm.style.display = "none";
            ModaleGalleryView.style.display = "block";
            sessionStorage.removeItem("modalOpen");
        })
        buttonAddPicture.addEventListener("click", (event) => {
            event.preventDefault()
            ModaleGalleryView.style.display = "none";
            ModaleForm.style.display = "block";
        })
        ArrowModaleForm.addEventListener("click", (event) => {
            event.preventDefault()
            ModaleGalleryView.style.display = "block";
            ModaleForm.style.display = "none";
        })
        XmarkModaleForm.addEventListener("click", (event) => {
            event.preventDefault()
            ModaleEdition.style.display = "none";
            Overlay.style.display = "none";
            ModaleForm.style.display = "none";
            ModaleGalleryView.style.display = "block";
            sessionStorage.removeItem("modalOpen");
        })
        
        FormAddPics.addEventListener("submit", (event) => {
            event.preventDefault();
            
            console.log(imageUpload.files[0]);
            console.log(titleForm.value);
            console.log(CategorieForm.value);
        })
        if (sessionStorage.getItem("modalOpen")) {
            ModaleEdition.style.display = "block";
            Overlay.style.display = "block";
}
        } else {
            AfficherFilters(dataFilters);
    }})


        function remplirCategoriesSelect(dataFilters) {
            CategorieForm.innerHTML = "";

            for (let i = 0; i < dataFilters.length; i++) {
                let option = document.createElement("option");
                option.value = dataFilters[i].id;
                option.textContent = dataFilters[i].name;
                CategorieForm.appendChild(option);
            }
        }