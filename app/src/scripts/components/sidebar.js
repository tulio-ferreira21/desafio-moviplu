import { verifyIsAuth } from "../services/auth.js";

const iconAction = document.getElementById("icon__action");
const actionSidebar = document.getElementById("action__sidebar");
const sidebar = document.querySelector(".sidebar");
const navSidebar = document.getElementById("nav_sidebar");

actionSidebar.addEventListener("click", (e) => {
  e.preventDefault();

  if (sidebar.classList.contains("close")) {
    sidebar.classList.remove("close");
    sidebar.classList.add("active");

    iconAction.classList.remove("bi-arrow-bar-right");
    iconAction.classList.add("bi-arrow-bar-left");
  } else {
    sidebar.classList.remove("active");
    sidebar.classList.add("close");

    iconAction.classList.remove("bi-arrow-bar-left");
    iconAction.classList.add("bi-arrow-bar-right");
  }
});

const userAuthenticated = await verifyIsAuth();

if (userAuthenticated) {
  const pathname = window.location.pathname;

  const isExplore = pathname === "/app/" || pathname === "/app/index.html";

  const isMyAds = pathname.includes("/my-ads/");
  const isChats = pathname.includes("/chats/");
  const isFavorites = pathname.includes("/favorites/");

  navSidebar.innerHTML = `
    <a href="/app/index.html" class="sidebar__link ${isExplore ? "active" : ""}">
        <i class="bi bi-compass"></i>
        <span>Explorar</span>
    </a>

    <a href="/app/src/pages/my-ads/page.html" class="sidebar__link ${isMyAds ? "active" : ""}">
        <i class="bi bi-megaphone"></i>
        <span>Anúncios</span>
    </a>

    <a href="/app/src/pages/chats/page.html" class="sidebar__link ${isChats ? "active" : ""}">
        <i class="bi bi-chat"></i>
        <span>Mensagens</span>
    </a>

    <a href="/app/src/pages/favorites/page.html" class="sidebar__link ${isFavorites ? "active" : ""}">
        <i class="bi bi-heart"></i>
        <span>Favoritos</span>
    </a>

    <a href="#" class="sidebar__link">
        <i class="bi bi-arrow-repeat"></i>
        <span>Minhas trocas</span>
    </a>
  `;
}
