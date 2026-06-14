import { verifyIsAuth } from "../../services/auth.js";
import { getDataAddress } from "../../services/getDataAddress.js";
import { getCoordinates } from "../../services/getLocation.js";
import { getCategories } from "../../services/loadCategories.js";
import toast from "../../services/toasts.js";
import { addProduct } from "./functions/addProduct.js";
import { formProduct } from "./functions/formProduct.js";

const userAuthenticated = await verifyIsAuth();

if (userAuthenticated) {
  const btnOpenFormAddProduct = document.querySelectorAll("#add-product");
  btnOpenFormAddProduct.forEach((btn) => {
    btn.addEventListener("click", async () => {
      formProduct();
      const overlay = document.querySelector(".overlay__product");
      const formAddProduct = document.querySelector(".form__product");
      const btnCancel = document.querySelector(".btn-danger");
      formAddProduct.addEventListener("click", (e) => {
        e.stopPropagation();
      });
      btnCancel.addEventListener("click", () => overlay.remove());
      overlay.addEventListener("click", () => {
        overlay.remove();
      });

      const name = document.getElementById("name-product");
      const description = document.getElementById("description-product");
      const categories = document.getElementById("categories-product");
      const city = document.getElementById("city-product");
      const street = document.getElementById("street-product");
      const state = document.getElementById("state-product");
      const complement = document.getElementById("complement_address-product");
      const durationAd = document.getElementById("duration-product");
      const images = document.getElementById("images");
      const preview = document.getElementById("preview");
      // Longitude e Latitude conseguir via API
      const data = await getDataAddress();
      city.disabled = true;
      const allCategories = await getCategories();

      categories.innerHTML += allCategories
        .map(
          (category) =>
            `<option value="${category.id}">${category.name}</option>`,
        )
        .join("");
      state.innerHTML += data.states.states
        .map((s) => `<option value="${s.name}">${s.name}</option>`)
        .join("");

      state.addEventListener("change", () => {
        city.disabled = false;

        city.innerHTML += data.citys[state.value].map(
          (c) => `<option value="${c}">${c}</option>`,
        );
      });

      images.addEventListener("change", () => {
        for (const file of images.files) {
          const div = document.createElement("div");
          const img = document.createElement("img");
          const p = document.createElement("p");

          img.src = URL.createObjectURL(file);
          img.width = 150;

          p.textContent = file.name;

          div.classList.add("img_preview");

          div.appendChild(img);
          div.appendChild(p);

          preview.appendChild(div);
        }
      });
      const btnSubmit = document.getElementById("submit");

      btnSubmit.addEventListener("click", async () => {
        const form = document.querySelector(".form__product");

        form.classList.add("was-validated");

        if (!form.checkValidity()) {
          return;
        }

        btnSubmit.disabled = true;
        btnSubmit.style.opacity = "0.5";
        btnSubmit.textContent = "Enviando...";

        try {
          const coordinates = await getCoordinates(
            street.value,
            city.value,
            state.value,
          );
          const address = `${street.value}, ${city.value}, ${complement.value}`;
          const data = {
            name: name.value || null,
            description: description.value || null,
            categoryId: categories.value || null,
            address,
            state: state.value || null,
            latitude: coordinates.latitude || null,
            longitude: coordinates.longitude || null,
            duration: durationAd.value || null,
          };

          const res = await addProduct(data, images.files);
          toast.success(res);
          overlay.remove();
        } catch (error) {
          console.error(error);
        } finally {
          btnSubmit.disabled = false;
          btnSubmit.style.opacity = "1";
          btnSubmit.textContent = "Publicar Produto";
        }
      });
    });
  });
}
