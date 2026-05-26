import api from "../api/api.service.js";

const topbarActionsDesktop = document.getElementById("topbar__actions");
const topbarActionsMobile = document.getElementById("topbar__actions__mobile");

async function verifyIsAuth() {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  try {
    const { data } = await api.get("/user/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data.user;
  } catch (error) {
    console.log(error)
  }
}

const user = await verifyIsAuth();
console.log(user)
const contentTopbarActionsDesktop = `
     <button class="publish__button">
                <i class="bi bi-plus-lg"></i>
                Publicar anúncio
              </button>

              <button class="notification">
                <i class="bi bi-bell"></i>
              </button>

              <div class="profile">
                <img src="../../medias/imgs/profile.png" alt="" />

                <i class="bi bi-chevron-down"></i>
              </div>
`;
const contentTopbarActionsMobile = `
    <a href="">
        <i class="bi bi-chat"></i>
    </a>
    <a href="">
        <i class="bi bi-bell"></i>
    </a>
    <button href="" class="profile" id="active__menu__mobile">
        <img src="./src/medias/imgs/img_default.png" alt="" />
    </button>
`;
if (!user) return

topbarActionsDesktop.innerHTML = contentTopbarActionsDesktop;
topbarActionsMobile.innerHTML = contentTopbarActionsMobile;
