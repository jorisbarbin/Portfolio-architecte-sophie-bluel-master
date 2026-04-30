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
const imagePreview = document.querySelector("#imagePreview");
const IconImage = document.querySelector("#IconImage");
const fileHelp = document.querySelector("#fileHelp");
const fileLabel = document.querySelector(".file-label");
const formAddError = document.querySelector("#formAddError");



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
            const imageFile = imageUpload.files[0];
            const titleValue = titleForm.value.trim();
            formAddError.style.display = "none";
            formAddError.textContent = "";
            if (!imageFile) {
                formAddError.textContent = "Veuillez ajouter une image.";
                formAddError.style.display = "block";
                return;
            }
            if (!titleValue) {
                formAddError.textContent = "Veuillez renseigner un titre.";
                formAddError.style.display = "block";
                return;
            }
            const token = sessionStorage.getItem("token");
            const formData = new FormData();
            formData.append("image", imageUpload.files[0]);
            formData.append("title", titleForm.value);
            formData.append("category", CategorieForm.value);
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            },
            body: formData
        })
        .then((response) => response.json())
        .then((newWork) => {
            dataWorks.push(newWork);
            AfficherGallery(dataWorks);
            AfficherGalleryModale(dataWorks);
            ModaleForm.style.display = "none";
            ModaleGalleryView.style.display = "block";
            imageUpload.value = "";
            titleForm.value = "";
            CategorieForm.value = "";
            imagePreview.classList.remove("visible");
            imagePreview.src = "";
            IconImage.style.display = "block";
            fileLabel.style.display = "block";
            fileHelp.style.display = "block";
        })
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

    imageUpload.addEventListener("change", () => {
	const file = imageUpload.files[0];
	if (file) {
		const previewUrl = URL.createObjectURL(file);
		imagePreview.src = previewUrl;
		imagePreview.classList.add("visible");
		IconImage.style.display = "none";
		fileLabel.style.display = "none";
		fileHelp.style.display = "none";
	}
});