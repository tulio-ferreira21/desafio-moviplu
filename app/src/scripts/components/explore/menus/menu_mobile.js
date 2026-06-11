import { BASE_PATH } from "../../../config/basePath.js";
import { verifyIsAuth } from "../../../services/auth.js";

const menuMobile = document.getElementById("menu__mobile");
const user = await verifyIsAuth();

if (user) {
  const pathname = window.location.pathname;

  const isExplore =
    pathname === `${BASE_PATH}/` ||
    pathname === `${BASE_PATH}/index.html`;

  const isMyAds = pathname.includes("/my-ads/");
  const isFavorites = pathname.includes("/favorites/");
  const isTrades = pathname.includes("/trades/");

  menuMobile.innerHTML = `
      <a href="${BASE_PATH}/index.html" class="mobile__link ${isExplore ? "active" : ""}">
        <i class="bi bi-compass"></i>
      </a>

      <a href="${BASE_PATH}/src/pages/my-ads/page.html" class="mobile__link ${isMyAds ? "active" : ""}">
        <i class="bi bi-megaphone"></i>
      </a>

      <button class="mobile__link plus" id="add-product">
        <i class="bi bi-plus"></i>
      </button>

      <a href="${BASE_PATH}/src/pages/favorites/index.html" class="mobile__link ${isFavorites ? "active" : ""}">
        <i class="bi bi-heart"></i>
      </a>

      <a href="${BASE_PATH}/src/pages/trades/index.html" class="mobile__link ${isTrades ? "active" : ""}">
        <i class="bi bi-arrow-repeat"></i>
      </a>
    `;
}