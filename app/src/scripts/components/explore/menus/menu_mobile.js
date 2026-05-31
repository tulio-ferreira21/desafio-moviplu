import { verifyIsAuth } from "../../../services/auth.js";

const menuMobile = document.getElementById("menu__mobile");

const user = await verifyIsAuth();

if (user) {
  menuMobile.innerHTML = `
      <a href="#" class="mobile__link active">
        <i class="bi bi-compass"></i>
      </a>
      <a href="" class="mobile__link">
        <i class="bi bi-megaphone"></i>
        <span></span>
      </a>
      <a href="" class="mobile__link plus">
        <i class="bi bi-plus"></i>
        <span></span>
      </a>
      <a href="" class="mobile__link">
        <i class="bi bi-heart"></i>
        <span></span>
      </a>
      <a href="" class="mobile__link">
        <i class="bi bi-arrow-repeat"></i>
        <span></span>
      </a>
    `;
}
