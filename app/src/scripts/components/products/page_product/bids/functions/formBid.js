import { formCreateBid } from "../../../../../data/contents.js";

export function formBid() {
  const existingOverlay = document.querySelector(".overlay__bid");
  if (existingOverlay) {
    existingOverlay.remove();
  }
  document.body.style.overflow = "hidden";
  const overlay = document.createElement("div");
  overlay.classList.add("overlay__bid");
  // Adicionar o TRATAMENTEO DE ERROS DO BOOTSTRAP JS
  overlay.innerHTML = formCreateBid;
  document.body.appendChild(overlay);
}
