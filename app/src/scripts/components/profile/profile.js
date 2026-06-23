import { verifyIsAuth } from "../../services/auth.js";
import { formatTimeAgo } from "../../services/formatTimeAgo.js";
import toast from "../../services/toasts.js";
import { contentEditProfile, handleEditProfile } from "./edit_profile.js";

const buttonEdit = document.querySelector(".button__edit");
const profileContent = document.getElementById("profile__content");

const userAuthenticated = await verifyIsAuth();

if (!userAuthenticated)
  toast.error("Usuário não autenticado. Usando perfil padrão  do sistema");

const addressUser =
  userAuthenticated?.city && userAuthenticated?.state
    ? `${userAuthenticated?.city}, ${userAuthenticated?.state}, BR`
    : "Não informado";
const contentProfile = `
        <div class="profile__card">
            <div class="profile__banner">
              <button class="button__edit">
                <i class="bi bi-pencil"></i>
              </button>
              <div class="profile__avatar">
                <img src="${userAuthenticated?.img_url ? userAuthenticated?.img_url : "../../medias/imgs/img_default.png"}" alt="Foto do usuário" />
              </div>
            </div>

            <div class="profile__body">
              <h2>${userAuthenticated?.name}</h2>
              <span>${userAuthenticated?.username}</span>

              <p>
                Explore, personalize e gerencie sua conta dentro da plataforma.
              </p>

              <div class="profile__infos">
                <div class="profile__info">
                  <h3>E-mail</h3>
                  <strong>${userAuthenticated?.email}</strong>
                </div>

                <div class="profile__info">
                  <h3>Localização</h3>
                  <strong>${addressUser}</strong>
                </div>

                <div class="profile__info">
                  <h3>Membro desde</h3>
                  <strong>${formatTimeAgo(userAuthenticated.createdAt)}</strong>
                </div>

                <div class="profile__info">
                  <h3>Categorias Favoritas</h3>
                  ${userAuthenticated.favoriteCategories.map((category) => `<strong>${category.name}</strong>`).join(" | ")}
                </div>
              </div>
            </div>
        </div>
`;

if (userAuthenticated) {
  profileContent.innerHTML = contentProfile;

  buttonEdit.addEventListener("click", async () => {
    profileContent.innerHTML = await contentEditProfile(
      userAuthenticated,
      addressUser,
    );

    const cancelEdit = document.getElementById("cancel-edit");
    const saveEdit = document.getElementById("save-edit");

    cancelEdit.addEventListener("click", () => {
      window.location.reload();
      // profileContent.innerHTML = contentProfile;
      // return
    });

    saveEdit.addEventListener("click", () => {
      handleEditProfile();
      return;
    });
  });
}
