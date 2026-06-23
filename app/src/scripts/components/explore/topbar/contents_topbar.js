import { BASE_PATH } from "../../../config/basePath.js";
import { verifyIsAuth } from "../../../services/auth.js";

const topbarActionsDesktop = document.getElementById("topbar__actions");
const topbarActionsMobile = document.getElementById("topbar__actions__mobile");
const user = await verifyIsAuth();
const contentTopbarActionsDesktop = `
             <button class="publish__button" id="add-product">
                  <i class="bi bi-plus-lg"></i>
                  Publicar anúncio
              </button>

                <button id="notifications-page" class="notification">
                  <i class="bi bi-bell"></i>
                </button>

                <a href="${BASE_PATH}/src/pages/profile/page.html" class="profile" id="action-floatmenu-desktop">
                  <img src="${user && user?.img_url ? user?.img_url : `${BASE_PATH}/src/medias/imgs/img_default.png`}" alt="imagem do usuário" />
                </a>
  `;
const contentTopbarActionsMobile =
  // <a href="">
  //     <i class="bi bi-chat"></i>
  // </a>
  `
      <a  href="${BASE_PATH}/src/pages/notifications/page.html">
          <i class="bi bi-bell"></i>
      </a>
      <a href="${BASE_PATH}/src/pages/profile/page.html" class="profile" id="action-floatmenu-mobile">
        <img src="${user && user?.img_url ? user?.img_url : `${BASE_PATH}/src/medias/imgs/img_default.png`}" alt="imagem do usuário" />
      </a>
  `;
if (user) {
  topbarActionsDesktop.innerHTML = contentTopbarActionsDesktop;
  topbarActionsMobile.innerHTML = contentTopbarActionsMobile;

  if (document.getElementById("notifications-page")) {
    const goNotifications = document.getElementById("notifications-page");
    goNotifications.addEventListener(
      "click",
      () =>
        (window.location.href = `${BASE_PATH}/src/pages/notifications/page.html`),
    );
  }
}
