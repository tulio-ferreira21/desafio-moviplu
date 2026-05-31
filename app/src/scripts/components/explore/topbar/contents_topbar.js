import { verifyIsAuth } from "../../../services/auth.js";

const topbarActionsDesktop = document.getElementById("topbar__actions");
const topbarActionsMobile = document.getElementById("topbar__actions__mobile");
const user = await verifyIsAuth();
const contentTopbarActionsDesktop = `
      <button class="publish__button">
                  <i class="bi bi-plus-lg"></i>
                  Publicar anúncio
                </button>

                <button class="notification">
                  <i class="bi bi-bell"></i>
                </button>

                <a href="./src/pages/profile/page.html" class="profile" id="action-floatmenu-desktop">
                  <img src="${user && user?.img_url ? user?.img_url : "./src/medias/imgs/img_default.png"}" alt="" />
                  </a>
  `;
const contentTopbarActionsMobile = `
      <a href="">
          <i class="bi bi-chat"></i>
      </a>
      <a href="">
          <i class="bi bi-bell"></i>
      </a>
      <a href="./src/pages/profile/page.html" class="profile" id="action-floatmenu-mobile">
          <img src="./src/medias/imgs/img_default.png" alt="" />
      </a>
  `;
if (user) {
  topbarActionsDesktop.innerHTML = contentTopbarActionsDesktop;
  topbarActionsMobile.innerHTML = contentTopbarActionsMobile;
}
