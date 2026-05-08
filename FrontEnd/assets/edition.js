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

function resetAddPhotoForm() {
    FormAddPics.reset();
    CategorieForm.selectedIndex = 0;
    imagePreview.classList.remove("visible");
    imagePreview.src = "";
    IconImage.style.display = "block";
    fileLabel.style.display = "block";
    fileHelp.style.display = "block";
    formAddError.textContent = "";
    formAddError.style.display = "none";
}

function closeModal() {
    resetAddPhotoForm();
    ModaleEdition.style.display = "none";
    Overlay.style.display = "none";
    ModaleForm.style.display = "none";
    ModaleGalleryView.style.display = "block";
}

fetch("http://localhost:5678/api/categories")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors du chargement des catégories.");
        }
        return response.json();
    })
    .then((data) => {
        dataFilters = data;
        remplirCategoriesSelect(dataFilters);
        filters.innerHTML = "";
        if (sessionStorage.getItem("token")) {
            loginLink.textContent = "Logout";
            EditionMode.innerHTML = '<i class="fa-regular fa-pen-to-square"></i><span>Mode édition</span>';
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
            
        })
        XmarkGalleryView.addEventListener("click", (event) => {
            event.preventDefault()
            closeModal();
        })
        Overlay.addEventListener("click", (event) => {
            event.preventDefault()
            closeModal();            
        })
        buttonAddPicture.addEventListener("click", (event) => {
            event.preventDefault()
            ModaleGalleryView.style.display = "none";
            ModaleForm.style.display = "block";
        })
        ArrowModaleForm.addEventListener("click", (event) => {
            event.preventDefault()
            resetAddPhotoForm();
            ModaleGalleryView.style.display = "block";
            ModaleForm.style.display = "none";
        })
        XmarkModaleForm.addEventListener("click", (event) => {
            event.preventDefault()
            closeModal();            
        })
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                if (DeleteConfirmBox.style.display === "block") {
                    DeleteConfirmBox.style.display = "none";
                    workIdToDelete = null;
                } else if (ModaleEdition.style.display === "block") {
                    closeModal();
                }
            }
        });
        FormAddPics.addEventListener("submit", (event) => {
            event.preventDefault();
            const imageFile = imageUpload.files[0];
            const titleValue = titleForm.value.trim();
            const categoryValue = CategorieForm.value;
            formAddError.style.display = "none";
            formAddError.textContent = "";
            if (!imageFile) {
                formAddError.textContent = "Veuillez ajouter une image";
                formAddError.style.display = "block";
                return;
            }
            if (!titleValue) {
                formAddError.textContent = "Veuillez renseigner un titre";
                formAddError.style.display = "block";
                return;
            }
            if (!categoryValue) {
                formAddError.textContent = "Veuillez choisir une catégorie";
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
        .then((response) => {
            if (!response.ok) {
                throw new Error("Erreur lors de l'ajout du projet");
            }
            return response.json();
        })
        .then((newWork) => {
            dataWorks.push(newWork);
            AfficherGallery(dataWorks);
            AfficherGalleryModale(dataWorks);
            ModaleForm.style.display = "none";
            ModaleGalleryView.style.display = "block";
            resetAddPhotoForm();
        })
        .catch((error) => {
        console.error(error);
        });
        })
    } else {
            AfficherFilters(dataFilters);
    }})
        .catch((error) => {
        console.error(error);
        });


    function remplirCategoriesSelect(dataFilters) {
        CategorieForm.innerHTML = "";
        let defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "";
        CategorieForm.appendChild(defaultOption);
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