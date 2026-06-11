import { formAddProductContent } from "../../../data/contents.js";

export function formProduct() {
  const existingOverlay = document.querySelector(".overlay__product");

  if (existingOverlay) {
    existingOverlay.remove();
  }
  document.body.style.overflow = "hidden"
  const overlay = document.createElement("div");
  overlay.classList.add("overlay__product");

  const dialog = document.createElement("div");
  dialog.classList.add("dialog__product");

  dialog.innerHTML = formAddProductContent;    
  // Adicionar o TRATAMENTEO DE ERROS DO BOOTSTRAP JS
  document.body.appendChild(overlay);
  overlay.appendChild(dialog);
}
